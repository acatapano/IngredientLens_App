
export function getBase64(file:any) { 
    return new Promise<any>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        var encoded;
        if(!reader.result){
            return "";
        }
        if (reader.result instanceof ArrayBuffer) {
            const uint8Array = new Uint8Array(reader.result);
            const textDecoder = new TextDecoder('utf-8'); // Specify the encoding
            encoded = textDecoder.decode(uint8Array);
        }
        else{
            encoded = reader.result;
        }
        resolve(encoded.split("base64,")[1]);
      };
      reader.onerror = error => reject(error);
    });
}

import * as Crypto from 'expo-crypto';

export async function getHashKey(): Promise<string> {
  // Generate a random number and convert it to a string.
  // Note: This method of generating "randomness" is for demonstration and might not be suitable for security-critical operations.
  const randomString = Math.random().toString(36).substring(2, 10); // Get a random string

  // Use expo-crypto to create a SHA-256 hash of the random string.
  const hash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    randomString,
    { encoding: Crypto.CryptoEncoding.HEX }
  );

  // Return the first 8 characters of the hash.
  // Note: The length of the hash is much longer, but we're mimicking the original function's behavior.
  return hash.substring(0, 8);
}

