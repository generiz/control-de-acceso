import speakeasy from 'speakeasy';
import QRCode from 'qrcode';

export function generateSecret() {
  const secret = speakeasy.generateSecret({ length: 20 });
  return secret;
}

export async function generateQRCode(secret) {
  const dataUrl = await QRCode.toDataURL(secret.otpauth_url);
  return dataUrl;
}

export function verifyToken(secret, token) {
  const verified = speakeasy.totp.verify({
    secret: secret.ascii,
    encoding: 'ascii',
    token: token,
  });
  return verified;
}
