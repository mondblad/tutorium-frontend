const gatewayUrl = import.meta.env.VITE_GATEWAY_URL;

const handleUnauthorized = (response: Response) => {
  console.log(response.status);
  if (response.status === 401) {
    console.log('🚫 401 Unauthorized:', response.url);
    
    if (!window.location.pathname.includes('/login')) {
      window.location.href = '/login';
    }
  }
  return response;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setupApiClient(client: any, url: string) {
  client.setConfig(
    { 
      baseUrl: `${gatewayUrl}/${url}`, 
      credentials: 'include' 
    }
  );

  client.interceptors.response.use(handleUnauthorized);
}
