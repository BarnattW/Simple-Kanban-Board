import SideNavBar from "../SideNavBar/SideNavBar";
import { useState, useEffect, useContext } from "react";
import BoardDisplay from "./BoardDisplay";
import { UserContext } from "../UserContext";
import { SocketContext } from "../SocketContext";
//import { useNavigate } from "react-router-dom";

function ViewBoards(props) {
	const [userBoards, setUserBoards] = useState([]);
	const [createBoard, setCreateBoard] = useState(false);
	const { user } = useContext(UserContext);
	const socket = useContext(SocketContext);
	const userID = user._id;
	//const navigate = useNavigate();

	useEffect(() => {
		async function getUserBoards() {
			socket.emit("retreiveBoards", userID);
			socket.on("sendBoards", (result) => {
				const user = result;
				setUserBoards(user.userBoards);
			});
		}
		getUserBoards();

		return;
	}, [userID, createBoard, socket]);

	function createNewBoard(boardtitle) {
		const newBoard = {
			title: boardtitle,
			_id: userID,
		};
		socket.emit("createBoard", newBoard);

		setCreateBoard((prevBool) => {
			return !prevBool;
		});
	}

	function deleteBoard(mongoID) {
		socket.emit("deleteBoard", userID, mongoID);

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
