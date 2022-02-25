import { set, get, clear, clearByAddr } from './DB';
import { SIGNKEY_KEY } from './constant';

export async function clearSigningKey() {
  await clear();
}

export async function clearSigningKeyByAddress(address: string) {
  return await clearByAddr(SIGNKEY_KEY + address);
}

export async function rotateSigningKey(address: string) {
  await clear();
  return generateSigningKey(address);
}

export async function generateSigningKey(address: string) {
  const algorithm = {
    name: 'ECDSA',
    namedCurve: 'P-256',
  };
  const extractable = true;
  const keyUsages: KeyUsage[] = ['sign', 'verify'];

  const signingKey = await window.crypto.subtle.generateKey(
    algorithm,
    extractable,
    keyUsages,
  );

  set(SIGNKEY_KEY + address, signingKey).then();

  return signingKey;
}

export async function hasSigningKey(address: string) {
  return await get(SIGNKEY_KEY + address);
}

export async function getSigningKey(address: string) {
  let signingKey = await get(SIGNKEY_KEY + address);

  if (!signingKey) {
    signingKey = generateSigningKey(address);
  }

  return signingKey;
}

export async function getPublicKey(address: string) {
  const signingKey = await getSigningKey(address);
  const exported = await window.crypto.subtle.exportKey(
    'spki',
    signingKey.publicKey,
  );

  return window.btoa(arrayBuffer2String(exported));
}

export async function signWithSigningKey(input: string, address: string) {
  const signingKey = await getSigningKey(address);
  const algorithm = {
    name: 'ECDSA',
    hash: {
      name: 'SHA-256',
    },
  };
  const enc = new TextEncoder();
  const encodedMessage = enc.encode(input);

  const signature = await window.crypto.subtle.sign(
    algorithm,
    signingKey.privateKey,
    encodedMessage,
  );

  return arrayBuffer2Hex(signature);
}

export function arrayBuffer2Hex(buffer: ArrayBuffer) {
  return (
    '0x' +
    Array.prototype.map
      .call(new Uint8Array(buffer), (x) => ('00' + x.toString(16)).slice(-2))
      .join('')
  );
}

function arrayBuffer2String(buffer: ArrayBuffer) {
  return String.fromCharCode.apply(null, new Uint8Array(buffer) as any);
}
