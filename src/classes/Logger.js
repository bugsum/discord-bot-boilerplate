import fs from 'fs';
import moment from 'moment';
import 'colors';

const date = new Date();
const timestamp = {
	date: [date.getDate(), date.getMonth(), date.getFullYear()],
	time: [date.getHours(), date.getMinutes(), date.getSeconds()],
};

export default class Logger {
	constructor({ loggerName, loggerDirectory }) {
		this.cache = [];
		this.loggerName = loggerName;
		this.loggerDirectory =
			`${loggerDirectory}/${this.loggerName}/${timestamp.date.join('-')}` ||
			`${process.cwd()}/logs/${this.loggerName}/${timestamp.date.join('-')}`;

		if (!fs.existsSync(this.loggerDirectory)) {
			fs.mkdirSync(this.loggerDirectory, { recursive: true });
		}
	}

	log(level, message) {
		let o = `[${moment().format('hh:mm:ss')}] / ${level.toUpperCase()} / ${capitalize(this.loggerName)} / ${message}`;

		// this.cache.push(o);

		const clgTime = moment().format('hh:mm:ss');
		const clgLevel = level.toUpperCase();
		const clgName = `App.${capitalize(this.loggerName)}`;

		console.log(
			[
				`[${clgTime.grey.bold}]`,
				`${'/'.grey.bold}`,
				`${clgLevel.blue.bold}`,
				`${'/'.grey.bold}`,
				`${clgName.green.bold}`,
				`${'/'.grey.bold}`,
				`${message.white.bold}`,
			].join(' '),
		);

		fs.appendFileSync(`${this.loggerDirectory}/${timestamp.time.join('-')}.log`, `${o}\n`);
	}

	info(message) {
		this.log('info', message);
	}

	warn(message) {
		this.log('warn', message);
	}

	error(message) {
		this.log('error', message);
	}
}

function capitalize(text) {
	return text.charAt(0).toUpperCase() + text.slice(1);
}
