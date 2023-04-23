import express from 'express';
import { generateSecret, verifyToken } from './auth.js';
import { toDataURL } from 'qrcode';

const app = express();
app.use(express.json());

app.get('/generate', async (req, res) => {
    console.log('Handling /generate request'); // Agrego esta linea 
    const secret = generateSecret();
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
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
