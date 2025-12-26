import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { env } from "./env";

const secret = new TextEncoder().encode(env.JWT_SECRET);

export interface JWTPayload {
  sub: string;
  iat: number;
  exp: number;
}

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secret);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, secret, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(password: string) {
  if (password !== env.NOTES_AUTH_PASSWORD) {
    return false;
  }

  // Create the session
  const expires = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
  const session = await encrypt({ sub: "admin", expires });

  // Save the session in a cookie
  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    expires,
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
  console.log("Login successful, session created.");
  return true;
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.set("session", "", { expires: new Date(0), path: "/" });
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}
