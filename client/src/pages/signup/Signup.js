import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import "./signup.css";
import axios from "axios";
import { api } from "../../backend";

export default function Signup() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const emailErr = useRef();
	const passwordErr = useRef();
	const cfmPassword = useRef();

	return (
		<div className="signup">
			<span className="signupTitle">Register</span>
			<form className="signupForm" onSubmit={handleSubmit}>
				<input className="signupInput" type="text" placeholder="Name" required minLength="3" onChange={(e)=>setName(e.target.value)}/>
				<div className="form-field">
					<input className="signupInput" type="text" placeholder="Email" required onChange={emailChanged}/>
					<div ref={emailErr} className="error-icon">
						<i className="fas fa-exclamation-circle"></i>
					</div>
				</div>
				<input className="signupInput" type="password" placeholder="Password" required minLength="5" onChange={(e)=>setPassword(e.target.value)}/>
				<div className="form-field">
					<input ref={cfmPassword} className="signupInput" type="password" placeholder="Confirm Password" required onChange={cfmPasswordChange}/>
					<div ref={passwordErr} className="error-icon">
						<i className="fas fa-exclamation-circle"></i>
					</div>
				</div>
				<button className="signupButton">Register</button>
			</form>
			<p>Already have an account? <Link className="link" to="/login"><span className="login-link">Login</span></Link></p>
			<p className="err">{error}</p>
		</div>
	);
	function cfmPasswordChange(e){
		if(e.target.value===password){
			passwordErr.current.classList.remove("show");
		}else{
			passwordErr.current.classList.add("show");
		}
	}
	function emailChanged(e){
		setEmail(e.target.value);
		emailErr.current.classList.remove("show");
	}
	async function handleSubmit(e){
		e.preventDefault();
		if(!isEmail(email)){
			setError("Please use a valid Email");
			emailErr.current.classList.add("show")
			return;
		}
		if(cfmPassword.current.value !== password){
			setError("Passowrds dont match!");
			return;
		}
		setError("");
		emailErr.current.classList.remove("show");
		passwordErr.current.classList.remove("show");
		try{
			const res = await axios.post(api+"/signup",{
				name,
				email,
				password
			});
			localStorage.setItem("token", res.data.token);
			localStorage.setItem("user", "true");

			const newRes = await axios.get(api+"/user", { headers: {"Authorization" : `Bearer ${res.data.token}`} });
			if(newRes.data.data.role === 100){
				localStorage.setItem("user", "admin");
			}

			window.location.href = "/";
			window.location.reload();
		}catch(e){
			handleError(e);
		}
	}
	function handleError(e){
		emailErr.current.classList.add("show");
		setError(e.response.data.message?e.response.data.message:"Email already exists");
	}
}

function isEmail(email) {
	return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
}