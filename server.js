import express from 'express';
import path from 'path';
import { generateSecret, verifyToken } from './auth.js';
import { toDataURL } from 'qrcode';

const __dirname = path.resolve();
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/prueba', (req, res) => {
  res.send('oki dokii');
});

app.get('/generate', async (req, res) => {
  const secret = generateSecret({ length: 20 });
  const dataUrl = await toDataURL(secret.otpauth_url);
  res.json({
    secret: secret.base32,
    dataURL: dataUrl,
    otpURL: secret.otpauth_url,
  });
});

app.post('/validate', (req, res) => {
  const { token, secret } = req.body;
  const verified = verifyToken(secret, token);
  res.json({ verified: verified });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});