export default class NotFound extends Error {
	constructor(message) {
		super(message);

		this.name = 'ERROR.NOT_FOUND';
		this.code = 'ENOTFOUND';
		this.status = 404;
	}
}
