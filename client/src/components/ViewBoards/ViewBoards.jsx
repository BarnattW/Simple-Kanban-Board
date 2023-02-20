import SideNavBar from "../SideNavBar/SideNavBar";
import { useState, useEffect, useContext } from "react";
import BoardDisplay from "./BoardDisplay";
import { UserContext } from "../UserContext";
//import { useNavigate } from "react-router-dom";

function ViewBoards(props) {
	const [userBoards, setUserBoards] = useState([]);
	const [createBoard, setCreateBoard] = useState(false);
	const { user, setUser } = useContext(UserContext);
	//const navigate = useNavigate();

	useEffect(() => {
		const userID = user._id;
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

			const response = await fetch(`http://localhost:5000/boards/${userID}`, {
				method: "GET",
			});

			if (!response.ok) {
				const message = `An error occurred: ${response.statusText}`;
				window.alert(message);
				return;
			}

			const user = await response.json();
			setUserBoards(user.userBoards);
		}
		getUserBoards();

		return;
	}, [setUser, user._id, createBoard]);

	async function createNewBoard(boardtitle) {
		const userID = user._id;
		const newBoard = {
			title: boardtitle,
			_id: userID,
		};
		console.log(newBoard);
		await fetch(`http://localhost:5000/create/${userID}`, {
			method: "POST",
			body: JSON.stringify(newBoard),
			headers: {
				"Content-Type": "application/json",
			},
		});

		setCreateBoard((prevBool) => {
			return !prevBool;
		});
	}

	async function deleteBoard(mongoID) {
		await fetch(`http://localhost:5000/delete/${mongoID}`, {
			method: "POST",
		});

		setCreateBoard((prevBool) => {
			return !prevBool;
		});
	}

	return (
		<div
			style={{
				display: "flex",
				alignItems: "flex-start",
				overflowY: "auto",
				flexGrow: "1",
			}}
		>
			<SideNavBar logout={props.logout} />
			<BoardDisplay
				userBoards={userBoards}
				createNewBoard={createNewBoard}
				deleteBoard={deleteBoard}
			/>
		</div>
	);
}

export default ViewBoards;
