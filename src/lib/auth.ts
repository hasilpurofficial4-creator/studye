import { SignJWT, jwtVerify } from "jose";
import { AuthPayload } from "./types";
import { COOKIE_NAME } from "./constants";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default-secret-change-me");

export async function createToken(payload: AuthPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyToken(token: string): Promise<AuthPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as AuthPayload;
  } catch {
    return null;
  }
}

export async function getTokenFromRequest(request: Request): Promise<AuthPayload | null> {
  const cookieHeader = request.headers.get("cookie") || "";
  const token = cookieHeader
    .split("; ")
    .find((c) => c.startsWith(`${COOKIE_NAME}=`))
    ?.split("=")[1];

  if (!token) return null;
  return verifyToken(token);
}
