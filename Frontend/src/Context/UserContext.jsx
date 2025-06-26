import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthDataContext } from "./AuthContext";
import axios from "axios";

export const userDataContext =  createContext()

function UserContext({ children }){
let {serverUrl} = useContext(AuthDataContext)
let [userData, setUserData] = useState(null)

const getCurrentUser = async () => {
    try {
        let result = await axios.get(serverUrl + "/api/user/currentuser", {withCredentials:true})
        setUserData(result.data)
    } catch (error) {
        setUserData(null)
        console.log(error)
    }
}
    useEffect(()=>{
         getCurrentUser()
    },[])

let value={
    userData, 
    setUserData
}

    return(
        
            <userDataContext.Provider value={value}>
                {children}
            </userDataContext.Provider>
        
    )
}

export default UserContext