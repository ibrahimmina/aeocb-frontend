import axios from "axios";

export default axios.create({
  baseURL: "https://aeocb-backend.herokuapp.com/",
  headers: {
    "Content-type": "application/json"
  }
});