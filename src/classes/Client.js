import { Client, Collection } from 'discord.js';
import Handler from './Handler.js';
import Utility from './Utility.js';
import Logger from './Logger.js';
import NotFound from './errors/NotFound.js';
import config from '../config/settings.json' assert { type: 'json' };

export default class CustomClient extends Client {
	constructor({ args, token }) {
		if (!args || !token) throw new NotFound('Client Args or Client Token not provided!');

		super(args);

		this.token = token;
		this.utilities = new Utility();
		this.logger = new Logger({ loggerName: this.utilities.capitalize(config.name), loggerDirectory: `${process.cwd()}/src/logs/` });
		this.commands = new Collection();
		this.commandCooldown = new Collection();
		this.slash = [];
		this.settings = config;

		new Handler(this).load();
	}

	async start(token) {
		await super.login(token || this.token).then(() => {
			this.logger.info('[Client.Start] -> Token Logged in!');
		});
	}
}
