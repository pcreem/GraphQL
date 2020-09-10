// import Cookies from 'js-cookie'
// const AUTH_TOKEN = process.env.REACT_APP_AUTH_TOKEN;
// const USER_NAME = process.env.REACT_APP_USER_NAME;

// export const getToken = () => Cookies.get(AUTH_TOKEN);
// export const setToken = token => Cookies.set(AUTH_TOKEN, token, { sameSite: 'strict', secure: true, expires: 1 });
// export const deleteToken = () => Cookies.remove(AUTH_TOKEN);

// export const getUserName = () => Cookies.get(USER_NAME);
// export const setUserName = name => Cookies.set(USER_NAME, name, { sameSite: 'strict', secure: true, expires: 1 });
// export const deleteUserName = () => Cookies.remove(USER_NAME);

const AUTH_TOKEN = 'auth-token';

export const getToken = () => localStorage.getItem(AUTH_TOKEN);
export const setToken = token => localStorage.setItem(AUTH_TOKEN, token);
export const deleteToken = () => localStorage.removeItem(AUTH_TOKEN);

const USER_NAME = 'user-name';

export const getUserName = () => localStorage.getItem(USER_NAME);
export const setUserName = name => localStorage.setItem(USER_NAME, name);
export const deleteUserName = () => localStorage.removeItem(USER_NAME);