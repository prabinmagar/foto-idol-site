import axios from "axios";
import { REACT_APP_BACKEND_URL } from "../../utils/helper";

export const API_URL = `${REACT_APP_BACKEND_URL}/category/`;

const createCategory = async (formdata) => {
  const response = await axios.post(API_URL, formdata);
  return response.data;
};

const getallCategory = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getSingleCategory = async (categoryId) => {
  const response = await axios.get(API_URL + "single/" + categoryId);
  return response.data;
};

const getCategory = async () => {
  const response = await axios.post(API_URL + "single");
  return response.data;
};

const deleteCategory = async (categoryId) => {
  const response = await axios.delete(API_URL + "delete", { data: { id: categoryId } });
  return response.data.message;
};

const updateCategory = async (formdata) => {
  const response = await axios.patch(API_URL + "update", formdata);
  return response.data;
};

const categoryService = {
  createCategory,
  getallCategory,
  getCategory,
  deleteCategory,
  updateCategory,
  getSingleCategory
};

export default categoryService;
