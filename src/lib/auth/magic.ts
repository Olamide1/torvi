import { SignJWT, jwtVerify } from "jose";

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET env var is not set");
  return new TextEncoder().encode(secret);
}

export async function createMagicToken(email: string): Promise<string> {
  return new SignJWT({ email, purpose: "magic_link" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(getSecret());
}

export async function verifyMagicToken(token: string): Promise<{ email: string }> {
  const { payload } = await jwtVerify(token, getSecret());
  if (payload.purpose !== "magic_link") throw new Error("Invalid token purpose");
  return { email: payload.email as string };
}
