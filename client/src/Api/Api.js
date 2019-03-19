import axios from "axios";

const Api = {};

const baseUrl = process.env.BASE_URL;

const token = localStorage.getItem("user");

Api.get = async url => {
  try {
    const response = await axios.get(`${baseUrl}${url}`, {
      headers: {
        Authorization: JSON.parse(token) || null
      }
    });
    return response.data;
  } catch (error) {
    // console.log(error.response.data.message);
    return error.response.data;
  }
};

Api.create = async (url, data) => {
  try {
    const response = await axios.post(`${baseUrl}${url}`, data, {
      headers: {
        Authorization: JSON.parse(token) || null
      }
    });
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

Api.update = async (url, data) => {
  try {
    const response = await axios.put(`${baseUrl}${url}`, data, {
      headers: {
        Authorization: JSON.parse(token) || null
      }
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

Api.delete = async (url, data) => {
  try {
    const response = await axios.delete(`${baseUrl}${url}`, data, {
      headers: {
        Authorization: JSON.parse(token) || null
      }
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export default Api;
