import axios from "axios"

 const BASE_URL = "https://jsonplaceholder.typicode.com"



export const userDetails = async () => {               //to get the data from api
    const data = await axios.get(`${BASE_URL}/users`)
    return data;
 }

 export const addUserDetails = async (payload) => {  //to post the user details in api
    const data  = await axios.post(`${BASE_URL}/users`, payload)
    return data;
  }

 export const deleteUserById = async (userId) =>{     //to delete the data from the api
    const data = await axios.delete(`${BASE_URL}/users/${userId}`);
    return data;
  }

export  const updateUserById = async(userId,payload)=>{   //to update the data in api.
    const data = await axios.put(`${BASE_URL}/users/${userId}`);
    return data;
  }