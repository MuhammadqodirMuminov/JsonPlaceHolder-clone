const url = require('url');
const quaryString = require('querystring');

class Express {
	constructor(req, res) {
		this.req = req;
		this.res = res;

		this.res.JSON = (status, data) => {
			this.res.writeHead(status, { 'Content-Type': 'application/json' });
			return this.res.end(data);
		};

		this.res.HTML = (status, data) => {
			this.res.writeHead(status, { 'Content-Type': 'text/html' });
			return this.res.end(data);
		};

		if (this.req.method != 'GET') {
			this.req.body = new Promise((resolve, reject) => {
				let str = '';

				this.req.on('data', chunk => (str += chunk));
				this.req.on('end', () => {
					resolve(str);
				});
			});
		}
	}

	GET(route, cb) {
		const { pathname, query } = url.parse(this.req.url);
		this.req.query = quaryString.parse(query);
		if (route == pathname && this.req.method == 'GET') {
			cb(this.req, this.res);
		}
	}

	POST(route, cb) {
		if (route == this.req.url && this.req.method == 'POST') {
			cb(this.req, this.res);
		}
	}

	DELETE(route, cb) {
		if (route == this.req.url && this.req.method == 'DELETE') {
			cb(this.req, this.res);
		}
	}

	PUT(route, cb) {
		if (route == this.req.url && this.req.method == 'PUT') {
			cb(this.req, this.res);
		}
	}
}

module.exports = Express;
