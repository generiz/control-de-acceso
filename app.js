import { generateSecret, verifyToken } from './auth.js';

const express = require('express');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

const app = express();
app.use(express.json());

app.get('/generate', (req, res) => {
  const secret = speakeasy.generateSecret({ length: 20 });
  QRCode.toDataURL(secret.otpauth_url, (err, data_url) => {
    res.json({
      secret: secret.base32,
      dataURL: data_url,
      otpURL: secret.otpauth_url,
    });
  });
});

app.post('/validate', (req, res) => {
  const { token, secret } = req.body;
  const verified = speakeasy.totp.verify({
    secret: secret,
    encoding: 'base32',
    token: token,
  });

  res.json({ verified: verified });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
