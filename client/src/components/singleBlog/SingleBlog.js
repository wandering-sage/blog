import "./singleBlog.css"

export default function SingleBlog({post}) {
  return (
    <div className="single-blog">
      <div className="blog-heading">{post.name}</div>
      <div className="blog-image"><img src={post.image} alt="" /></div>
      <div className="blog-content">{post.content}</div>
    </div>
  )
}
