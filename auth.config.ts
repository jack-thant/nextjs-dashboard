// Import the NextAuthConfig type from the next-auth package
import { NextAuthConfig } from 'next-auth';

// Define the authentication configuration object
export const authConfig = {
  // Specify custom pages for authentication
  pages: {
    signIn: '/login', // Redirect users to the /login page for signing in
  },
  // Define callback functions to handle various authentication events
  callbacks: {
    // Callback to determine if the user is authorized to access a page
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user; // Check if the user is logged in
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard'); // Check if the user is accessing a dashboard page

      // If the user is on a dashboard page
      if (isOnDashboard) {
        // If the user is logged in, allow access
        if (isLoggedIn) return true;
        // If the user is not logged in, deny access
        return false;
      } else if (isLoggedIn) {
        // If the user is logged in and not on a dashboard page, redirect to the dashboard
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      // Allow access to other pages by default
      return true;
    },
  },
  // Define authentication providers (empty in this example)
  providers: [],
} satisfies NextAuthConfig; // Ensure the object satisfies the NextAuthConfig type
