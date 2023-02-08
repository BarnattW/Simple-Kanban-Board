import { defineStyleConfig } from "@chakra-ui/react";

const Heading = defineStyleConfig({
	baseStyle: {},

	sizes: {
		sm: {},
		md: {},
	},
	variants: {
		boardHeading: {
			color: "#FFF8EA",
			marginLeft: "30px",
			paddingTop: "0.5%",
			position: "relative",
			display: "block",
		},
	},

	defaultProps: {
		size: "lg",
	},
});

export default Heading;