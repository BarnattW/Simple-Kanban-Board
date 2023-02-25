import { Text, Button, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext } from "react";

function Header() {
	const { user } = useContext(UserContext);

	return (
		<div className="header">
			<div style={{ display: "flex", minWidth: "250px" }}>
				<Image src="/svg/logo.svg" boxSize={9}></Image>
				<Link to={user._id ? "/boards" : "/login"}>
					<Text fontSize="2xl" color="var(--list-bg-coffee)">
						Simple Kanban
					</Text>
				</Link>
			</div>
			<div>
				{user._id ? (
					<></>
				) : (
					<>
						<Link to="/login">
							<Button variant="headerAccountButton">Login</Button>
						</Link>
						<span style={{ padding: "10px" }}></span>
					</>
				)}
			</div>
		</div>
	);
}

export default Header;
