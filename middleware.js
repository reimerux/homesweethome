export { auth as middleware } from "@/auth"

export const config = {
    matcher: ['/((?!api/auth|_next/image|.*\\.jpg$).*)'],
   };