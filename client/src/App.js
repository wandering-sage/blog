import NavBar from "./components/navbar/NavBar";
import Home from "./pages/home/Home";
import Signup from "./pages/signup/Signup";
import WriteBlog from "./pages/writeBlog/WriteBlog";
import Login from "./pages/login/Login";
import Blog from "./pages/readBlog/Blog";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./app.css"
import { user } from "./user";

function App() {
	return (
		<Router>
			<NavBar />
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="/register">{user ? <Home /> : <Signup />}</Route>
				<Route path="/login">{user ? <Home /> : <Login />}</Route>
				<Route path="/write">{user ? <WriteBlog /> : <Home />}</Route>
				<Route path="/post/:postId">
					<Blog />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
