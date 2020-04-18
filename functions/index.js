const functions = require("firebase-functions");
const app = require("express")();
const cors = require("cors");

const auth = require("./util/auth");
const todoAPI = require("./apis/todos");
const userAPI = require("./apis/users");

app.use(
  cors({
    origin: ["https://todo-edb11.web.app", "http://localhost:3000", "https://to-do-app-tan.now.sh"],
    // origin: "*",
    methods: "GET,PUT,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    maxAge: 86400,
  })
);

// auth API
app.post("/login", userAPI.loginUser);
app.post("/signup", userAPI.signUpUser);

// user API
app.post("/user/image", auth, userAPI.uploadProfilePhoto);
app.get("/user", auth, userAPI.getUserDetail);
app.post("/user", auth, userAPI.updateUserDetails);

// todo API
app.get("/todos", auth, todoAPI.getAllTodos);
app.post("/todos", auth, todoAPI.postOneTodo);
app.delete("/todo/:todoID", auth, todoAPI.deleteTodo);
app.put("/todo/:todoID", auth, todoAPI.editTodo);

exports.api = functions.https.onRequest(app);
