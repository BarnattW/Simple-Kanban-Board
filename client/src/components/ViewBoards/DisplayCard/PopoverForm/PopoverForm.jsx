import {
	Popover,
	PopoverTrigger,
	IconButton,
	PopoverContent,
	PopoverArrow,
	PopoverCloseButton,
	PopoverBody,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

function PopoverForm(props) {
	return (
		<Popover placement="right">
			<PopoverTrigger>
				<IconButton
					variant="boardDisplayIconButton"
					icon={<AddIcon />}
				></IconButton>
			</PopoverTrigger>
			<PopoverContent>
				<PopoverArrow />
				<PopoverCloseButton />
				<PopoverBody>
					Are you sure you want to have that milkshake?
					<IconButton
						variant="boardDisplayIconButton"
						icon={<AddIcon />}
						onClick={props.createNewBoard}
					></IconButton>
				</PopoverBody>
			</PopoverContent>
		</Popover>
	);
}

export default PopoverForm;
