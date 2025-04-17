//Name: Michael Massey
//Student ID: 113631305

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json()); // Middleware to parse JSON requests
app.use(cors());

app.use(express.static('client')); // Serve static file in the client directory

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Whisper10!',
  database: 'lab_db'
});
connection.connect();

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body; // Extract username and password from the request body
  
    // Secure SQL query using parameterized placeholders to prevent SQL injection
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  
    // Execute the query with user-provided values
    connection.query(query, [username, password], (error, results) => {
      if (error) throw error; // Handle any errors that occur during query execution
  
      // Check if the query returned any results (i.e., valid credentials)
      results.length > 0 ? res.send('Login succeeded') : res.send('Login failed');
    });
  });
  
  // Define the port for the server to listen on and start the server
  const PORT = process.env.PORT || 3000; // Use environment variable or default to port 3000
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); // Log a message when the server starts successfully
  });
  