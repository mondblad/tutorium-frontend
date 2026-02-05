import { OpenAPI as AuthOpenAPI } from './generate/auth-service'; 
import { OpenAPI as UserOpenAPI } from './generate/user-service'; 

const gatewayUrl = import.meta.env.VITE_GATEWAY_URL;

AuthOpenAPI.BASE = `${gatewayUrl}/auth`;
UserOpenAPI.BASE = `${gatewayUrl}/user`;

export default { AuthOpenAPI, UserOpenAPI };