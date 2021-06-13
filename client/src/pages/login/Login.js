import axios from "axios";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../backend";
import "./login.css";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const emailErr = useRef();
	const passwordErr = useRef();

	return (
		<div className="login">
			<span className="loginTitle">Login</span>
			<form className="loginForm" onSubmit={handleSubmit}>
				<div className="form-field">
					<input className="loginInput" type="text" placeholder="Email" required onChange={emailChanged}/>
					<div ref={emailErr} className="error-icon">
						<i className="fas fa-exclamation-circle"></i>
					</div>
				</div>
				<div className="form-field">
					<input className="loginInput" type="password" placeholder="Password" required minLength="5" onChange={passwordChange}/>
					<div ref={passwordErr} className="error-icon">
						<i className="fas fa-exclamation-circle"></i>
					</div>
				</div>
				<button className="loginButton" type="submit">Login</button>
			</form>
			<p>Don't have an account yet? <Link className="link" to="/register"><span className="register-link">Register</span></Link></p>
			<p className="err">{error}</p>
		</div>
	);

	function passwordChange(e){
		setPassword(e.target.value);
		passwordErr.current.classList.remove("show");
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
		setError("");
		emailErr.current.classList.remove("show");
		passwordErr.current.classList.remove("show");
		
		try{
			const res = await axios.post(api+"/signin",{
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
		if(e.response.data.message === "Wrong Password"){
			passwordErr.current.classList.add("show")
		}
		else{
			emailErr.current.classList.add("show")
		}
		setError(e.response.data.message);
	}
}


function isEmail(email) {
	return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
}
