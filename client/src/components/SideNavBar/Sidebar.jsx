import { IconButton, Text } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Link } from "react-router-dom";

function SideBar(props) {
	const [navActive, setNavActive] = useState(false);

	function toggleNav() {
		setNavActive((prevBool) => {
			return !prevBool;
		});
	}

	return (
		<div className={navActive ? "nav-menu active" : "nav-menu"}>
			<div style={{ flexDirection: "vertical" }}>
				<div
					style={{
						borderWidth: "0 0 1px 0",
						borderColor: "var(--main-bg-coffee)",
						width: "100%",
						display: "flex",
					}}
				>
					<IconButton
						variant="navIconButton"
						onClick={toggleNav}
						icon={<HamburgerIcon boxSize={6} />}
						margin={1}
					/>
				</div>
				<ul className={navActive ? "" : "hidden"}>
					<li>
						<Link to="/boards">
							<Text variant="navItem">Boards</Text>
						</Link>
					</li>
					<li>
						<Text variant="navItem">About</Text>
					</li>
					<li>
						<Text variant="navItem">Settings</Text>
					</li>
					<li>
						<Text variant="navItem" onClick={props.logout}>
							Logout
						</Text>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default SideBar;
