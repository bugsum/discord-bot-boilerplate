import Event from '../classes/Event.js';

export default class InteractionCreate extends Event {
	/**
	 * @param {import('../classes/Client').default} _clientInstance
	 */
	constructor(_clientInstance) {
		super(_clientInstance, 'interactionCreate', 'on');

		this.client = _clientInstance;
	}

	/**
	 * @param {import('discord.js').BaseInteraction} interaction
	 */
	async exec(interaction) {
		if (!interaction.isCommand()) return;

		const command = this.client.commands.get(interaction.commandName);

		if (!command) return;

		// Check if the command is for the owner only.
		if (command.data.ownerOnly && interaction.user.id !== interaction.guild.ownerId) {
			return interaction.reply({
				content: 'You do not have permission to use this command.',
				ephemeral: true,
			});
		}

		// Check if the command is for developers only
		if (command.data.devOnly && !this.client.settings.developers.includes(interaction.user.id)) {
			return interaction.reply({
				content: 'You do not have permission to use this command.',
				ephemeral: true,
			});
		}

		// Check if the command is enabled
		if (command.data.enabled === false) {
			return interaction.reply({
				content: 'This command is currently disabled.',
				ephemeral: true,
			});
		}

		if (command.data.cooldown) {
			let cooldown = this.client.commandCooldown.get(`${command.data.name}-${interaction.user.id}`);

			if (cooldown && cooldown > Date.now()) {
				return interaction.reply({
					content: `Please wait ${Math.ceil((cooldown - Date.now()) / 1000)} more second(s) before reusing the \`${
						command.data.name
					}\` command.`,
					ephemeral: true,
				});
			}

			this.client.commandCooldown.set(`${command.data.name}-${interaction.user.id}`, new Date().valueOf() + command.data.cooldown);
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			this.client.logger.error(`[Event.InteractionCreate] -> ${error}`);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
}
