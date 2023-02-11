import SideNavBar from "../SideNavBar/SideNavBar";
import { useState, useEffect } from "react";

function ViewBoards() {
	const [userBoards, setUserBoards] = useState([]);
	const [test, setTest] = useState();

	useEffect(() => {
		async function getUserBoards() {
			const response = await fetch(`http://localhost:5000/board`);

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
		<div style={{ display: "flex", flexDirection: "row", flexGrow: "1" }}>
			<SideNavBar />
			<div>
				{userBoards.map((board, index) => {
					return <div key={index}>{board.title}</div>;
				})}
			</div>
		</div>
	);
}

export default ViewBoards;
