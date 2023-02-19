import { Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Header() {
	return (
		<div className="header">
			<Link to="/">
				<Text fontSize="2xl" color="var(--list-bg-coffee)">
					Simple Kanban
				</Text>
			</Link>
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
