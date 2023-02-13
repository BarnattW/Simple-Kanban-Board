import SideNavBar from "../SideNavBar/SideNavBar";
import { useState, useEffect } from "react";
import BoardDisplay from "./BoardDisplay";

function ViewBoards() {
	const [userBoards, setUserBoards] = useState([]);
	const [createBoard, setCreateBoard] = useState(false);

	useEffect(() => {
		async function getUserBoards() {
			const response = await fetch(`http://localhost:5000/boards`);

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
	}, [createBoard, userBoards.length]);

	async function createNewBoard() {
		const newBoard = {
			title: "Testing",
		};
		await fetch(`http://localhost:5000/create`, {
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
			<SideNavBar />
			<BoardDisplay
				userBoards={userBoards}
				createNewBoard={createNewBoard}
				deleteBoard={deleteBoard}
			/>
		</div>
	);
}

export default ViewBoards;
