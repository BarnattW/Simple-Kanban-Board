import { defineStyleConfig } from "@chakra-ui/react";

const Heading = defineStyleConfig({
	baseStyle: {},

	sizes: {
		sm: {},
		md: {},
	},
	variants: {
		//Header
		boardHeading: {
			color: "#FFF8EA",
			marginLeft: "30px",
			paddingTop: "0.5%",
			position: "relative",
			display: "block",
		},
		//viewBoards
		displayHeading: {
			color: "#594545",
			paddingBottom: "20px",
		},
	},

	defaultProps: {
		size: "lg",
	},
});

export default Heading;
