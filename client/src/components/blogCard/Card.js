import { Link } from "react-router-dom"
import "./card.css"

export default function Card({post}) {
  return (
    <div className="card">
      <div className="image">
        <img src={post.image} alt="" />
      </div>
      <div className="content">
        <div className="heading">{post.name}</div>
        <div className="meta">Published at - {new Date(post.createdAt).toDateString().split(' ').slice(1).join(' ')}</div>
        <div className="desc">{post.content.substring(0, 100)}...</div>
      </div>
      <Link className="link" to={`/post/${post._id}`}>
        <div className="extra content">Read More..</div>
      </Link>
    </div>
  )
} 
