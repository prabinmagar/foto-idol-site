import axios from "axios";
import { REACT_APP_BACKEND_URL } from "../../utils/helper";

export const API_URL = `${REACT_APP_BACKEND_URL}/about/`;
export const API_URL_LOCATION = `${API_URL}location/`;

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const createAbout = async (formdata) => {
  const response = await axios.post(API_URL, formdata, config);
  return response.data.message;
};

const updateAbout = async (id, formdata) => {
  const response = await axios.put(API_URL + id, formdata, config);
  return response.data.message;
};

const getAllAbout = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const deleteAbout = async (aboutId) => {
  const response = await axios.delete(API_URL, {
    data: {
      id: aboutId,
    },
  });
  return response.data.message;
};

const createLocation = async (formdata) => {
  const response = await axios.post(API_URL_LOCATION, formdata);
  return response.data.message;
}

const getAllLocation = async() => {
  const response = await axios.get(API_URL_LOCATION)
  return response.data;
}

const deleteLocation = async (deleteId) => {
  const response = await axios.delete(API_URL_LOCATION, {
    data: {
      id: deleteId,
    },
  });
  return response.data.message;
};

const updateLocation = async (id, formdata) => {
  const response = await axios.patch(API_URL_LOCATION + id, formdata);
  return response.data.message;
};

const aboutService = {
  getAllAbout,
  deleteAbout,
  createAbout,
  updateAbout,
  createLocation,
  getAllLocation,
  deleteLocation,
  updateLocation
};

export default aboutService;
