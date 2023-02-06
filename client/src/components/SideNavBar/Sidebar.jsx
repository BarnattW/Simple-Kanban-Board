import { IconButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useState } from "react";

function SideBar() {
	const [navActive, setNavActive] = useState(true);

	function toggleNav() {
		setNavActive((prevBool) => {
			return !prevBool;
		});
	}

	return (
		<div className={navActive ? "nav-menu active" : "nav-menu"}>
			<IconButton
				variant="navIconButton"
				onClick={toggleNav}
				icon={<HamburgerIcon boxSize={6} />}
				margin={1}
			/>
		</div>
	);
}

export default SideBar;
