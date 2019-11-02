import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-builder-4cf83.firebaseio.com/"
});

export default instance;
