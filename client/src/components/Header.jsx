import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Header() {
	return (
		<Box className="header">
			<Link to="/">
				<Text fontSize="2xl" color="var(--list-bg-coffee)">
					Simple Kanban
				</Text>
			</Link>
		</Box>
	);
}

export default Header;
