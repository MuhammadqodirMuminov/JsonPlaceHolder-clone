const { read, write } = require('../model/model');

exports.getPosts = (req, res) => {
	const data = read('posts');

	if (req.query && req.query.userId != undefined) {
		const userId = req.query.userId;
		const filteredPosts = data.filter(p => p.userId == userId);
		res.JSON(200, JSON.stringify(filteredPosts));
	} else {
		res.JSON(200, JSON.stringify(data));
	}
};

exports.postPosts = async (req, res) => {
	try {
		const posts = read('posts');
		const newPost = await req.body;

		const existUser = posts.filter(p => p.userId == JSON.parse(newPost).userId);

		if (!existUser.length) {
			return res.JSON(
				400,
				JSON.stringify({ status: 404, message: 'User not fount. Please add new user first !' })
			);
		}

		posts.push({ ...JSON.parse(newPost), id: posts.at(-1).id + 1 || 1 });
		write('posts', posts);
		res.JSON(201, JSON.stringify({ status: 201, message: 'Post created !' }));
	} catch (error) {
		res.JSON(201, JSON.stringify({ status: 404, message: error.message }));
	}
};

exports.deletePosts = async (req, res) => {
	try {
		const posts = read('posts');
		const deletePost = JSON.parse(await req.body);
		const userIndex = posts.findIndex(p => p.userId == deletePost.userId);
		if (userIndex != -1) {
			const deletedPost = posts[userIndex];
			const filteredPosts = posts.filter(p => p.userId != deletePost.userId);

			write('posts', filteredPosts);
			res.JSON(200, JSON.stringify({ status: 200, message: 'Post deleted !' }));
		} else {
			return res.JSON(404, JSON.stringify({ status: 404, message: 'This user has no posts' }));
		}
	} catch (error) {
		res.JSON(201, JSON.stringify({ status: 404, message: error.message }));
	}
};

exports.putPosts = async (req, res) => {
	const posts = read('posts');
	const updatePost = JSON.parse(await req.body);
	const userIndex = posts.findIndex(p => p.userId == updatePost.userId);
	if (userIndex != -1) {
		const updatedPostIndex = posts.findIndex(p => p.id == updatePost.id);

		if (updatedPostIndex != -1) {
			const updatePostId = posts[updatedPostIndex];
			const filteredPosts = posts.filter(p => p.id != updatePostId.id);
			filteredPosts.push(updatePost);
			write('posts', filteredPosts);
			res.JSON(201, JSON.stringify({ status: 201, message: 'Updated  !' }));
		} else {
			return res.JSON(404, JSON.stringify({ status: 404, message: 'This user has no posts' }));
		}
	} else {
		return res.JSON(404, JSON.stringify({ status: 404, message: 'This user has no posts' }));
	}
};
