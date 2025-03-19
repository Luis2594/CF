# Client Management Functions

This directory contains Cloud Functions for managing client operations in the FindForce application.

## Functions

### getClients

Fetches clients assigned to a specific manager.

#### Usage

```typescript
import { getFunctions, httpsCallable } from 'firebase/functions';

const getClients = httpsCallable(functions, 'getClients');

try {
  const result = await getClients();
  console.log('Clients:', result.data);
} catch (error) {
  console.error('Error fetching clients:', error);
}
```

### postGestor

Updates client management record with detailed information.

#### Usage

```typescript
import { getFunctions, httpsCallable } from 'firebase/functions';

const postGestor = httpsCallable(functions, 'postGestor');

try {
  const result = await postGestor({
    userId: 'user123',
    clientId: 'client456',
    portfolioId: 'portfolio789',
    // ... other required fields
  });
  console.log('Update result:', result.data);
} catch (error) {
  console.error('Error updating client:', error);
}
```

## Security

- All functions require authentication
- User token validation
- Input validation for required fields
- Secure HTTPS communication

## Error Handling

Both functions implement comprehensive error handling:
- Authentication errors
- Missing parameters
- API communication errors
- Invalid input validation

## Integration Notes

1. Functions require:
   - Valid Firebase Authentication
   - User token in claims
   - Proper request parameters

2. API Integration:
   - Uses Credit Force API
   - Maintains secure connections
   - Handles response parsing

3. Response Format:
   ```typescript
   {
     success: boolean;
     data: any;
   }
   ```