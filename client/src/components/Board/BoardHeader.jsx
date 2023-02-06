import { Heading } from "@chakra-ui/react";

function BoardHeader(props) {
	return (
		<div>
			<Heading variant="boardHeading">{props.boardTitle}</Heading>
		</div>
	);
}

export default BoardHeader;
