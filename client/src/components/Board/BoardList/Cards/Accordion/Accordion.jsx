import { IconButton } from "@chakra-ui/react";
import { TriangleDownIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useState } from "react";
import CreateNewUI from "../CreateNewUI";

function Accordion(props) {
	const [isActive, setIsActive] = useState(true);
	const [editing, setEditing] = useState(false);

	function showContent() {
		setIsActive((prevActive) => {
			return !prevActive;
		});
	}

	function deleteContent() {
		props.deleteCardContent(props.index);
	}

	//updates list title and content in Board
	function toggleEditing() {
		setEditing((prevBool) => {
			return !prevBool;
		});
	}
	function editCards(updatedCard) {
		props.editCards(updatedCard, props.index);
		setEditing((prevBool) => {
			return !prevBool;
		});
	}

	return (
		<div>
			{editing ? (
				<CreateNewUI
					updateContent={editCards}
					editing={editing}
					toggle={toggleEditing}
					type="card"
					currentTitle={props.cardTitle}
					currentContent={props.cardContent}
				/>
			) : (
				<div className="cardContent">
					<div className="flex">
						<label
							style={{
								marginLeft: "5px",
								flexGrow: 1,
								marginTop: "5px",
								overflow: "auto",
							}}
						>
							{props.cardTitle}
						</label>
						<IconButton
							variant="cardIconButton"
							aria-label=""
							icon={<EditIcon />}
							onClick={toggleEditing}
						></IconButton>
						<IconButton
							variant="cardIconButton"
							aria-label=""
							icon={<DeleteIcon />}
							onClick={deleteContent}
						></IconButton>
						<IconButton
							variant="cardIconButton"
							aria-label=""
							icon={<TriangleDownIcon />}
							onClick={showContent}
						></IconButton>
					</div>
					<div className={isActive ? "hidden" : ""}>
						<p style={{ marginLeft: "5px" }}>{props.cardContent}</p>
					</div>
				</div>
			)}
		</div>
	);
}

export default Accordion;
