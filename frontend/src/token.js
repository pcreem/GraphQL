import Cookies from 'js-cookie'
const AUTH_TOKEN = 'auth-token';

export const getToken = () => Cookies.get(AUTH_TOKEN);
export const setToken = token => Cookies.set(AUTH_TOKEN, token, { expires: 7 });
export const deleteToken = () => Cookies.remove(AUTH_TOKEN);