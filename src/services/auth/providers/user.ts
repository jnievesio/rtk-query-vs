import APIClient from '../../api/client';

export async function updateLogin() {
    return APIClient.putData('/users/me/login');
}

export async function getUserData() {
    return (await APIClient.getData('/users/me')).data;
}
