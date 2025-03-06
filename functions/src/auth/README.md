# Authentication Functions

This directory contains authentication-related functions for the FindForce application.

## Functions

### createCustomToken

Creates a custom JWT token for user authentication.

#### Usage

```javascript
const createCustomToken = require('./createCustomToken');

// Create a basic token
const token = createCustomToken('userId123');

// Create a token with additional claims
const tokenWithClaims = createCustomToken('userId123', {
  role: 'admin',
  organization: 'org123'
});
```

#### Parameters

- `uid` (string): The user ID to create a token for
- `additionalClaims` (object, optional): Additional claims to include in the token

#### Returns

- `string`: The generated JWT token

#### Security Features

- Uses HS256 algorithm for signing
- Includes standard JWT claims (iss, sub, aud, iat, exp)
- Configurable token expiry
- Environment variable based secret key
- Input validation
- Error handling

#### Testing

Run the tests using:

```bash
npm test
```

#### Environment Variables

- `JWT_SECRET_KEY`: Secret key for token signing (min 32 characters)

## Best Practices

1. Always use environment variables for sensitive data
2. Keep token expiry times reasonable
3. Validate all inputs
4. Handle errors appropriately
5. Use strong secret keys
6. Include only necessary claims in tokens