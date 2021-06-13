import Card from "../blogCard/Card"
import "./blogs.css"

export default function Blogs({posts}) {
  return (
    <div className="blog-container">
      <div className="grid">
        {posts.map((p)=>(
          <Card key={p._id} post={p} />
        ))}
      </div>
    </div>
  )
}
