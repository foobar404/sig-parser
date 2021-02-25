let environment = process.env.REACT_APP_ENV

let configEnv = {
    development:{
        
    },
    production:{
      
    },
    global:{
        backendUrl:"https://api.pipedrive.com/v1/",
        apiToken:"3a3f6432a9ffaeec15948f011de880766d2cb657"
    }
}

export const config = {
    ...configEnv.global,
    ...configEnv[environment]
}