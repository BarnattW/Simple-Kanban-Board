import { Card, CardBody, Text, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AlertDialogues from "../../AlertDialogues/AlertDialogues";

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
			<AlertDialogues
				delete={deleteBoard}
				deleteType="Board"
				type="boardDisplayIconButton"
			/>
		</Card>
	);
}

export default DisplayCard;
