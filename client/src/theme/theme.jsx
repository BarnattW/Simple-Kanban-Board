import { extendTheme } from "@chakra-ui/react";
import styles from "./styles";
import Button from "./components/button";

const theme = extendTheme({
	styles,
	components: {
		Button,
	},
});

export default theme;
