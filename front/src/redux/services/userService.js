import axios from "axios";
import { REACT_APP_BACKEND_URL } from "../../utils/helper";

export const API_URL = `${REACT_APP_BACKEND_URL}/auth/user/link/`;

const getAllLinks = async() => {
    const response = await axios.get(API_URL);
    return response.data;
}

const createLinks = async(linksData) => {
    const response = await axios.post(API_URL, linksData);
    return response.data;
}

const deleteLink = async(linkId) => {
    const response = await axios.delete(API_URL + linkId)
    return response.data;
}

const updateLink = async(linkData, linkId) => {
    const response = await axios.put(API_URL + linkId, linkData);
    return response.data;
}

const searchUserLinks = async(userId) => {
    const response = await axios.get(API_URL + userId);
    return response.data;
}

const userService = {
    getAllLinks,
    createLinks,
    deleteLink,
    updateLink,
    searchUserLinks
}

export default userService;