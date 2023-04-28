const { read, write } = require('../model/model');

exports.getTodos = (req, res) => {
	const todos = read('todos');

	if (req.query && req.query.userId != undefined) {
		const userId = req.query.userId;

		const filteredTodos = todos.filter(t => t.userId == userId);

		res.JSON(200, JSON.stringify(filteredTodos));
	} else {
		res.JSON(200, JSON.stringify(todos));
	}
};

exports.postTodos = async (req, res) => {
	try {
		const todos = read('todos');
		const newTodo = await req.body;

		const existUser = todos.filter(p => p.userId == JSON.parse(newUser).userId);

		if (!existUser.length) {
			return res.JSON(
				404,
				JSON.stringify({ status: 404, message: 'User not fount. Please add new user first !' })
			);
		}

		todos.push({ ...JSON.parse(newTodo), id: todos.at(-1).id + 1 || 1 });
		write('todos', todos);
		res.JSON(201, JSON.stringify({ status: 201, message: 'Todo created !' }));
	} catch (error) {
		res.JSON(400, JSON.stringify({ status: 400, message: error.message }));
	}
};

exports.deleteTodos = async (req, res) => {
	try {
		const todos = read('todos');
		const deleteTodo = JSON.parse(await req.body);
		const userIndex = todos.findIndex(t => t.userId == deleteTodo.userId);
		if (userIndex != -1) {
			const deletedTodo = todos[userIndex];
			const filteredTodos = todos.filter(p => p.userId != deletedTodo.userId);

			write('todos', filteredTodos);
			res.JSON(200, JSON.stringify({ status: 200, message: 'Todo deleted !' }));
		} else {
			return res.JSON(404, JSON.stringify({ status: 404, message: 'This user has no Todos' }));
		}
	} catch (error) {
		res.JSON(201, JSON.stringify({ status: 404, message: error.message }));
	}
};

exports.putTodos = async (req, res) => {
	const todos = read('todos');
	const updateTodo = JSON.parse(await req.body);
	const userIndex = todos.findIndex(p => p.userId == updateTodo.userId);
	if (userIndex != -1) {
		const updatedTodoIndex = todos.findIndex(p => p.id == updateTodo.id);

		if (updatedTodoIndex != -1) {
			const updateTodoId = todos[updatedTodoIndex];
			const filteredTodos = todos.filter(p => p.id != updateTodoId.id);
			filteredTodos.push(updateTodo);
			write('todos', filteredTodos);
			res.JSON(201, JSON.stringify({ status: 201, message: 'Todos Updated  !' }));
		} else {
			return res.JSON(404, JSON.stringify({ status: 404, message: 'This user has no todos' }));
		}
	} else {
		return res.JSON(404, JSON.stringify({ status: 404, message: 'User not found !' }));
	}
}
