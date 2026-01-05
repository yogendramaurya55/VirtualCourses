import axios from 'axios'
import React from 'react'
import { serverUrl } from '../App'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import {useDispatch} from "react-redux"
import { setUserData } from '../redux/userSlice'



const fetchUser = async (dispatch) => {
  try {
    const result = await axios.get(serverUrl + "/api/user/getcurrentuser" ,
    {
        withCredentials:true
    }
  )

  

  dispatch(setUserData(result.data));
  console.log(result.data);
  
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
    dispatch(setUserData(null));
  }
}


const useGetCurrentUser = ()=>{
  const dispatch = useDispatch()
  useEffect(()=>{
    

fetchUser(dispatch)
  },[dispatch])
}

export default useGetCurrentUser
