import { withAuth } from "next-auth/middleware"

// When an unauthenticated request hits /api/*, 
// NextAuth will redirect to signIn page
export default withAuth({
    pages: {
        signIn: "/signIn",
    },
})

// Run this middleware on /api/* routes
export const config = {
    matcher: ["/api/:path*"],
}
