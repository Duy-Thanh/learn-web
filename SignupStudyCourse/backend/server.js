// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const session = require('express-session');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests and enable CORS
app.use(bodyParser.json());
app.use(cors());
app.use(session({
  secret: 'Thisisourhardworksdontsteal(C)Copyright2016-2024CyberDayStudiosAllRightReserved',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true } // Note: secure should be true in production with HTTPS
}));

// Function to read data from JSON file
const getData = () => {
  const data = fs.readFileSync('data.json');
  return JSON.parse(data);
}

// Function to write data to JSON file
const saveData = (data) => {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync('data.json', jsonData);
}

// Route to handle user signup
app.post('/signup', (req, res) => {
  const users = getData().users; // Get current users
  const newUser = req.body; // Get new user data from request body

  // Check if user already exists
  const userExists = users.find(user => user.email === newUser.email);
  if (userExists) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }

  // Add new user and save data
  users.push(newUser);
  saveData({ users });
  res.status(200).json({ success: true, message: 'User registered successfully' });
});

// Route to handle user login
app.post('/login', (req, res) => {
  const users = getData().users; // Get current users
  const { email, password } = req.body; // Get login credentials from request body

  // Check if user exists with given credentials
  const user = users.find(user => user.email === email && user.password === password);
  if (user) {
    req.session.user = user; // Store user info in session
    res.json({ success: true, message: 'Login successful', user });
  } else {
    res.status(400).json({ success: false, message: 'Invalid credentials' });
  }
});

// Route to handle user logout
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Logout failed' });
    }
    res.json({ success: true, message: 'Logout successful' });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
