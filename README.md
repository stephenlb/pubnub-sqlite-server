# How to Use localhost as Web Database Server

This repository contains a Node.js server application that uses PubNub to listen for SQL queries on a specified channel and executes them on an in-memory SQLite database. The results are then sent back to a designated response channel.

Here's a walkthrough of the code and how it works on YouTube:

[![How to Use localhost as Web Database Server](https://img.youtube.com/vi/xj51kgNFhgY/hqdefault.jpg)](https://www.youtube.com/watch?v=xj51kgNFhgY)

## Features

- Real-time communication with PubNub.
- In-memory SQLite database for executing SQL queries.
- Simple web-based interface for sending SQL queries and viewing results.

## Requirements

- Node.js (v14 or later)
- PubNub account and API keys

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/pubnub-sqlite-server.git
cd pubnub-sqlite-server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file at the root of the project and add your PubNub keys:

> [Get API Keys](https://admin.pubnub.com/)

```plaintext
PUBNUB_PUBLISH_KEY=your-publish-key
PUBNUB_SUBSCRIBE_KEY=your-subscribe-key
```

### 4. Run the Server

```bash
npm start
```

The Node.js server will start and listen for SQL queries on the `query` channel.

## Web Interface

### 1. Configure PubNub Keys

In the `index.html` file, replace the placeholders with your actual PubNub keys:

> [Get API Keys](https://admin.pubnub.com/)

```javascript
const pubnub = new PubNub({
    publishKey: 'your-publish-key',  // Replace with your actual PubNub publish key
    subscribeKey: 'your-subscribe-key'  // Replace with your actual PubNub subscribe key
});
```

### 2. Open `index.html`

Navigate to the `client` directory and open the `index.html` file in your web browser. You can use this simple interface to send SQL queries to the server.


### 3. Use the Interface

- Enter an SQL query in the textarea (e.g., `SELECT * FROM test`).
- Click the "Send Query" button.
- View the result of the query in the response area below the button.

## Example Usage

### Sample SQL Query

```sql
SELECT * FROM test
```

This will return all rows from the `test` table that has been pre-populated with sample data in the in-memory SQLite database.

## File Structure

```plaintext
.
├── index.html            # Web interface for interacting with the server
├── .env                  # Environment variables for PubNub keys
├── package.json          # Project metadata and dependencies
├── server.js             # Main server code for handling PubNub messages and SQLite queries
└── README.md             # Project documentation
```

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
