import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

const SECRET = process.env.NEXTAUTH_SECRET!

export async function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.startsWith("/api/auth/")) {
        return NextResponse.next()
      }
    // Protect only API routes
    if (req.nextUrl.pathname.startsWith("/api/")) {
        const token = await getToken({ req, secret: SECRET })
        if (!token) {
            // Return a 401 JSON instead of redirecting
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            )
        }
    }

    // For everything else, let it through
    return NextResponse.next()
}

export const config = {
    matcher: ["/api/:path*"],
}
