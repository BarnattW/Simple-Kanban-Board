const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();

app.use(express.json());
app.use(express.static("../client/public"));
app.use(express.urlencoded({ extended: true }));

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

//initialize user authentication
app.use(
	session({
		secret: "test secret",
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());

const User = require("./model/user");

passport.use(User.createStrategy());
passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser((_id, done) => {
	User.findById(_id, (err, user) => {
		if (err) {
			done(null, false, { error: err });
		} else {
			done(null, user);
		}
	});
});


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
