
# Guidelines:

- After installing npm packages create a folder name `lib` under `mobile` folder.
- Then create a file name `auth0` under `lib` folder and copy that content

** <b>Make sure to replace your keys</b> **

```
import Auth0 from 'react-native-auth0';

const AUTH0_DOMAIN = 'dev-69kwsmbb.us.auth0.com';
const CLIENT_ID = 'LLiZyso5xLnaUFlrl4hiWk3CHhurHzkI';

const auth0 = new Auth0({
  domain: `${AUTH0_DOMAIN}`,
  clientId: `${CLIENT_ID}`,
});

const dbConnection = 'Username-Password-Authentication'

export { auth0, AUTH0_DOMAIN, CLIENT_ID, dbConnection };
```