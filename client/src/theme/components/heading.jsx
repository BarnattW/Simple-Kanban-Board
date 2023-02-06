import { defineStyleConfig } from "@chakra-ui/react";

const Button = defineStyleConfig({
	baseStyle: {},

	sizes: {
		sm: {},
		md: {},
	},
	variants: {
		boardHeading: {
			color: "#FFF8EA",
			marginLeft: "30px",
		},
	},

	defaultProps: {
		size: "lg",
	},
});

export default Button;
