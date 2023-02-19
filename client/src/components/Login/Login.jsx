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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Login(props) {
	const isLogin = props.type === "login" ? true : false;

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
			>
				<CardHeader>
					<Heading>
						{isLogin ? "Login to Simple Kanban" : "Create An Account"}
					</Heading>
				</CardHeader>
				<CardBody>
					<form>
						<FormControl>
							<FormLabel>Email</FormLabel>
							<Input type="email" />
						</FormControl>
						<FormControl>
							<FormLabel>Password</FormLabel>
							<Input type="password" />
						</FormControl>
						<Button variant="userAuthButton" type="submit">
							{isLogin ? "Login" : "Create"}
						</Button>
					</form>
				</CardBody>
				<CardFooter>
					<p>
						{isLogin ? "Don't have an account?" : "Already have an account?"}
						<Link to={isLogin ? "/signup" : "/login"}>
							{" "}
							{isLogin ? "Create an account" : "Sign back in"}
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}

export default Login;
