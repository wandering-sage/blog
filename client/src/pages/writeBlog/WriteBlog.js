import axios from "axios";
import { useState } from "react";
import { api } from "../../backend";
import { user } from "../../user";
import "./writeBlog.css"

export default function WriteBlog() {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  return (
    <div>
      <div className="write">
      <p className="err">{error}</p>
        <div className="heading">Blog Editor</div>
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <input
            className="writeInput title"
            placeholder="Your Title Here"
            type="text"
            required
            autoFocus={true}
            onChange={(e)=>setName(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <input
            className="writeInput"
            placeholder="Image Link Here"
            type="text"
            required
            autoFocus={true}
            onChange={(e)=>setImage(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Your Content Here..."
            type="text"
            required
            autoFocus={true}
            onChange={(e)=>setContent(e.target.value)}
          />
        </div>
        <button className="writeSubmit" type="submit">
          PUBLISH
        </button>
      </form>
    </div>
    </div>
  );
  async function handleSubmit(e){
    e.preventDefault();
    if(user!=="admin"){
      setError("Only Admin can add post");
      return;
    }
    setError("");
		try{
			await axios.post(api+"/post",{
				name,
        image,
        content
			});
			window.location.reload();
		}catch(e){
			setError(e.message)
		}
  }
}
