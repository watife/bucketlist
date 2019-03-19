import axios from "axios";

const Api = {};

const baseUrl = process.env.BASE_URL;

const token = localStorage.getItem("user");

Api.get = async url => {
  try {
    const response = await axios.get(`${baseUrl}${url}`, {
      headers: {
        Authorization: token || null
      }
    });
    return response.data;
  } catch (error) {
    // console.log(error.response.data.message);
    return error;
  }
};

Api.create = async (url, data) => {
  try {
    const response = await axios.post(`${baseUrl}${url}`, data, {
      headers: {
        Authorization: token || null
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
        Authorization: token || null
      }
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

Api.delete = async url => {
  try {
    const response = await axios.delete(`${baseUrl}${url}`, {
      headers: {
        Authorization: token || null
      }
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

Api.auth = async (url, data) => {
  try {
    const response = await axios.post(`${baseUrl}${url}`, data);

    localStorage.setItem("user", response.data.token);

    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};
export default Api;
