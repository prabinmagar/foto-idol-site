import axios from "axios";
import { REACT_APP_BACKEND_URL } from "../../utils/helper";

export const API_URL = `${REACT_APP_BACKEND_URL}/category/`;

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const createCategory = async (formdata) => {
  const response = await axios.post(API_URL, formdata, config);
  return response.data;
};

const getallCategory = async () => {
  const response = await axios.get(API_URL);
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

const updateCategory = async (id, formdata) => {
  const response = await axios.patch(API_URL + "update/" + id, formdata, config);
  return response.data;
};

const categoryService = {
  createCategory,
  getallCategory,
  getCategory,
  deleteCategory,
  updateCategory,
};

export default categoryService;
