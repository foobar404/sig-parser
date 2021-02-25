// import React,{useContext} from "react"
// import {Context} from "../components"
import axios from "axios"
import {config} from "./"

export function useAxios(){
//   let context = useContext(Context)

  let api = axios.create({
    baseURL:config.backendUrl,
    timeout: 10000,
    headers: {
      authorization:config.apiToken,
      crossDomain: true,
      contentType: 'application/json; charset=utf-8'
    },
    params: {
      api_token: config.apiToken
    }
  });

  return api
}