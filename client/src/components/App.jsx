import Board from "./Board/Board";
import Header from "./Header";
import Footer from "./Footer";
import ViewBoards from "./ViewBoards/ViewBoards";
import { Route, Routes } from "react-router-dom";

function App() {
	return (
		<div className="app">
			<Header />
			<Routes>
				<Route exact path="/" element={<Board />} />
				<Route exact path="/boards" element={<ViewBoards />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
