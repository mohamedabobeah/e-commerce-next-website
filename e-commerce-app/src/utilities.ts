import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

// read the next-auth cookie and decode it (works on localhost and on https)
async function getDecodedToken() {
  const cookie = await cookies();

  const myToken =
    cookie.get("__Secure-next-auth.session-token")?.value ??
    cookie.get("next-auth.session-token")?.value;

  if (!myToken) return null;

  return await decode({
    token: myToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });
}

// the token of the Route api (sent in the "token" header)
export async function getMyToken() {
  const decodedToken = await getDecodedToken();

  return decodedToken?.routeToken;
}

// the id of the logged user (needed for orders/user/{userId})
export async function getMyUserId() {
  const decodedToken = await getDecodedToken();

  return decodedToken?.id ?? null;
}