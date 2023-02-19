import { extendTheme } from "@chakra-ui/react";
import styles from "./styles";
import Button from "./components/button";
import Heading from "./components/heading";
import Text from "./components/text";
import Input from "./components/input";

const theme = extendTheme({
	styles,
	components: {
		Button,
		Heading,
		Text,
		Input,
	},
});

export default theme;
