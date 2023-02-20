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
	FormErrorMessage,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

function Login(props) {
	const isLogin = props.type === "login" ? true : false;
	const navigate = useNavigate();
	const [show, setShow] = useState(false);
	const handleClick = () => setShow(!show);

	//auth params
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isError, setIsError] = useState(false);
	const [isErrorMatch, setIsErrorMatch] = useState(false);

	const { user, setUser } = useContext(UserContext);

	function updateUsername(event) {
		setUsername(event.target.value);
	}

	function updatePassword(event) {
		setPassword(event.target.value);
		setIsError(false);
	}

	function updateConfirmPassword(event) {
		setConfirmPassword(event.target.value);
		setIsErrorMatch(false);
	}

	useEffect(() => {
		if (!user) {
			navigate("/boards");
		}
	});

	async function login(event) {
		event.preventDefault();
		const userLogin = {
			username: username,
			password: password,
		};
		await fetch(`http://localhost:5000/user/login`, {
			method: "POST",
			body: JSON.stringify(userLogin),
			credentials: "include",
			withCredentials: true,
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});

		const data = await fetch(`http://localhost:5000/user/get`, {
			method: "GET",
			credentials: "include",
			withCredentials: true,
			headers: {
				"Content-Type": "application/json",
			},
		});
		const userData = await data.json();
		setUser(userData);
		navigate("/boards");
	}

	async function signup(event) {
		event.preventDefault();
		if (password.length <= 8) {
			setIsError(true);
		} else if (confirmPassword !== password) {
			setIsErrorMatch(true);
		} else {
			const userSignup = {
				username: username,
				password: password,
			};
			await fetch(`http://localhost:5000/user/register`, {
				method: "POST",
				credentials: "include",
				body: JSON.stringify(userSignup),
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					"Access-Control-Allow-Origin": "http://localhost:3000/",
				},
			}).then((res) => navigate("/boards"));
		}
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
				minW="300px"
			>
				<CardHeader>
					<Heading>
						{isLogin ? "Login to Simple Kanban" : "Create An Account"}
					</Heading>
				</CardHeader>
				<CardBody>
					<form onSubmit={isLogin ? login : signup}>
						<FormControl isRequired marginBottom="24px">
							<FormLabel requiredIndicator>Email</FormLabel>
							<Input type="email" value={username} onChange={updateUsername} />
						</FormControl>
						<FormControl isRequired isInvalid={isError} marginBottom="24px">
							<FormLabel requiredIndicator>
								{isLogin ? "Password" : "Password (min. 8 characters)"}
							</FormLabel>
							<InputGroup maxW="450px">
								<Input
									type={show ? "text" : "password"}
									value={password}
									onChange={updatePassword}
								/>
								<InputRightElement>
									<IconButton
										icon={<ViewIcon />}
										variant="cardIconButton"
										onClick={handleClick}
									></IconButton>
								</InputRightElement>
							</InputGroup>
							{!isError && isLogin ? (
								<></>
							) : (
								<FormErrorMessage marginTop={0}>
									Password must be at least 8 characters long.
								</FormErrorMessage>
							)}
						</FormControl>
						{isLogin ? (
							<> </>
						) : (
							<FormControl
								isRequired
								isInvalid={isErrorMatch}
								marginBottom="24px"
							>
								<FormLabel requiredIndicator>Confirm Password</FormLabel>
								<Input
									type="password"
									value={confirmPassword}
									onChange={updateConfirmPassword}
								/>
								{!isErrorMatch && isLogin ? (
									<></>
								) : (
									<FormErrorMessage marginTop={0}>
										Password do not match. Please try again.
									</FormErrorMessage>
								)}
							</FormControl>
						)}
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
