import { Text, Heading, Card, CardBody, Image } from "@chakra-ui/react";
import DisplayCard from "./DisplayCard/DisplayCard";
import PopoverForm from "./DisplayCard/PopoverForm/PopoverForm";

function BoardDisplay(props) {
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
								<DisplayCard board={board} deleteBoard={props.deleteBoard} />
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
							<PopoverForm createNewBoard={props.createNewBoard} />
						</CardBody>
					</Card>
				</div>
			</div>
		</div>
	);
}

export default BoardDisplay;
