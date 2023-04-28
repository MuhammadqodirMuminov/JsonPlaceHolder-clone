const { readFileSync, writeFileSync } = require('node:fs');
const { join } = require('node:path');

function read(fileName, dirName = 'database', extName = '.json') {
	const fileDir = join(__dirname, '..', dirName, fileName + extName);
	const result = readFileSync(fileDir, { encoding: 'utf-8' });
	return JSON.parse(result);
}

function readViews(fileName, dirName = 'database', extName = '.json') {
	const fileDir = join(__dirname, '..', dirName, fileName + extName);
	const result = readFileSync(fileDir, { encoding: 'utf-8' });
	return result;
}

function write(fileName, data) {
	const fileDir = join(__dirname, '..', 'database', fileName + '.json');
	const result = writeFileSync(fileDir, JSON.stringify(data, null, 3));
	return result;
}

module.exports = { read, write, readViews };
