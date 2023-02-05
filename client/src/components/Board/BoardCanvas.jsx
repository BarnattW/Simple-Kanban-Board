import BoardList from "./BoardList/BoardList";
import AddBoardList from "./BoardList/AddBoardList";

//renders lists
function BoardCanvas(props) {
	
	return (
		<div className="canvas flex">
			{props.listContent.map((listItem, index) => {
				return (
					<BoardList
						key={index}
						index={index}
						id={listItem.id}
						cards={listItem.cards}
						listTitle={listItem.title}
						listContent={listItem.content}
						updateCards={props.updateCards}
						updateLists={props.updateLists}
						deleteLists={props.deleteLists}
					/>
				);
			})}
			<div className="addList">
				<AddBoardList onAdd={props.addListContent} />
			</div>
		</div>
	);
}

export default BoardCanvas;
