const { createServer } = require('node:http');
const Express = require('./lib/express');

const postsController = require('./controllers/posts.controller');
const viewController = require('./controllers/views.controller');
const usersController = require('./controllers/users.controller');
const commentsController = require('./controllers/comments.controller');
const todosController = require('./controllers/todos.controller');
const albumsController = require('./controllers/albums.controller');

const server = createServer((req, res) => {
	const app = new Express(req, res);

	// 	VIEWS ROUTES

	app.GET('/', viewController.getHome);

	app.GET('/routes', viewController.getRoutes);

	// POSTS ROUTES

	app.GET('/posts', postsController.getPosts);

	app.POST('/posts', postsController.postPosts);

	app.DELETE('/posts', postsController.deletePosts);

	app.PUT('/posts', postsController.putPosts);

	// USERS ROUTES

	app.GET('/users', usersController.getUsers);

	app.POST('/users', usersController.postUsers);

	app.DELETE('/users', usersController.deleteUsers);

	app.PUT('/users', usersController.putUsers);

	// COMMENTS ROUTES

	app.GET('/comments', commentsController.getCommets);

	// TODOS ROUTES

	app.GET('/todos', todosController.getTodos);

	app.POST('/todos', todosController.postTodos);

	app.DELETE('/todos', todosController.deleteTodos);

	app.PUT('/todos', todosController.putTodos);

	// ALBUMS ROUTES

	app.GET('/albums', albumsController.getAlbums);
});

const PORT = process.env.PORT || 4100;
server.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));
