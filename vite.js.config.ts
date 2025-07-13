import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, 'dist/index.js'),
			name: 'CookieConsent',
			fileName: 'cookie-consent',
		},
		outDir: 'dist-js',
	},
	plugins: [svelte()],
});
