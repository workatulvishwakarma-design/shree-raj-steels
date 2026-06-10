const SESSION_SECRET = process.env.SESSION_SECRET || "srs-default-secret-key-change-me";

async function signMessage(message: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const messageData = encoder.encode(message);

  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signatureBuffer = await crypto.subtle.sign("HMAC", key, messageData);
  const signatureArray = Array.from(new Uint8Array(signatureBuffer));
  return signatureArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function createToken(username: string, maxAgeSeconds: number): Promise<string> {
  const expiresAt = Date.now() + maxAgeSeconds * 1000;
  const message = `${username}:${expiresAt}`;
  const signature = await signMessage(message, SESSION_SECRET);
  return `${message}:${signature}`;
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    if (!token) return false;
    const parts = token.split(":");
    if (parts.length !== 3) return false;
    const [username, expiresAtStr, signature] = parts;
    const expiresAt = parseInt(expiresAtStr, 10);
    
    if (isNaN(expiresAt) || expiresAt < Date.now()) {
      return false;
    }

    const message = `${username}:${expiresAtStr}`;
    const expectedSignature = await signMessage(message, SESSION_SECRET);
    return signature === expectedSignature;
  } catch (error) {
    console.error("Token verification failed:", error);
    return false;
  }
}
