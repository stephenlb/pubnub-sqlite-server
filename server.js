require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();
const PubNub = require('pubnub');

// Initialize PubNub with keys from .env
const pubnub = new PubNub({
    publishKey: process.env.PUBNUB_PUBLISH_KEY,
    subscribeKey: process.env.PUBNUB_SUBSCRIBE_KEY,
});

// Create an in-memory SQLite database
const db = new sqlite3.Database(':memory:');

// Initialize the database with a sample table
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS test (id INT, value TEXT)");

    // Insert sample data into the test table
    const stmt = db.prepare("INSERT INTO test (id, value) VALUES (?, ?)");
    for (let i = 0; i < 10; i++) {
        stmt.run(i, `Value ${i}`);
    }
    stmt.finalize();
});

// Subscribing to the "query" channel
pubnub.addListener({
    message: function(message) {
        const requestData = message.message;
        console.log("Received query request:", requestData);

        if (requestData.query && requestData.response) {
            db.all(requestData.query, (err, rows) => {
                if (err) {
                    console.error(err);
                    pubnub.publish({
                        channel: requestData.response,
                        message: { error: err.message }
                    });
                } else {
                    console.log("Query result:", rows);
                    pubnub.publish({
                        channel: requestData.response,
                        message: { result: rows }
                    });
                }
            });
        }
    }
});

pubnub.subscribe({
    channels: ['query']
});

console.log("PubNub SQLite query server is running...");
