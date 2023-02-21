const Board = require("../model/user.js");

module.exports = {
	start: function (io) {
		io.on("connection", (socket) => {
			console.log(`${socket.id} is connected`);
			socket.on("disconnect", () => {
				console.log("User disconnected");
			});

			//retreives all boards in user account from database
			socket.on("retreiveBoards", (id) => {
				const query = { _id: id };
				Board.findOne(query, function (err, result) {
					if (err) {
						console.log("Error with finding Boards");
						return;
					}

					if (result == null) {
						console.log("No results");
					} else {
						console.log("Returning Result");
						socket.emit("sendBoards", result);
					}
				});
			});

			//creates new board in database (updates userBoards)
			socket.on("createBoard", (newBoard) => {
				const query = { _id: newBoard._id };
				const createNewBoard = {
					$push: {
						userBoards: {
							title: newBoard.title,
							board: [],
						},
					},
				};
				Board.updateOne(query, createNewBoard, function (err, res) {
					if (err) {
						console.log("Could not create Board");
						return;
					}
					console.log("New board created");
				});
			});

			//deletes specific board from user boards in database (updates board)
			socket.on("deleteBoard", (userID, boardID) => {
				console.log(userID, boardID);
				const query = { "userBoards._id": boardID, _id: userID };
				const removeBoard = {
					$pull: {
						userBoards: { _id: boardID },
					},
				};
				Board.updateOne(query, removeBoard, function (err, res) {
					if (err) throw err;
					console.log("Board removed");
				});
			});

			//returns specific board from userBoards in database
			socket.on("getBoard", (userID, boardID) => {
				const query = { "userBoards._id": boardID, _id: userID };
				Board.findOne(
					query,
					{ userBoards: { $elemMatch: { _id: boardID } } },
					function (err, result) {
						if (err) {
							console.log(err);
							return;
						}
						socket.emit("sendBoard", result);
					}
				);
			});

			//updates a specific user's board in database
			socket.on("updateBoard", (userID, boardID, editedBoard) => {
				const query = { "userBoards._id": boardID, _id: userID };
				const updatedBoard = {
					$set: {
						"userBoards.$.title": editedBoard.title,
						"userBoards.$.board": editedBoard.board,
					},
				};
				Board.updateOne(query, updatedBoard, function (err, res) {
					if (err) throw err;
					console.log("Board updated");
				});
			});
		});
	},
};
