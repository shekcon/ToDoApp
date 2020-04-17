const functions = require("firebase-functions");
const app = require("express")();

const auth = require("./util/auth");

const todoAPI = require("./apis/todos");

const userAPI = require("./apis/users");

app.post("/login", userAPI.loginUser);
app.post("/signup", userAPI.signUpUser);

app.post("/user/image", auth, userAPI.uploadProfilePhoto);
app.get("/user", auth, userAPI.getUserDetail);
app.post("/user", auth, userAPI.updateUserDetails);

app.get("/todos", auth, todoAPI.getAllTodos);
app.post("/todos", auth, todoAPI.postOneTodo);
app.delete("/todo/:todoID", auth, todoAPI.deleteTodo);
app.put("/todo/:todoID", auth, todoAPI.editTodo);

exports.api = functions.https.onRequest(app);
