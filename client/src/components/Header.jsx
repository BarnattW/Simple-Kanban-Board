import { Text, Button, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Header() {
	return (
		<div className="header">
			<div className="flex">
				<Image src="svg/logo.svg" boxSize={10}></Image>
				<Link to="/">
					<Text fontSize="2xl" color="var(--list-bg-coffee)">
						Simple Kanban
					</Text>
				</Link>
			</div>
			<div>
				<Link to="/login">
					<Button variant="headerAccountButton">Login</Button>
				</Link>
				<span style={{ padding: "10px" }}></span>
				<Link to="/signup">
					<Button variant="headerAccountButton">Sign Up</Button>
				</Link>
			</div>
		</div>
	);
}

export default Header;
