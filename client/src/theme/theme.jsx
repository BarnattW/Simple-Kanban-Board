import { extendTheme } from "@chakra-ui/react";
import styles from "./styles";
import Button from "./components/button";
import Heading from "./components/heading";

const theme = extendTheme({
	styles,
	components: {
		Button,
		Heading,
	},
});

export default theme;
