import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { COOKIE_NAME } from "@/lib/constants";

const protectedRoutes = [
  { path: "/student/dashboard", roles: ["student"] },
  { path: "/teacher/dashboard", roles: ["teacher"] },
  { path: "/exam", roles: ["student"] },
  { path: "/results", roles: ["student", "teacher"] },
  { path: "/admin", roles: ["admin"] },
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the route needs protection
  const route = protectedRoutes.find((r) => pathname.startsWith(r.path));
  if (!route) return NextResponse.next();

  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    const loginPath = route.roles.includes("admin") ? "/admin" : "/student/login";
    return NextResponse.redirect(new URL(loginPath, request.url));
  }

  const payload = await verifyToken(token);
  if (!payload) {
    const response = NextResponse.redirect(new URL("/student/login", request.url));
    response.cookies.delete(COOKIE_NAME);
    return response;
  }

  // Role check
  if (!route.roles.includes(payload.role)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Add user info to headers for downstream use
  const response = NextResponse.next();
  response.headers.set("x-user-id", payload.id);
  response.headers.set("x-user-role", payload.role);
  response.headers.set("x-user-name", payload.name);
  return response;
}

export const config = {
  matcher: [
    "/student/dashboard/:path*",
    "/teacher/dashboard/:path*",
    "/exam/:path*",
    "/results/:path*",
    "/admin/:path*",
  ],
};
