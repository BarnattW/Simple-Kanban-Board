import Board from "./Board/Board";
import Header from "./Header";
import Footer from "./Footer";
import ViewBoards from "./ViewBoards/ViewBoards";
import NotFound from "./NotFound";
import { Route, Routes } from "react-router-dom";

function App() {
	return (
		<div className="app">
			<Header />
			<Routes>
				<Route exact path="/" element={<ViewBoards />} />
				<Route path="/board/:id" element={<Board />} />
				<Route exact path="/boards" element={<ViewBoards />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
