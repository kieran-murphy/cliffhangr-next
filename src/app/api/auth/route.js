import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "./[...nextauth]/route";

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    console.log("no session 3/2");
    return new NextResponse(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
    });
  }

  console.log("GET API", session);
  return NextResponse.json({ authenticated: !!session });
}
