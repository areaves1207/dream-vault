import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;

const ENCRYPTION_KEY = Buffer.from(
  process.env.ENCRYPTION_KEY!,
  "base64"
);

export function encrypt(payload: object) {
  const iv = crypto.randomBytes(IV_LENGTH);

  const cipher = crypto.createCipheriv(
    ALGORITHM,
    ENCRYPTION_KEY,
    iv
  );

  const encrypted = Buffer.concat([
    cipher.update(JSON.stringify(payload), "utf8"),
    cipher.final()
  ]);

  const tag = cipher.getAuthTag();

  return {
    encryptedData: encrypted.toString("base64"),
    iv: iv.toString("base64"),
    auth_tag: tag.toString("base64")
  };
}

export function decrypt( encryptedData: string, iv: string, authTag: string){
    if(!encryptedData || !iv || !authTag){
        console.log("Missing encryption data");
        return;
    }
    
    const decipher = crypto.createDecipheriv(
        ALGORITHM,
        ENCRYPTION_KEY,
        Buffer.from(iv, "base64")
    );

    decipher.setAuthTag(Buffer.from(authTag, "base64"));

    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(encryptedData, "base64")),
        decipher.final()
    ]);

    return JSON.parse(decrypted.toString("utf8"));
}


export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter(word => word.length > 2);
}


const SEARCH_KEY = Buffer.from(
  process.env.HASH_KEY!,
  "base64"
);

export function hashToken(token: string): string {
  return crypto
    .createHmac("sha256", SEARCH_KEY)
    .update(token)
    .digest("hex");
}

