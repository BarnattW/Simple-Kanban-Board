import { UserContext } from "./UserContext";
import { Text, Button, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useContext } from "react";

function Header() {
	const { user } = useContext(UserContext);

	return (
		<div className="border-coffee flex-row sticky header padding-ten">
			<div className="flex">
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
						<span className="padding-ten"></span>
					</>
				)}
			</div>
		</div>
	);
}

export default Header;
