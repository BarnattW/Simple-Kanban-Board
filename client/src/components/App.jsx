import Board from "./Board/Board";
import Footer from "./Footer";
import Header from "./Header";
import Login from "./Login/Login";
import NotFound from "./NotFound";
import ViewBoards from "./ViewBoards/ViewBoards";
import { SocketContext } from "./SocketContext";
import { UserContext } from "./UserContext";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useContext, useEffect, useMemo, useState } from "react";

function App() {
	const navigate = useNavigate();

	const [user, setUser] = useState(UserContext);
	const value = useMemo(() => ({ user, setUser }), [user, setUser]);

	const socket = useContext(SocketContext);
	const [isConnected, setIsConnected] = useState(socket.connected);

	//fetch user data is session exists and initialize socket connection
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

			if (userData) {
				setUser(userData);
			}
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
		};
	}, [isConnected, socket]);

	//logout user and resets user context
	async function logout() {
		await fetch(`http://localhost:5000/user/logout`, {
			method: "GET",
			credentials: "include",
			withCredentials: true,
		}).then(() => {
			setUser({});
			navigate("/login");
		});
	}

	return (
		<SocketContext.Provider value={socket}>
			<UserContext.Provider value={value}>
				<div className="app flex-column">
					<Header />

					<Routes>
						<Route
							path="/"
							element={
								user._id ? (
									<ViewBoards logout={logout} />
								) : (
									<Login type="login" />
								)
							}
						/>
						<Route path="/login" element={<Login type="login" />} />
						<Route path="/signup" element={<Login type="signup" />} />
						<Route path="/board/:id" element={<Board logout={logout} />} />
						<Route path="/boards" element={<ViewBoards logout={logout} />} />
						<Route path="*" element={<NotFound />} />
					</Routes>

					<Footer />
				</div>
			</UserContext.Provider>
		</SocketContext.Provider>
	);
}

export default App;
