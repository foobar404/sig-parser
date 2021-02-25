import React from 'react'
import {Route,Redirect} from "react-router-dom"

export function ProtectedRoute({component:Component,path,exact}){
    return (<Route path={path} exact={exact} render={()=>{
      if(localStorage.getItem("token"))
        return <Component />    
      else
        return <Redirect to="/login"/>       
    }}/>)   
}