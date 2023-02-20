import Board from "./Board/Board";
import Header from "./Header";
import Footer from "./Footer";
import ViewBoards from "./ViewBoards/ViewBoards";
import NotFound from "./NotFound";
import Login from "./Login/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useState, useMemo } from "react";

function App() {
	const [user, setUser] = useState(UserContext);
	const value = useMemo(() => ({ user, setUser }), [user, setUser]);
	const navigate = useNavigate();

	async function logout() {
		navigate("/");
		await fetch(`http://localhost:5000/user/logout`, {
			method: "GET",
			credentials: "include",
			withCredentials: true,
		}).then(() => {
			setUser();
		});
	}

	return (
		<UserContext.Provider value={value}>
			<div className="app">
				<Header />
				<Routes>
					<Route exact path="/" element={<Login type="login" />} />
					<Route exact path="/login" element={<Login type="login" />} />
					<Route exact path="/signup" element={<Login type="signup" />} />
					<Route path="/board/:id" element={<Board logout={logout} />} />
					<Route
						exact
						path="/boards"
						element={<ViewBoards logout={logout} />}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>

				<Footer />
			</div>
		</UserContext.Provider>
	);
}

export default App;
