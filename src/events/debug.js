import Event from '../classes/Event.js';

export default class Debug extends Event {
	constructor(_clientInstance) {
		super(_clientInstance, 'debug', 'on');

		this.client = _clientInstance;
	}

	/**
	 *
	 * @param {import('../classes/Client.js').default} client
	 */
	async exec(info) {
		this.client.logger.info(`[Event.Debug] -> ${info}`);
	}
}
