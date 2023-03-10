import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type Plugin } from 'vite';
import fs from 'fs';

const hexLoader: Plugin = {
	name: 'hex-loader',
	transform(code, id) {
		const [path, query] = id.split('?');
		if (query != 'raw-hex') return null;

		const data = fs.readFileSync(path);
		const hex = data.toString('hex');

		return `export default '${hex}';`;
	}
};

export default defineConfig({
	plugins: [hexLoader, sveltekit()]
});
