import axios from 'axios';
import {AsyncStorage} from 'react-native';
//Harcoding the url for now for axios
//Implementing request



const axiosInstance = axios.create({
   'baseURL': 'https://www.themealdb.com/api/json/v1/1/'
});


export default axiosInstance;