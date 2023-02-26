import { UserContext } from "../UserContext";
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
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

function Login(props) {
	const navigate = useNavigate();

	//used to toggle elements in login and register
	const isLogin = props.type === "login" ? true : false;

	//toggles between hidden and text password
	const [show, setShow] = useState(false);
	const handleClick = () => setShow(!show);

	//auth params
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	//toggles form errors
	const [isError, setIsError] = useState(false);
	const [isErrorMatch, setIsErrorMatch] = useState(false);
	const [authSuccess, setAuthSuccess] = useState();
	const [registerSuccess, setRegisterSuccess] = useState();

	const { setUser } = useContext(UserContext);

	//updates user inputted username and passwords
	function updateUsername(event) {
		setUsername(event.target.value);
		setRegisterSuccess();
	}

	function updatePassword(event) {
		setPassword(event.target.value);
		setIsError(false);
	}

	function updateConfirmPassword(event) {
		setConfirmPassword(event.target.value);
		setIsErrorMatch(false);
	}

	//logins user by sending a request to server
	async function login(event) {
		event.preventDefault();

		const userLogin = {
			username: username,
			password: password,
		};
		const auth = await fetch(`http://localhost:5000/user/login`, {
			method: "POST",
			body: JSON.stringify(userLogin),
			credentials: "include",
			withCredentials: true,
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		const authRes = await auth.json();
		setAuthSuccess(authRes.success);

		//if auth is successful, fetch user data
		if (authRes.success) {
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
			setIsError(false);
			navigate("/boards");
		} else {
			setIsError(true);
		}
	}

	//registers new user by sending a request to server
	async function signup(event) {
		event.preventDefault();

		//guard clauses
		if (password.length <= 8) {
			setIsError(true);
		} else if (confirmPassword !== password) {
			setIsErrorMatch(true);
		} else {
			const userSignup = {
				username: username,
				password: password,
			};
			const register = await fetch(`http://localhost:5000/user/register`, {
				method: "POST",
				credentials: "include",
				body: JSON.stringify(userSignup),
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					"Access-Control-Allow-Origin": "http://localhost:3000/",
				},
			});
			const registerRes = await register.json();
			setRegisterSuccess(registerRes.success);

			if (registerRes.success) {
				//on sucessful register, logs user in
				login(event);
				navigate("/boards");
			}
		}
	}

	return (
		<div className="flex-row height-max">
			<Image
				src="svg/low-poly-grid-haikei.svg"
				flex="1 1 50%"
				objectFit="cover"
				overflow="hidden"
			></Image>

			<Card
				backgroundColor="#FFF8EA"
				borderRadius={0}
				color="#815B5B"
				flex="1 1 50%"
				minW="300px"
				padding="0 20px 0 20px"
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
							{authSuccess === false && isLogin ? (
								<FormErrorMessage marginTop={0}>
									Invalid password or email. Please try again.
								</FormErrorMessage>
							) : (
								<></>
							)}
							{isLogin ? (
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

								<FormErrorMessage marginTop={0}>
									Password do not match. Please try again.
								</FormErrorMessage>
							</FormControl>
						)}
						<Button variant="userAuthButton" type="submit">
							{isLogin ? "Login" : "Create"}
						</Button>

						{registerSuccess === false ? (
							<div>Email already registered. Please try another email.</div>
						) : (
							<></>
						)}
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
