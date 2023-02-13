import { Card, CardBody, Text, IconButton, Image } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

function DisplayCard(props) {
	function deleteBoard() {
		props.deleteBoard(props.board._id);
	}

	return (
		<Card backgroundColor="#FFF8EA">
			<Link to={`/board/${props.board._id}`}>
				<CardBody padding="0">
					<Text variant="boardDisplayTitle">{props.board.title}</Text>
					<Image
						src="svg/layered-waves-haikei.svg"
						overflow="hidden"
						maxWidth="100%"
						height="auto"
						borderRadius={5}
					></Image>
				</CardBody>
			</Link>
			<IconButton
				variant="boardDisplayIconButton"
				icon={<DeleteIcon />}
				onClick={deleteBoard}
			></IconButton>
		</Card>
	);
}

export default DisplayCard;
