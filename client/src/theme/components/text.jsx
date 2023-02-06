import { defineStyleConfig } from "@chakra-ui/react";

const Text = defineStyleConfig({
	baseStyle: {},

	sizes: {
		sm: {},
		md: {},
		xl: {},
	},
	variants: {
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
			padding: "5% 1% 5% 1%",
			fontSize: "xl",
		},
	},

	defaultProps: {},
});

export default Text;
