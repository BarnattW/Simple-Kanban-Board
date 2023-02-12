import {
	Text,
	Heading,
	Card,
	CardBody,
	Image,
	IconButton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";

function BoardDisplay(props) {
	function createNewBoard() {}

	return (
		<div className="userBoardsContainer">
			<div className="userBoardsDisplay">
				<Heading variant="displayHeading" size="md">
					Your Boards
				</Heading>
				<div className="grid">
					{props.userBoards.map((board, index) => {
						return (
							<div
								style={{
									display: "inline-block",
								}}
								key={index}
							>
								<Link to={`/board/${board._id}`} key={index}>
									<Card backgroundColor="#FFF8EA">
										<CardBody padding="0">
											<Text variant="boardDisplayTitle">{board.title}</Text>
											<Image
												src="svg/layered-waves-haikei.svg"
												overflow="hidden"
												maxWidth="100%"
												height="auto"
												borderRadius={5}
											></Image>
										</CardBody>
									</Card>
								</Link>
							</div>
						);
					})}
					<Card display="inline-block" backgroundColor="#FFF8EA">
						<CardBody padding="0">
							<Text variant="boardDisplayTitle">Create New</Text>
							<Image
								src="svg/layered-waves-haikei.svg"
								overflow="hidden"
								maxWidth="100%"
								height="auto"
								borderRadius={5}
							></Image>
							<IconButton
								position="absolute"
								top="50%"
								left="50%"
								transform="translate(-50%, -50%)"
								icon={<AddIcon />}
								onClick={createNewBoard}
							></IconButton>
						</CardBody>
					</Card>
				</div>
			</div>
		</div>
	);
}

export default BoardDisplay;
