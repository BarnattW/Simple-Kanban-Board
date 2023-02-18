import {
	Popover,
	PopoverTrigger,
	IconButton,
	Button,
	PopoverContent,
	PopoverHeader,
	PopoverArrow,
	PopoverCloseButton,
	PopoverBody,
	FormControl,
	FormLabel,
	Input,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";

function PopoverForm(props) {
	const [boardTitle, setBoardTitle] = useState("");

	function createNewBoard(event) {
		event.preventDefault();
		props.createNewBoard(boardTitle);
		setBoardTitle("");
	}

	function updateInput(event) {
		setBoardTitle(event.target.value);
	}

	return (
		<Popover placement="right">
			<PopoverTrigger>
				<IconButton
					variant="boardDisplayIconButton"
					icon={<AddIcon />}
				></IconButton>
			</PopoverTrigger>
			<PopoverContent bg="#FFF8EA" border="0">
				<PopoverArrow />
				<PopoverHeader fontWeight="bold" textAlign="center" color="#815B5B">
					Create New Board
				</PopoverHeader>
				<PopoverCloseButton />
				<PopoverBody>
					<form onSubmit={createNewBoard}>
						<FormControl>
							<FormLabel color="#815B5B">Board Title</FormLabel>
							<Input value={boardTitle} onChange={updateInput} />
						</FormControl>
						<Button variant="createBoardButton" type="submit">
							Create
						</Button>
					</form>
				</PopoverBody>
			</PopoverContent>
		</Popover>
	);
}

export default PopoverForm;
