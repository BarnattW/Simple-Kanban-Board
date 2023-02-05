import Board from "./Board/Board";
import Header from "./Header";
import Footer from "./Footer";
import { Route, Routes } from "react-router-dom";

function App() {
	return (
		<div>
			<Header />
			<Routes>
				<Route exact path="/" element={<Board />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
