/**
 * These routes are public and don't need authentication
 * @type {string[]}
 * */
export const publicRoutes = ['/public'];

/**
 * These routes are used for authentication
 * redirect logged-in users to /settings
 * @type {string[]}
 * */
export const authRoutes = ['/', '/login', '/register', '/loginerror', '/reset-password', '/new-password'];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for api
 * authentication purposes
 * @type {string}
 * */
export const apiAuthPrefix = '/api/auth';