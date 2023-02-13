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
		navIconButton: {
			color: "#FFF8EA",
			_hover: { color: "#e3d6c5" },
		},
		boardDisplayIconButton: {
			position: "absolute",
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -50%)",
			bg: "#815B5B",
			color: "#FFF8EA",
			_hover: { backgroundColor: "#FFF8EA", color: "#815B5B" },
		},
	},

	defaultProps: {
		variant: "solid",
		size: "md",
	},
});

export default Button;
