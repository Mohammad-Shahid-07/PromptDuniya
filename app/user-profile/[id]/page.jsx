"use client"


import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import Profile from "/components/Profile"
const UserProfile = ({params}) => {
  const router = useRouter()
  const id = params.id
  const [post, setPost] = useState([])
  
    
    useEffect(() => {
        const fetchPosts = async () => {
          const res = await fetch(`/api/users/${id}/posts`)
          const data = await res.json()
          setPost(data)
        }
        if(id){
            fetchPosts()
        } 
      
      }, [])

  return (

    <Profile 
    name={post[0]?.creator?.username}
    desc= "User Profile"
    data={post}
    />



  )
}

export default UserProfile