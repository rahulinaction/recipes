import axios from 'axios';
import AppConstants from '../config/constants'
//Harcoding the url for now for axios
//Implementing request

const axiosInstance = axios.create({
  'baseURL': AppConstants.baseApiUrl
});

export default axiosInstance;