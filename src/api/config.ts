import { client as authClient } from './generate/auth-service/client.gen';
import { client as userClient } from './generate/user-service/client.gen';
import { setupApiClient } from './setupApiClient';

setupApiClient(authClient, 'auth');
setupApiClient(userClient, 'user');
