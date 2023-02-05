import { defineStyleConfig } from "@chakra-ui/react";

const Button = defineStyleConfig({
	baseStyle: {},

	sizes: {
		sm: {},
		md: {},
	},
	variants: {
		solid: {
			bg: "#FFF8EA",
			color: "#815B5B",
			_hover: { backgroundColor: "#594545", color: "#FFF8EA" },
		},
		iconButton: {
			margin: "auto",
			borderRadius: "50px",
			bg: "#815B5B",
			color: "#e3d6c5",
			_hover: { backgroundColor: "#594545", color: "#FFF8EA" },
		},
		cardIconButton: {
			color: "#815B5B",
			_hover: { color: "#594545" },
		},
		listIconButton: {
			color: "#815B5B",
			_hover: { color: "#594545" },
		},
	},

	defaultProps: {
		variant: "solid",
		size: "md",
	},
});

export default Button;
