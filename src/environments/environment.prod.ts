import Auth0Config  from '../../auth-config.json';
import ApiserverConfig from '../../Api-Server-Config.json';
export const environment = {
  production: true,
  auth:{
    domain:Auth0Config.domain,
    clientId:Auth0Config.clientId,
    redirectUri:window.location.origin
  },
  serverApi:{
    DefaultConfig:ApiserverConfig.default
  }
};



