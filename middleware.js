export {default} from "next-auth/middleware"

export const config = {
    matcher: ['/((?!api/auth|_next/image|.*\\.jpg$).*)'],
   };