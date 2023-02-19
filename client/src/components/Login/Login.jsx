import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	FormControl,
	FormLabel,
	Input,
	Button,
	Heading,
	Image,
	IconButton,
	InputGroup,
	InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login(props) {
	const isLogin = props.type === "login" ? true : false;
	const navigate = useNavigate();
	const [show, setShow] = useState(false);
	const handleClick = () => setShow(!show);

	function login(event) {
		event.preventDefault();
		navigate("/boards");
	}
	function signup(event) {
		event.preventDefault();
		navigate("/boards");
	}

	return (
		<div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
			<Image
				src="svg/low-poly-grid-haikei.svg"
				flex="1 1 50%"
				objectFit="cover"
				height="100%"
				overflow="hidden"
			></Image>
			<Card
				backgroundColor="#FFF8EA"
				color="#815B5B"
				borderRadius={0}
				flex="1 1 50%"
				height="100%"
				paddingLeft="20px"
				paddingRight="20px"
				minW="400px"
			>
				<CardHeader>
					<Heading>
						{isLogin ? "Login to Simple Kanban" : "Create An Account"}
					</Heading>
				</CardHeader>
				<CardBody>
					<form onSubmit={isLogin ? login : signup}>
						<FormControl isRequired>
							<FormLabel requiredIndicator>Email</FormLabel>
							<Input type="email" />
						</FormControl>
						<FormControl isRequired>
							<FormLabel requiredIndicator>
								{isLogin ? "Password" : "Password (min. 8 characters)"}
							</FormLabel>
							<InputGroup maxW="450px">
								<Input type={show ? "text" : "password"} />
								<InputRightElement>
									<IconButton
										icon={<ViewIcon />}
										variant="cardIconButton"
										onClick={handleClick}
									></IconButton>
								</InputRightElement>
							</InputGroup>
						</FormControl>
						<Button variant="userAuthButton" type="submit">
							{isLogin ? "Login" : "Create"}
						</Button>
					</form>
				</CardBody>
				<CardFooter>
					<p>
						{isLogin ? "Don't have an account? " : "Already have an account? "}
						<Link
							to={isLogin ? "/signup" : "/login"}
							style={{ color: "black", textDecoration: "underline" }}
						>
							{isLogin ? "Create an account" : "Sign back in"}
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}

export default Login;
