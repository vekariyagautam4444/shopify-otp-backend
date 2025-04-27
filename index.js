const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const twilio = require('twilio');

app.use(cors());
app.use(bodyParser.json());

const otpStore = {};

const accountSid = 'YOUR_TWILIO_SID';
const authToken = 'YOUR_TWILIO_AUTH_TOKEN';
const twilioPhone = 'YOUR_TWILIO_PHONE'; // +1xxxxxxx

const client = twilio(accountSid, authToken);

app.post('/send', (req, res) => {
  const phone = req.body.phone;
  const otp = Math.floor(100000 + Math.random() * 900000);

  otpStore[phone] = otp;

  client.messages.create({
    body: Your Shopify OTP code is ${otp},
    from: twilioPhone,
    to: phone
  }).then(() => {
    res.json({ success: true });
  }).catch((err) => {
    console.error(err);
    res.json({ success: false });
  });
});

app.post('/verify', (req, res) => {
  const { phone, otp } = req.body;
  if (otpStore[phone] && otpStore[phone] == otp) {
    delete otpStore[phone];
    res.json({ verified: true });
  } else {
    res.json({ verified: false });
  }
});

app.get('/', (req, res) => {
  res.send('Shopify OTP Backend Working 🚀');
});

app.listen(3000, () => console.log('Server running'));
