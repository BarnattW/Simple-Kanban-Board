import {
	useDisclosure,
	Button,
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogFooter,
	IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRef } from "react";

function AlertDialogues(props) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = useRef();
	return (
		<>
			<IconButton
				variant="boardDisplayIconButton"
				icon={<DeleteIcon />}
				onClick={onOpen}
			></IconButton>

			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
				isCentered
			>
				<AlertDialogOverlay>
					<AlertDialogContent bg="#FFF8EA">
						<AlertDialogHeader fontSize="lg" fontWeight="bold" color="#815B5B">
							{`Delete ${props.deleteType}`}
						</AlertDialogHeader>

						<AlertDialogBody color="#815B5B">
							Are you sure? This action cannot be undone (yet).
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button
								variant="createBoardButton"
								ref={cancelRef}
								onClick={onClose}
							>
								Cancel
							</Button>
							<Button variant="deleteButton" onClick={props.delete} ml={3}>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
}

export default AlertDialogues;
