export const API_URL = "http://localhost:8080"; 
export const SITE_URI = "/project-management/user";

export const getUsername = () => sessionStorage.getItem("username");
export const getToken = () => sessionStorage.getItem("token");
export const getIsLoggedIn = () => sessionStorage.getItem("isLoggedIn");
export const getUserId = () => sessionStorage.getItem("userID");
