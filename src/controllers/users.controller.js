const { read, write } = require('../model/model');

exports.getUsers = (req, res) => {
	const users = read('users');

	if (req.query && req.query.username != undefined) {
		const username = req.query.username;
		const filteredUsers = users.filter(p => p.username == username);
		res.JSON(200, JSON.stringify(filteredUsers));
	} else {
		res.JSON(200, JSON.stringify(users));
	}
};

exports.postUsers = async (req, res) => {
	try {
		const users = read('users');
		const newUser = await req.body;

		const existUser = users.filter(p => p.username == JSON.parse(newUser).username);

		if (existUser.length) {
			return res.JSON(
				400,
				JSON.stringify({ status: 404, message: 'Username alrerady been taken !' })
			);
		}

		users.push({ ...JSON.parse(newUser), id: users.at(-1).id + 1 || 1 });
		write('users', users);
		res.JSON(201, JSON.stringify({ status: 201, message: 'User created !' }));
	} catch (error) {
		res.JSON(400, JSON.stringify({ status: 404, message: error.message }));
	}
};

exports.deleteUsers = async (req, res) => {
	try {
		const users = read('users');
		const deleteUser = JSON.parse(await req.body);
		const userIndex = users.findIndex(p => p.id == deleteUser.id);
		if (userIndex != -1) {
			const deletedUser = users[userIndex];
			const filteredUsers = users.filter(u => u.id != deletedUser.id);

			write('users', filteredUsers);
			res.JSON(200, JSON.stringify({ status: 200, message: 'User deleted !' }));
		} else {
			return res.JSON(400, JSON.stringify({ status: 404, message: 'User not found' }));
		}
	} catch (error) {
		res.JSON(400, JSON.stringify({ status: 404, message: error.message }));
	}
};

exports.putUsers = async (req, res) => {
	const users = read('users');
	const updateUser = JSON.parse(await req.body);
	const userIndex = users.findIndex(p => p.id == updateUser.id);

	if (userIndex != -1) {
		const updateUserid = users[userIndex];

		const filteredUsers = users.filter(p => p.id != updateUserid.id);

		filteredUsers.push(updateUser);
		write('users', filteredUsers);
		res.JSON(201, JSON.stringify({ status: 201, message: 'User Updated  !' }));
	} else {
		return res.JSON(404, JSON.stringify({ status: 404, message: 'User not found !' }));
	}
}