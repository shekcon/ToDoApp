const functions = require("firebase-functions");
const app = require("express")();

const auth = require("./util/auth");

const todoAPI = require("./apis/todos");

const userAPI = require("./apis/users");

app.post("/login", userAPI.loginUser);
app.post("/signup", userAPI.signUpUser);

app.post("/user/image", auth, userAPI.uploadProfilePhoto);
app.get("/user", auth, userAPI.getUserDetail);
app.post('/user', auth, userAPI.updateUserDetails);

app.get("/todos", todoAPI.getAllTodos);
app.post("/todos", todoAPI.postOneTodo);
app.delete("/todo/:todoID", todoAPI.deleteTodo);
app.put("/todo/:todoID", todoAPI.editTodo);

exports.api = functions.https.onRequest(app);
