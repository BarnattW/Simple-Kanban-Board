import { Button } from "@chakra-ui/react";
import CreateNewUI from "./Cards/CreateNewUI";
import { useState } from "react";

function AddBoardList(props) {
	const [toggleBool, setToggleBool] = useState(true);

	function toggleInputField() {
		setToggleBool((prevBool) => !prevBool);
	}

	return (
		<>
			<CreateNewUI
				toggleValue={toggleBool}
				toggle={toggleInputField}
				addContent={props.onAdd}
			/>
			<Button
				w="200px"
				onClick={toggleInputField}
				display={toggleBool ? "inline-block" : "none"}
			>
				+ Add Another List
			</Button>
		</>
	);
}

export default AddBoardList;
