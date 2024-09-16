import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  // Define the public routes that don't require authentication
  publicRoutes: [
    '/',
    '/events/:id',
    '/api/webhook/clerk',
    '/api/webhook/stripe',
    '/api/uploadthing'
  ],
  // Define the ignored routes that should not be authenticated
  ignoredRoutes: [
    '/api/webhook/clerk',
    '/api/webhook/stripe',
    '/api/uploadthing'
  ],
});

// Define which routes Clerk middleware should apply to
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
