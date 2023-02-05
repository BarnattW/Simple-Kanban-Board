import { Box, Text } from "@chakra-ui/react";

function Header() {
	return (
		<Box className="header">
			<Text fontSize="2xl" color="var(--list-bg-coffee)">
				Simple Kanban
			</Text>
		</Box>
	);
}

export default Header;
