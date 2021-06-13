import { useEffect, useState } from "react";
import Blogs from "../../components/blogs/Blogs";
import Header from "../../components/header/Header";
import axios from "axios"
import "./home.css"
import { api } from "../../backend";

export default function Home() {
  const [posts, setposts] = useState([])

  useEffect(()=>{
    const fetchPosts = async () => {
      const res = await axios.get(api+"/post")
      setposts(res.data.data)
    }
    fetchPosts()
  }, [])

  return (
    <div className="main-content">
      <Header />
      <Blogs posts={posts} />
    </div>
  )
}

