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

export function verifyToken(token, secret) {
  const secretKey = secret.base32;
  const tokenStr = token.toString(); // asegurarse de que token es una cadena de texto
  if (isNaN(tokenStr)) { // verificar que token sea un valor numérico
    return false;
  }
  const tokenNum = parseInt(tokenStr); // convertir token a número entero
  const verified = speakeasy.totp.verify({
    secret: secretKey,
    encoding: 'ascii',
    token: tokenNum, // utilizar tokenNum en lugar de token.toString()
  });
  return verified;
}






