import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { access_token, user_id, user_role } = await request.json();

  const response = NextResponse.json(
    { message: "Login bem-sucedido!" },
    { status: 200 }
  );

  response.cookies.set("access_token", access_token, {
    path: "/",
    maxAge: 60 * 60 * 24, // 1 dia
    sameSite: "lax",
    secure: true,
    httpOnly: true,
  });

  response.cookies.set("user_id", user_id, {
    path: "/",
    maxAge: 60 * 60 * 24, // 1 dia
    sameSite: "lax",
    secure: true,
    httpOnly: true,
  });

  // Cookie de user_role sem httpOnly pra ser acessível no middleware
  response.cookies.set("user_role", user_role, {
    path: "/",
    maxAge: 60 * 60 * 24, // 1 dia
    sameSite: "lax",
    secure: true,
    httpOnly: false,
  });

  return response;
}
