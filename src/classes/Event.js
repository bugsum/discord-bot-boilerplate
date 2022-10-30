export default class Event {
	constructor(_clientInstance, _eventName, _eventMode) {
		this.client = _clientInstance;

		this.name = _eventName;
		this.mode = _eventMode;

		this._listener = this._exec.bind(this);
	}

	async _exec(...args) {
		try {
			await this.exec(...args);
		} catch (error) {
			console.error(error);
		}
	}

	initialize() {
		switch (this.mode) {
			case 'once':
				this.client.once(this.name, this._listener);
				break;

			case 'on':
				this.client.on(this.name, this._listener);
				break;

			case 'off':
				this.client.off(this.name, this._listener);
				break;

			default:
				throw new Error(`Invalid mode: ${this.mode}`);
		}
	}
}
