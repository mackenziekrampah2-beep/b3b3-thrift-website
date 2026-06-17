const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Middleware - needed to read JSON from WhatsApp
app.use(express.json());

// Your WhatsApp credentials from Render
const MY_WHATSAPP = process.env.MY_WHATSAPP;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;

// Function to send WhatsApp message
async function sendMessage(to, message) {
  try {
    await axios.post(
      `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: to,
        type: "text",
        text: { body: message }
      },
      {
        headers: {
          'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log(`Message sent to ${to}`);
  } catch (err) {
    console.error('WhatsApp send error:', err.response?.data || err);
  }
}

// WhatsApp webhook verification - MUST be before app.listen
app.get('/webhook', (req, res) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'b3b3bot2026';
  
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
  
  console.log('Verify request:', token);
  
  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('WEBHOOK VERIFIED!');
    res.status(200).send(challenge); // Meta needs this number back
  } else {
    res.sendStatus(403);
  }
});

// WhatsApp message handler - receives messages
app.post('/webhook', (req, res) => {
  console.log('Message received:', JSON.stringify(req.body, null, 2));
  
  // Add your reply logic here later
  // Example: sendMessage(from_number, "Hi! I got your message")
  
  res.sendStatus(200);
});

// PASTE HERE 👇 Homepage for customers
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to B3B3 Shop 🛍️</h1>
    <p>Bot is Online ✅</p>
    <p>Chat with us on WhatsApp for orders!</p>
  `)
})


// Start server - this comes LAST
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('WhatsApp notifications ready');
});