import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { TokenName, getToken } from "./utils/token";
import { PATHS } from "./configs/path";
import { axiosInstance } from "./utils/axios";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get(TokenName.ACCESS_TOKEN);
  const isAuthRoutes =
    request.nextUrl.pathname.startsWith(PATHS.LOGIN) ||
    request.nextUrl.pathname.startsWith(PATHS.REGISTER);

  if (isAuthRoutes) {
    if (token) {
      return NextResponse.redirect(new URL(PATHS.HOME, request.url));
    }
  }

  if (!isAuthRoutes) {
    if (!token) {
      return NextResponse.redirect(
        new URL(
          PATHS.LOGIN + `?nextUrl=${request.nextUrl.pathname}`,
          request.url
        )
      );
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login", "/register"],
};
