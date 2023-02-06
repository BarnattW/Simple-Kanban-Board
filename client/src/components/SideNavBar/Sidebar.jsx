import { IconButton, Text } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useState } from "react";

function SideBar() {
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
					<Text
						flexGrow="1"
						variant="navMenu"
						className={navActive ? "" : "hidden"}
					>
						Menu
					</Text>
				</div>
				<ul className={navActive ? "" : "hidden"}>
					<li>
						<Text variant="navItem">Boards</Text>
					</li>
					<li>
						<Text variant="navItem">Your Boards</Text>
					</li>
					<li>
						<Text variant="navItem">Settings</Text>
					</li>
					<li>
						<Text variant="navItem">Logout</Text>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default SideBar;
