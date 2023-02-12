import SideNavBar from "../SideNavBar/SideNavBar";
import { useState, useEffect } from "react";
import BoardDisplay from "./BoardDisplay";

function ViewBoards() {
	const [userBoards, setUserBoards] = useState([]);
	const [test, setTest] = useState();

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
			setTest(userBoards.length);
		}
		getUserBoards();

		return;
	}, [test, userBoards.length]);

	return (
		<div
			style={{
				display: "flex",
				flexGrow: "1",
			}}
		>
			<SideNavBar />
			<BoardDisplay userBoards={userBoards} />
		</div>
	);
}

export default ViewBoards;
