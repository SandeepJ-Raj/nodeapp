const express = require('express');
const router = express.Router();

const {list, addTodo, updateTodo, deleteTodo} = require('../controllers/todoController');

router.route("/").get(list);
router.route("/").post(addTodo);
router.route("/:id").put(updateTodo);
router.route("/:id").delete(deleteTodo);

module.exports = router;