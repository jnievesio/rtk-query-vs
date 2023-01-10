
import { Auth, Amplify } from 'aws-amplify';
// import awsconfig from '../../../aws-exports';
const awsconfig = {
    // OPTIONAL - if your API requires authentication
    Auth: {
        // REQUIRED - Amazon Cognito Identity Pool ID
        identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
        // REQUIRED - Amazon Cognito Region
        region: process.env.REACT_APP_AWS_REGION,
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: process.env.REACT_APP_USER_POOL_ID,
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID,
        oauth: {
            domain: process.env.REACT_APP_OAUTH_DOMAIN,
            scope: [
                'phone',
                'email',
                'profile',
                'openid',
                'aws.cognito.signin.user.admin',
            ],
            redirectSignIn: 'http://localhost:3000/',
            redirectSignOut: 'http://localhost:3000/',
            responseType: 'code', // or 'token', note that REFRESH token will only be generated when the responseType is code
            client_id: '2lliikjt4kt76esvp9ns0est1b',
        },
        federationTarget: 'COGNITO_USER_POOLS',
    },
    API: {
        endpoints: [
            {
                name: process.env.REACT_APP_API_NAME,
                endpoint: process.env.REACT_APP_API_URL,
                region: process.env.REACT_APP_AWS_REGION,
            },
        ],
    },
};

Amplify.configure(awsconfig);
export async function signIn(username: string, password: string) {
    const result = await Auth.signIn(username, password);
    if (result.challengeName === 'NEW_PASSWORD_REQUIRED') {
        console.log({result})
        throw new Error('NEW_PASSWORD_REQUIRED');
    }
    console.log({result})
    return result;
}