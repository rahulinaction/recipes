import axios from 'axios';
//Harcoding the url for now for axios
//Implementing request



const axiosInstance = axios.create({
   'baseURL': 'https://www.themealdb.com/api/json/v1/1/'
});


export default axiosInstance;