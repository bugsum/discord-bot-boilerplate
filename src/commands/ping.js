import Command from '../classes/Command.js';

export default class Ping extends Command {
	constructor(_clientInstance) {
		super(_clientInstance);

		this.client = _clientInstance;
		this.data = {
			name: 'ping',
			description: 'Replies with Pong!',
			usage: '/ping',
			options: [],
			cooldown: 10 * 1000,
			enabled: true,
			ownerOnly: false,
			devOnly: false,
		};
	}

	/**
	 * @param {import('discord.js').CommandInteraction} interaction
	 */
	async execute(interaction) {
		await interaction.reply({ content: 'Success!', ephemeral: true });
	}
}
