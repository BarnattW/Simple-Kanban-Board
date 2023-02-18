const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const path = require("path");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.static("../client/public"));
app.use(express.urlencoded({ extended: true }));

const db = require("./db/mongoDB");
app.use(require("./routes/userBoards"));

app.get("/*", function (req, res) {
	res.sendFile(path.join(__dirname, "/../build/index.html"), function (err) {
		if (err) {
			res.status(500).send(err);
		}
	});
});

app.listen(port, function () {
	console.log(`Server started on port ${port}`);
});
