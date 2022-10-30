import CustomClient from './classes/Client.js';
import 'dotenv/config';
import { ActivityType, GatewayIntentBits } from 'discord.js';

(() => {
	const { Guilds, GuildMessages, GuildMembers } = GatewayIntentBits;

	new CustomClient({
		args: {
			intents: [Guilds, GuildMessages, GuildMembers],
			allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
			presence: {
				activities: [
					{
						name: '/help',
						type: ActivityType.Listening,
					},
				],
			},
		},

		token: process.env.TOKEN,
	}).start();
})();
