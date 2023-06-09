import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';



const root = createRoot(document.getElementById('root'));

root.render(
<Auth0Provider
    domain="dev-ut6ajxmaug8bocvp.us.auth0.com"
    clientId="qbApKwODipriSNOQgVYgKkdCnCqX40Zl"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App/>
  </Auth0Provider>,

  <React.StrictMode/>
    

);

