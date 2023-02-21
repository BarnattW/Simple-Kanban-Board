import Board from "./Board/Board";
import Header from "./Header";
import Footer from "./Footer";
import ViewBoards from "./ViewBoards/ViewBoards";
import NotFound from "./NotFound";
import Login from "./Login/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useState, useMemo, useEffect, useContext } from "react";
import { SocketContext } from "./SocketContext";

function App() {
	const [user, setUser] = useState(UserContext);
	const value = useMemo(() => ({ user, setUser }), [user, setUser]);
	const navigate = useNavigate();
	const socket = useContext(SocketContext);
	const [isConnected, setIsConnected] = useState(socket.connected);
	console.log(user);

	useEffect(() => {
		async function getUserBoards() {
			const data = await fetch(`http://localhost:5000/user/get`, {
				method: "GET",
				credentials: "include",
				withCredentials: true,
				headers: {
					"Content-Type": "application/json",
				},
			});
			const userData = await data.json();
			setUser(userData);
		}
		getUserBoards();

		socket.on("connect", () => {
			setIsConnected(true);
		});

		socket.on("disconnect", () => {
			setIsConnected(false);
		});

		return () => {
			socket.off("connect");
			socket.off("disconnect");
			socket.off("pong");
		};
	}, [isConnected, socket]);

	async function logout() {
		navigate("/login");
		await fetch(`http://localhost:5000/user/logout`, {
			method: "GET",
			credentials: "include",
			withCredentials: true,
		});
		setUser({});
	}

	return (
		<SocketContext.Provider value={socket}>
			<UserContext.Provider value={value}>
				<div className="app">
					<Header />
					<Routes>
						<Route
							exact
							path="/"
							element={
								user ? <ViewBoards logout={logout} /> : <Login type="login" />
							}
						/>
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
		</SocketContext.Provider>
	);
}

export default App;
