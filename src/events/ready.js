import Event from '../classes/Event.js';

export default class Ready extends Event {
	constructor(_clientInstance) {
		super(_clientInstance, 'ready', 'once');

		this.client = _clientInstance;
	}

	/**
	 *
	 * @param {import('../classes/Client.js').default} client
	 */
	async exec(client) {
		client.logger.info(`[Event.Ready] -> ${client.user.tag} is online!`);
	}
}
