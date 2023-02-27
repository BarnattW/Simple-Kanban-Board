const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const passport = require("passport");
const http = require("http").Server(app);
require("dotenv").config();

app.use(express.json());
app.use(express.static("../client/public"));
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
	res.header(
		"Access-Control-Allow-Origin",
		"https://simplekanbanboardio.netlify.app"
	); // update to match the domain you will make the request from
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.use(
	cors({
		origin: true,
		credentials: true,
	})
);

//initialize user authentication, now with session store 
app.use(
	session({
		cookie: { maxAge: 86400000 },
		store: new MemoryStore({
			checkPeriod: 86400000, // prune expired entries every 24h
		}),
		resave: false,
		secret: "keyboard cat",
		saveUninitialized: true,
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

//initialize web socket
const io = require("socket.io")(http, {
	secure: true,
	port: "10000",
	cors: {
		origin: "*",
		credentials: true,
	},
});

const userBoards = require("./websocket/ws");
userBoards.start(io);

//main page
app.get("/*", function (req, res) {
	res.sendFile(path.join(__dirname, "/../build/index.html"), function (err) {
		if (err) {
			res.status(500).send(err);
		}
	});
});

http.listen(port, () => {
	console.log(`Server listening on ${port}`);
});
