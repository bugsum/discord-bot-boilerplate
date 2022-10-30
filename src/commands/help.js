import { bold, inlineCode, resolveColor } from 'discord.js';
import Command from '../classes/Command.js';

export default class Help extends Command {
	constructor(_clientInstance) {
		super(_clientInstance);

		this.client = _clientInstance;
		this.data = {
			name: 'help',
			description: 'Displays a list of all commands or information about a specific command.',
			usage: '/help [command]',
			options: [
				{
					name: 'command',
					description: 'The command to get information about.',
					type: 3,
					required: false,
				},
			],
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
		const command = interaction.options.get('command')?.value;

		if (!command) {
			const commands = this.client.commands.map((cmd) => inlineCode(cmd.data.name)).join(', ');

			return interaction.reply({
				embeds: [
					{
						// author: {
						// 	name: interaction.user.tag,
						// 	icon_url: interaction.client.user.displayAvatarURL(),
						// },
						title: 'Dynamic Help Command',
						description: [bold('Here is a list of all commands.'), `> ${commands}`].join('\n'),
						color: resolveColor('Blurple'),
						timestamp: new Date(),
					},
				],
				ephemeral: true,
			});
		}

		const cmd = this.client.commands.get(command.toLowerCase());

		if (!cmd) {
			return interaction.reply({
				content: `Command \`${command}\` not found.`,
				ephemeral: true,
			});
		}

		return interaction.reply({
			ephemeral: true,
			embeds: [
				{
					author: {
						name: interaction.user.tag,
						icon_url: interaction.client.user.displayAvatarURL(),
					},
					title: `Command: ${cmd.data.name}`,
					description: [
						`${bold('Name')}: ${cmd.data.name}`,
						`${bold('Description')}: ${cmd.data.description}`,
						`${bold('Usage')}: ${cmd.data.usage}`,
						`${bold('Options')}: ${cmd.data.options.map((option) => `\`${option.name}\``).join(', ')}`,
						`${bold('Cooldown')}: ${cmd.data.cooldown}`,
						`${bold('Enabled?')}: ${cmd.data.enabled}`,
						`${bold('IsOwnerOnly?')}: ${cmd.data.ownerOnly}`,
						`${bold('IsDevOnly?')}: ${cmd.data.devOnly}`,
					].join('\n'),
					color: resolveColor('Blurple'),
					timestamp: new Date(),
				},
			],
		});
	}
}
