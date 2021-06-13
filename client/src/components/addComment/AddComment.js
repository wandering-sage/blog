import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { api } from "../../backend";
import { user } from "../../user";
import "./addcmt.css"

export default function AddComment() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [comment, setComment] = useState("");
	const [error, setError] = useState("");
  return (
    <div className="add-comment">
      <form className="cmtForm" onSubmit={handleSubmit}>
        <textarea rows="2" spellCheck="false" onChange={(e)=>setComment(e.target.value)}></textarea>
				<button className="addCmtBtn" type="submit">Add Comment</button>
			</form>
      <p className="err">{error}</p>
    </div>
  );
  async function handleSubmit(e){
    e.preventDefault();
    if(!user){
      window.location.replace("/login");
    }
    if(comment===""){
      setError("Please provide a comment");
      return;
    }
    setError("");
		try{
			await axios.post(api+"/comment",{
				content: comment,
        post: path
			});
			window.location.reload();
		}catch(e){
			setError(e.message)
		}
  }
}
