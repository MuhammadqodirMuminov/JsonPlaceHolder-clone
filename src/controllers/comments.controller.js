const { read } = require('../model/model');

exports.getCommets = (req, res) => {
	const comments = read('comments');
	res.JSON(200, JSON.stringify(comments));
};
