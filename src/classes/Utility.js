import { readdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

class Utility {
	_getFiles(directory) {
		return readdirSync(directory).filter((file) => file.endsWith('.js'));
	}

	capitalize(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
}

export default Utility;
