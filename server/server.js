// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const sendEmail = require('./utils/sendEmail');

const jsonParser = bodyParser.json();

app.use(cors({
    origin: true,
    credentials: true,
    methods: 'POST,GET,PUT,OPTIONS,DELETE'
}))

// Define routes and middleware here...

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Define a route to handle email sending requests
app.post('/send-email', jsonParser, (req, res) => {
    console.log(req.body, 'body is')
    const { firstName, lastName, email, message } = req.body;
    const from = 'ash.galstyan+portfolio@gmail.com';
    const to = 'ash.galstyan@gmail.com';
    const subject = 'New contact request';
    const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>
            <li>First Name: ${firstName}</li>
            <li>Last Name: ${lastName}</li>
            <li>Email: ${email}</li>
            <p>Message: ${message}</p>
        </ul>
    `
    
    try {
        sendEmail(to, from, subject, output);
        console.log('success')
        res.status(200).json({message: 'Email sent successfully'});
    } catch(error) {
        console.error('Error processing request', error);
        res.status(500).json({message: 'Internal server error'});
    }
});
  