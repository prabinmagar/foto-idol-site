import axios from "axios";
import { REACT_APP_BACKEND_URL } from "../../../utils/helper";

export const API_URL = `${REACT_APP_BACKEND_URL}/setting/`;
export const API_URL_HOMESLIDER = `${REACT_APP_BACKEND_URL}/setting/homeslider`;
export const API_URL_FEATURES = `${REACT_APP_BACKEND_URL}/setting/feature`;
export const API_URL_CATEGORY = `${REACT_APP_BACKEND_URL}/setting/category`;
export const API_URL_CONTACTINFO = `${REACT_APP_BACKEND_URL}/setting/contactinfo`;
const config = { headers: { "Content-Type": "multipart/form-data" } };
export const API_URL_LIMIT = `${API_URL}/postconfig`;

const createHomeSlider = async (formdata) => {
  const response = await axios.post(API_URL_HOMESLIDER, formdata, config);
  return response.data.message;
};

const getAllhomeSlider = async () => {
  const response = await axios.get(API_URL_HOMESLIDER);
  return response.data;
};
const gethomeSlider = async (id) => {
  const response = await axios.get(`${API_URL_HOMESLIDER}/${id}`);
  return response.data;
};

const deletehomeSlider = async (categoryId) => {
  const response = await axios.delete(API_URL_HOMESLIDER, { data: { id: categoryId } });
  return response.data.message;
};

const updatehomeSlider = async (id, formdata) => {
  const response = await axios.put(`${API_URL_HOMESLIDER}/${id}`, formdata, config);
  return response.data;
};

// Feature List API
const toggleHomeFeature = async (resourceId) => {
  const response = await axios.post(API_URL_FEATURES, { resourceId });
  return response.data;
};
const getFeaturesLists = async () => {
  const response = await axios.get(API_URL_FEATURES);
  return response.data;
};

// Feature Category API
const toggleCategoryFeature = async (resourceId) => {
  const response = await axios.post(API_URL_CATEGORY, { resourceId: resourceId });
  return response.data;
};
const getCategoryFeaturesLists = async () => {
  const response = await axios.get(API_URL_CATEGORY); 
  return response.data;
};

//Contact Information API
const createOrUpdateContactInfo = async (formdata) => {
  const response = await axios.post(API_URL_CONTACTINFO, formdata);
  return response.data;
};

const getContactInfo = async () => {
  const response = await axios.get(API_URL_CONTACTINFO);
  return response.data;
};

// Post Limit
const addPostLimit = async (formdata) => {
  const response = await axios.post(API_URL_LIMIT, formdata);
  return response.data;
};
const getPostLimit = async () => {
  const response = await axios.get(API_URL_LIMIT);
  return response.data;
};

const settingService = {
  createHomeSlider,
  getAllhomeSlider,
  gethomeSlider,
  deletehomeSlider,
  updatehomeSlider,
  toggleHomeFeature,
  getFeaturesLists,
  createOrUpdateContactInfo,
  getContactInfo,
  addPostLimit,
  getPostLimit,
  toggleCategoryFeature,
  getCategoryFeaturesLists
};

export default settingService;
