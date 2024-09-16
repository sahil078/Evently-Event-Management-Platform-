  // publicRoutes: [
  //   '/',
  //   '/events/:id',
  //   '/api/webhook/clerk',
  //   '/api/webhook/stripe',
  //   '/api/uploadthing'
  // ],
  // // Define the ignored routes that should not be authenticated
//   ignoredRoutes: [
//     '/api/webhook/clerk',
//     '/api/webhook/stripe',
//     '/api/uploadthing'
//   ],
// });

// Define which routes Clerk middleware s


import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
   '/sign-up(.*)',
   '/',
    '/events/:id',
    '/api/webhook/clerk',
    '/api/webhook/stripe',
    '/api/uploadthing'
  ])

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect()
  }
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};