const {readViews} =  require('../model/model')

exports.getHome =  (req, res) => {
	const data = readViews('index', 'views', '.html');
	res.HTML(200, data);
}

exports.getRoutes = (req, res) => {
	const data = readViews('routes', 'views', '.html');
	res.HTML(200, data);
}