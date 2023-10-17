"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import Profile from "/components/Profile"
const MyProfile = () => {
    const router = useRouter()
    const { data: session } = useSession()
    const [post, setPost] = useState([])
    console.log(post);

    useEffect(() => {
        const fetchPosts = async () => {
          const res = await fetch(`/api/users/${session?.user.id}/posts`)
          const data = await res.json()
          setPost(data)
        }
        if(session?.user.id){
            fetchPosts()
        } 
      
      }, [])
    const handleEdit = (post) => {
      router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete = async (post) => {
      const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        })
        const filteredPosts = post.filter((p) => p._id !== post._id)
        setPost(filteredPosts)
        
        router.push("/");
        
      } catch (error) {
        console.log(error)
      }
    }
  return (

    <Profile 
    name={session?.user.name}
    desc= "My Profile"
    data={post}
    handleDelete={handleDelete}
    handleEdit={handleEdit}
    />



  )
}

export default MyProfile