# Authentication Functions

This directory contains authentication-related functions for the FindForce application.

## Functions

### createCustomToken

Creates a custom authentication token using Firebase Admin SDK after validating credentials with the Credit Force API.

#### Usage

```javascript
const createCustomToken = require('./createCustomToken');

// Authenticate user and create token
const { token, claims } = await createCustomToken({
  username: 'XMI1VonhdNpkRS18c2Dq9g==',
  password: 'TIFPrlrAy6Gmj593ZkZQmg==',
  deviceId: 'Nl54EFRDbzNILBAaLOoEUQ==',
  companyName: 'uHgngn0mj6qsevFPtP6Uvw==',
  biometric: true
});
```

#### Parameters

- `params` (object): Authentication parameters
  - `username` (string): Encrypted username
  - `password` (string): Encrypted password
  - `deviceId` (string): Encrypted device ID
  - `companyName` (string): Encrypted company name
  - `biometric` (boolean, optional): Whether biometric authentication is enabled

#### Returns

- `Promise<Object>`: A promise that resolves with:
  - `token` (string): The generated Firebase custom token
  - `claims` (object): The claims included in the token
    - `userId` (string): User's ID
    - `name` (string): User's name
    - `acceptedTerms` (boolean): Whether user has accepted terms
    - `apiKey` (string): API key for subsequent requests
    - `parameters` (object): User parameters
    - `companyName` (string): Company name
    - `deviceId` (string): Device ID

#### Security Features

- Uses Firebase Admin SDK for secure token generation
- Integrates with Credit Force API for authentication
- Supports encrypted credentials
- Input validation
- Error handling
- Automatic token expiration

#### Testing

Run the tests using:

```bash
npm test
```

#### Environment Setup

1. Initialize Firebase Admin SDK in your application:

```javascript
const admin = require('firebase-admin');
const serviceAccount = require('./path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
```

2. Set up environment variables:
```bash
export CF_API_URL=https://api-mobile-proxy-test.credit-force.com
```

## Best Practices

1. Always initialize Firebase Admin SDK before using this function
2. Keep credentials encrypted
3. Handle the async nature of the function properly
4. Implement proper error handling
5. Use environment variables for configuration
6. Follow security best practices for token handling
7. Validate all input parameters
8. Handle API errors appropriately