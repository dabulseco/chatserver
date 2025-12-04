export const HOST = import.meta.env.VITE_SERVER_URL;
export const AUTH_URL = "api/auth";
export const SIGNUP_URL = `${AUTH_URL}/signup`;
export const LOGIN_URL = `${AUTH_URL}/login`;
export const GET_USER_INFO_URL = `${AUTH_URL}/user-info`;
export const UPDATE_USER_INFO_URL = `${AUTH_URL}/update-profile`;
export const ADD_PROFILE_IMAGE_ROUTE = `${AUTH_URL}/add-profile-image`;
export const DELETE_PROFILE_IMAGE_ROUTE = `${AUTH_URL}/delete-profile-image`;
export const LOGOUT_ROUTE = `${AUTH_URL}/logout`;

export const CONTACT_URL = "/api/contact"
export const SEACRH_CONTACT_URL = `${CONTACT_URL}/search`;
export const GET_DM_CONTACTS_URL = `${CONTACT_URL}/get-contact-for-dm`;
export const GET_ALL_CONTACTS_URL = `${CONTACT_URL}/get-all-contact`;

export const MESSAGE_URL = "/api/message"
export const GET_ALL_MESSAGES_URL = `${MESSAGE_URL}/get-messages`;
export const UPLOAD_FILE_URL = `${MESSAGE_URL}/upload-file`;

export const CHANNEL_URL = "/api/channel"
export const CREATE_CHANNEL_URL = `${CHANNEL_URL}/create-channel`;
export const GET_USER_CHANNEL_URL = `${CHANNEL_URL}/get-user-channels`;
export const GET_CHANNEL_MESSAGES_URL = `${CHANNEL_URL}/get-channel-messages`;
