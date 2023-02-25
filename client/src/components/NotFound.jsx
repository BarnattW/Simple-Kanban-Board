import { Heading, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function NotFound() {
	return (
		<div style={{ margin: "auto", height: "50%", textAlign: "center" }}>
			<Heading variant="errorHeading">404- Page Not Found</Heading>
			<Heading variant="errorHeading">This page does not exist.</Heading>
			<Link to={"/"}>
				<Button>Return to Homepage</Button>
			</Link>
		</div>
	);
}

export default NotFound;
