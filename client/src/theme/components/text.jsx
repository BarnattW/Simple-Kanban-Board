import { defineStyleConfig } from "@chakra-ui/react";

const Text = defineStyleConfig({
	baseStyle: {},

	sizes: {
		sm: {},
		md: {},
		xl: {},
	},
	variants: {
		//Navbar
		navItem: {
			color: "#FFF8EA",
			_hover: { color: "#815B5B", bg: "#FFF8EA" },
			marginTop: "5%",
			marginBottom: "5%",
			padding: "5% 1% 5% 10%",
			fontSize: "lg",
		},
		navMenu: {
			color: "#FFF8EA",
			marginBottom: "4%",
			padding: "5% 1% 25% 0",
			fontSize: "xl",
		},
		//ViewBoards
		boardDisplayTitle: {
			position: "absolute",
			top: "30%",
			left: "50%",
			transform: "translate(-50%, -50%)",
			textOverflow: "ellipsis",
			color: "#815B5B",
			fontWeight: "bold",
			fontSize: "20px",
		},
	},

	defaultProps: {},
});

export default Text;
