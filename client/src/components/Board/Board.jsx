import BoardHeader from "./BoardHeader";
import BoardCanvas from "./BoardCanvas";
import { DragDropContext } from "react-beautiful-dnd";
import { useState, useEffect } from "react";

function Board() {
	//stores an array that renders the lists and cards
	const [listContent, setListContent] = useState([]);
	console.log(JSON.stringify(listContent));

	//adds new list to array and receives content from CreateNewUI
	function addListContent(newContent) {
		setListContent((prevListContent) => {
			const listFormat = {
				...newContent,
				cards: [],
			};
			return [...prevListContent, listFormat];
		});
	}

	//updates lists array with card content from ListCard
	function updateCards(updatedContent, index) {
		const newList = [...listContent];
		newList[index].cards = updatedContent;
		setListContent(newList);
	}

	//update lists title and content from ListCard
	function updateLists(updatedListHeading, index) {
		const { title, content } = updatedListHeading;
		const newList = [...listContent];
		newList[index] = { ...newList[index], title, content };
		setListContent(newList);
	}

	//delete list
	function deleteLists(index) {
		const newList = [...listContent];
		newList.splice(index, 1);
		setListContent(newList);
	}

	useEffect(() => {
		async function getBoard() {
			const response = await fetch(`/board`);

			if (!response.ok) {
				const message = `An error occurred: ${response.statusText}`;
				window.alert(message);
				return;
			}

			const board = await response.json();
			console.log(board.board);
			const parse = board.board;
			setListContent(parse);
		}

		getBoard();

		return;
	}, [listContent.length]);

	//drag and drop behavior when dragging cards
	function dragEnd(result) {
		const { destination, source } = result;

		//guard clauses
		if (!destination) {
			return;
		}
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		//initialize variables
		let sourceCards;
		let sourceIndex;
		let destinationCards;
		let destinationIndex;
		listContent.forEach((list, i) => {
			if (String(list.id) === destination.droppableId) {
				[destinationCards, destinationIndex] = [list, i];
			}
			if (String(list.id) === source.droppableId) {
				[sourceCards, sourceIndex] = [list, i];
			}
		});

		//update source and destination
		const [reorderedCards] = sourceCards.cards.splice(source.index, 1);
		updateCards(sourceCards.cards, sourceIndex);
		destinationCards.cards.splice(destination.index, 0, reorderedCards);
		updateCards(destinationCards.cards, destinationIndex);
	}

	return (
		<div>
			<BoardHeader />
			<DragDropContext onDragEnd={dragEnd}>
				<BoardCanvas
					listContent={listContent}
					addListContent={addListContent}
					updateCards={updateCards}
					updateLists={updateLists}
					deleteLists={deleteLists}
				/>
			</DragDropContext>
		</div>
	);
}

export default Board;
