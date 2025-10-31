import { OpenAPI as AuthOpenAPI } from './generate/auth-service'; 
import { OpenAPI as UserOpenAPI } from './generate/user-service'; 

AuthOpenAPI.BASE = import.meta.env.VITE_AUTH_API || '/api/auth/';
UserOpenAPI.BASE = import.meta.env.VITE_USER_API || '/api/user/';

export default { AuthOpenAPI, UserOpenAPI };
