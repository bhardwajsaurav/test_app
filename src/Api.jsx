import axios from "axios";



export function GetNews() {
    return axios
      .get(`https://newsapi.org/v2/top-headlines/sources?apiKey=f4c7f573f3214809b7dbec2a1f31b8c5`)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
  }