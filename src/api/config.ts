import { OpenAPI as AuthOpenAPI } from './generate/auth-service'; 
import { OpenAPI as UserOpenAPI } from './generate/user-service'; 

AuthOpenAPI.BASE = import.meta.env.VITE_AUTH_API;
UserOpenAPI.BASE = import.meta.env.VITE_USER_API;

export default { AuthOpenAPI, UserOpenAPI };
