import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Define which routes are PUBLIC (accessible without login)
// Usually: Home page (/), Sign In, Sign Up
const isPublicRoute = createRouteMatcher([
  "/",           // Landing page
  "/sign-in(.*)", // Sign in page
  "/sign-up(.*)"  // Sign up page
]);

export default clerkMiddleware(async (auth, req) => {
  // 2. If the user tries to access a route that is NOT public...
  if (!isPublicRoute(req)) {
     // ...force them to sign in first.
     await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};