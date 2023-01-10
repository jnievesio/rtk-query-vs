/* eslint-disable @typescript-eslint/no-explicit-any */
import { API, Auth } from 'aws-amplify';

const apiName = process.env.REACT_APP_API_NAME || '';
export default class APIClient {
    public static async getData(path: string) {
        const myInit = {
            headers: {
                Authorization: `Bearer ${(await Auth.currentSession())
                    .getIdToken()
                    .getJwtToken()}`,
            },
        };

        return API.get(apiName, path, myInit);
    }
}
