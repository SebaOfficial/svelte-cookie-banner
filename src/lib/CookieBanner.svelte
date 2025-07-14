<svelte:options
	customElement={{
		tag: 'cookie-banner',
	}}
/>

<script lang="ts">
	import type { CommonProps } from './types.js';
	import BaseCookieConsent from './BaseCookieConsent.svelte';

	let customizeBtn: HTMLButtonElement | undefined = $state();
	let rejectAllBtn: HTMLButtonElement | undefined = $state();
	let acceptAllBtn: HTMLButtonElement | undefined = $state();

	const {
		cookie,
		heading,
		description,
		acceptAllLabel,
		rejectAllLabel,
		customize,
		choices = $bindable(),
		editable = true,
		fingerprinting = false,
		bgColor = '#000000',
		fgColor = '#ffffff',
	}: CommonProps = $props();
</script>

<BaseCookieConsent
	{cookie}
	{heading}
	{description}
	{customize}
	{choices}
	{editable}
	{fingerprinting}
	{bgColor}
	{fgColor}
	{customizeBtn}
	{rejectAllBtn}
	{acceptAllBtn}
>
	<div class="banner">
		<div>
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			<h3 id="cookie-consent-title">{@html heading}</h3>
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			<p id="cookie-consent-description">{@html description}</p>
		</div>

		<div class="actions">
			{#if customize}
				<button id="customize" bind:this={customizeBtn}>{customize.label}</button>
			{/if}
			{#if rejectAllLabel}
				<button id="reject" bind:this={rejectAllBtn}>{rejectAllLabel}</button>
			{/if}
			{#if acceptAllLabel}
				<button id="accept" bind:this={acceptAllBtn}>{acceptAllLabel}</button>
			{/if}
		</div>
	</div>
</BaseCookieConsent>

<style lang="scss">
	$mobile-size: 600px;

	.banner {
		z-index: 9999;
		position: fixed;
		bottom: 1vw;
		left: 1vw;
		right: 1vw;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
		display: flex;
		flex-direction: row;
		width: 95vw;
		background-color: var(--bg-color);
		color: var(--fg-color);
		padding: 12px 16px;
		margin: auto;

		@media (max-width: $mobile-size) {
			flex-direction: column;
			align-items: center;
		}

		h3 {
			font-size: 1em;
			font-weight: 400;
			margin-top: 0;
			margin-bottom: 5px;
		}

		p {
			margin: 0;
			font-size: 0.9em;
		}

		.actions {
			width: calc(100% / 3);
			display: flex;
			justify-content: flex-end;
			align-items: center;
			gap: 15px;

			button {
				cursor: pointer;
				padding: 5px;
				border: 2px solid var(--fg-color);
				color: var(--bg-color);
				transition: all 0.7s;
				font-size: 0.9em;
				width: calc(100% / 3);
				height: 50%;

				&#customize {
					background-color: inherit;
					color: inherit;
					border: none;
					font-size: 1em;
				}

				&:hover {
					color: inherit;
					background-color: rgba(128, 128, 128, 0.2);
				}
			}

			@media (max-width: $mobile-size) {
				flex-direction: column;
				align-items: center;
				width: 100%;
				margin-top: 15px;

				button {
					width: 100%;
				}
			}
		}
	}
</style>
