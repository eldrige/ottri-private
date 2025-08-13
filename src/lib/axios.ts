import Axios from "axios";

export const axios = Axios.create({
  // baseURL: 'https://globe-backend-90f62cd1f1d0.herokuapp.com/',
  baseURL: "https://ottri-backend-600e2b0645fc.herokuapp.com/api/v1/"
});
