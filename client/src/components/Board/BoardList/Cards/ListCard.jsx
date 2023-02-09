import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Heading,
	IconButton,
	Text,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import CardContent from "./CardContent";
import { useState } from "react";
import CreateNewUI from "./CreateNewUI";

function ListCard(props) {
	const [toggleBool, setToggleBool] = useState(true);
	const [editing, setEditing] = useState(false);

	//toggles between rendering input UI and add card button
	function toggleInputField() {
		setToggleBool((prevBool) => !prevBool);
	}

	//adds new cards to array and updates list array in Board
	function addCardContent(newContent) {
		const updatedContents = [...props.cards, newContent];
		props.updateCards(updatedContents, props.index);
		return updatedContents;
	}

	//updates list title and content in Board
	function toggleEditing() {
		setEditing((prevBool) => {
			return !prevBool;
		});
	}
	function updateHeading(updatedListHeading) {
		props.updateLists(updatedListHeading, props.index);
		setEditing((prevBool) => {
			return !prevBool;
		});
	}

	function editCards(updatedCard, index) {
		const updatedCards = [...props.cards];
		updatedCards[index] = updatedCard;
		props.updateCards(updatedCards, props.index);
	}

	//delete Card
	function deleteCardContent(index) {
		const updatedContents = [...props.cards];
		updatedContents.splice(index, 1);
		props.updateCards(updatedContents, props.index);
	}

	//delete List
	function deleteListContent() {
		//toggle popup confirmation

		props.deleteLists(props.index);
	}

	//renders card contents
	return (
		<Card
			maxw="sm"
			width="300px"
			backgroundColor="#e3d6c5"
			maxHeight="90vh"
			display="flex"
			flexDirection="column"
		>
			<CardHeader padding={3} paddingBottom={0}>
				{editing ? (
					<CreateNewUI
						updateContent={updateHeading}
						editing={editing}
						toggle={toggleEditing}
						type="list"
					/>
				) : (
					<>
						<div className="flex">
							<Heading
								size="sm"
								flexGrow={1}
								lineHeight={1.5}
								overflow="auto"
								marginTop={2}
							>
								{props.listTitle}
							</Heading>
							<IconButton
								variant="listIconButton"
								aria-label=""
								icon={<DeleteIcon />}
								onClick={deleteListContent}
							></IconButton>
							<IconButton
								variant="listIconButton"
								aria-label=""
								icon={<EditIcon />}
								onClick={toggleEditing}
							></IconButton>
						</div>
						<Text>{props.listContent}</Text>
					</>
				)}
			</CardHeader>

			<CardBody
				padding="10px"
				paddingBottom={0}
				overflowY="auto"
				maxHeight="60vh"
			>
				{props.cards.map((cardContent, index) => {
					return (
						<CardContent
							id={cardContent.id}
							key={index}
							index={index}
							title={cardContent.title}
							content={cardContent.content}
							deleteCardContent={deleteCardContent}
							editCards={editCards}
						/>
					);
				})}
			</CardBody>

			<CardFooter padding={3} paddingTop={5}>
				<IconButton
					variant="iconButton"
					aria-label=""
					icon={<AddIcon />}
					onClick={toggleInputField}
					display={toggleBool ? "block" : "none"}
				></IconButton>

				<CreateNewUI
					toggleValue={toggleBool}
					toggle={toggleInputField}
					addContent={addCardContent}
				/>
			</CardFooter>
		</Card>
	);
}

export default ListCard;
