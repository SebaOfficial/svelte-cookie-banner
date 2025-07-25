import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			pages: 'build/demo',
			assets: 'build/demo',
		}),
		paths: {
			base: process.env.BASE_PATH ?? '',
		},
	},
	compilerOptions: {
		customElement: true,
	},
};

export default config;
