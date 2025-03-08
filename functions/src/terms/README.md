# Terms Acceptance Function

This Cloud Function handles the terms and conditions acceptance process for the FindForce application.

## Function: `acceptTerms`

Accepts the terms and conditions for a user and updates their status in both the Credit Force API and Firebase Authentication claims.

### Parameters

```typescript
{
  userId: string;      // User's ID
  deviceId: string;    // Device identifier
  acceptedOn: string;  // ISO timestamp of acceptance
  language: string;    // Language code ('en' or 'es')
}
```

### Returns

```typescript
{
  success: boolean;
  data: any;          // Response data from Credit Force API
}
```

### Error Codes

- `unauthenticated`: User is not authenticated
- `invalid-argument`: Missing required parameters
- `unknown`: API error with specific code
- `internal`: General internal error

### Usage Example

```typescript
import { getFunctions, httpsCallable } from 'firebase/functions';

const acceptTerms = httpsCallable(functions, 'acceptTerms');

try {
  const result = await acceptTerms({
    userId: 'user123',
    deviceId: 'device456',
    acceptedOn: new Date().toISOString(),
    language: 'en'
  });
  
  console.log('Terms accepted:', result.data);
} catch (error) {
  console.error('Error accepting terms:', error);
}
```

### Security Rules

- User must be authenticated
- All parameters must be provided
- Terms can only be accepted once per user

### Integration Notes

1. Function updates both:
   - Credit Force API status
   - Firebase Authentication claims

2. Claims update includes:
   - acceptedTerms: true
   - acceptedOn: timestamp
   - language: user's language

3. Error handling includes:
   - Parameter validation
   - API error handling
   - Authentication verification