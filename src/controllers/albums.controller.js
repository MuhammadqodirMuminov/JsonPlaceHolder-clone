const { read } = require('../model/model');

exports.getAlbums = (req, res) => {
	const albums = read('albums');
	res.JSON(200, JSON.stringify(albums));
};
