import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { REST, Routes } from 'discord.js';

class Handler {
	/**
	 *
	 * @param {import("./Client").default} client
	 */
	constructor(client) {
		this.client = client;

		this.rest = new REST({ version: '10' }).setToken(this.client.token);
	}

	async load() {
		await this.loadCommands();
		await this.loadEvents();
	}
	async loadCommands() {
		const path = `${process.cwd()}/src/commands/`;

		this.client.utilities._getFiles(path).forEach(async (file) => {
			const _fileName = file.split('.js')[0];

			const Command = (await import(`file://${path}/${file}`)).default;
			const command = new Command(this.client);

			this.client.commands.set(command.data.name, command);
			this.client.slash.push(command.data);
		});

		switch (this.client.settings.environ) {
			case 'prod':
				this.rest
					.put(Routes.applicationCommands(this.client.settings.prod.client.id), { body: this.client.slash })
					.then((data) => {
						this.client.logger.info(`[Handler.LoadCommands] -> ${data.length} Commands Loaded!`);
					})
					.catch((err) => {
						this.client.logger.error(`[Handler.LoadCommands] -> ${err}`);
					});
				break;

			case 'dev':
				this.rest
					.put(Routes.applicationGuildCommands(this.client.settings.dev.client.id, this.client.settings.dev.client.guild.id), {
						body: this.client.slash,
					})
					.then((data) => {
						this.client.logger.info(`[Handler.LoadCommands] -> ${data.length} Commands Loaded!`);
					})
					.catch((err) => {
						this.client.logger.error(`[Handler.LoadCommands] -> ${err}`);
					});
				break;

			default:
				break;
		}
	}

	async loadEvents() {
		const path = `${process.cwd()}/src/events/`;

		this.client.utilities._getFiles(path).forEach(async (file) => {
			const _fileName = file.split('.js')[0];

			const Event = (await import(`file://${path}/${file}`)).default;
			const _eventInstance = new Event(this.client);

			_eventInstance.initialize();
		});
	}
}

export default Handler;
