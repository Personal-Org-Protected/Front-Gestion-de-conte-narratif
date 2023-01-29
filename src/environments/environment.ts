import Auth0Config  from '../../auth-config.json';
import ApiserverConfig from '../../Api-Server-Config.json';

export const environment = {
  production: false,
  auth:{
    domain:Auth0Config.domain,
    clientId:Auth0Config.clientId,
    audience:Auth0Config.audience,
  },
  serverApi:{
    DefaultConfig:ApiserverConfig.default
  }
};

