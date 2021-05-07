/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Auth0 from 'react-native-auth0';

const AUTH0_DOMAIN = 'dev-69kwsmbb.us.auth0.com';
const CLIENT_ID = 'LLiZyso5xLnaUFlrl4hiWk3CHhurHzkI';

const auth0 = new Auth0({
    domain: `${AUTH0_DOMAIN}`,
    clientId: `${CLIENT_ID}`,
});

const dbConnection = 'Username-Password-Authentication';

export { auth0, AUTH0_DOMAIN, CLIENT_ID, dbConnection };
