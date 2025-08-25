# Authentication System

This application now includes a complete authentication system with protected routes.

## Features

- **Login page** with username and password fields
- **Protected routes** - all pages except login require authentication
- **Automatic redirects** - unauthenticated users go to login, authenticated users see the dashboard
- **Token-based authentication** using localStorage
- **Automatic logout** on token expiration
- **User session management** with React Context

## How it works

### Authentication Flow

1. **Login**: Users enter username/password on `/login` page
2. **Token storage**: Successful login stores JWT token in localStorage
3. **Auto-authentication**: App checks for valid token on startup
4. **Route protection**: All routes except `/login` require authentication
5. **Auto-logout**: Invalid/expired tokens trigger automatic logout

### Key Components

- **AuthContext**: Manages user state and authentication methods
- **ClientLayout**: Handles routing logic (login page vs protected pages)
- **ProtectedRoute**: Wrapper component that enforces authentication
- **Login page**: User interface for authentication
- **API client**: Handles auth tokens and requests

### API Endpoints Expected

The frontend expects these backend endpoints:

- `POST /auth/login` - Login with username/password

  ```json
  {
    "username": "admin",
    "password": "password"
  }
  ```

  Response:

  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "id": 1,
      "username": "admin",
      "email": "admin@example.com"
    }
  }
  ```

**Note:** The `/auth/verify` endpoint is not currently implemented in the backend. For now, the frontend trusts stored tokens until the backend has proper token verification.

### Usage

1. **Start the app**: Users see login page if not authenticated
2. **Login**: Enter credentials to access the dashboard
3. **Navigation**: All existing pages now require authentication
4. **Logout**: Click "Sign out" in sidebar to logout

### Security Features

- Tokens are automatically attached to all API requests
- Invalid tokens trigger automatic logout and redirect to login
- Server-side validation required (401 responses handle token expiration)
- Client-side localStorage protects against page refreshes
