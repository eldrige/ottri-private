import Axios from "axios";

export const axios = Axios.create({
  // baseURL: "https://ottri-backend-600e2b0645fc.herokuapp.com/api/v1/"
  baseURL: "http://172.30.19.171:3000/api/v1/"
});
