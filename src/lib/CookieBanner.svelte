<script lang="ts">
	import cookies from 'js-cookie';
	import { v4 as uuid } from 'uuid';
	import { onMount } from 'svelte';
	import Cookie from './cookie.svg';

	import type { Props } from './types.js';

	const {
		visible = true,
		cookie = {
			name: 'gdpr-cookie',
			path: '/',
			secure: true,
			sameSite: 'strict'
		},
		heading = 'GDPR Notice',
		description = 'We use cookies to offer a better browsing experience, analyze site traffic, personalize content, and serve targeted advertisements. By clicking accept, you consent to our privacy policy & use of cookies.',
		acceptAllLabel = 'Accept All',
		rejectAllLabel = 'Reject All',
		customize = {
			label: 'Customize',
			chooseLabel: 'Choose Wich Cookies To Enable',
			confirmLabel: 'Confirm My Choices'
		},
		editable = true,
		choices = $bindable({
			necessary: {
				label: 'Necessary cookies',
				description: "Used for cookie control. Can't be turned off.",
				value: true,
				mandatory: true
			},
			tracking: {
				label: 'Tracking cookies',
				description: 'Used for advertising purposes.',
				value: true
			},
			analytics: {
				label: 'Analytics cookies',
				description: 'Used to control Analytics.',
				value: true
			},
			marketing: {
				label: 'Marketing cookies',
				description: 'Used for marketing data.',
				value: true
			}
		}),
		fingerprinting = true,
		bgColor = 'black',
		fgColor = 'white'
	}: Props = $props();

	let showBanner = $state(false);
	let showCustomize = $state(false);
	let escapeAction: 'close' | 'banner' = $state('banner');

	const saveChoices = () => {
		let data: { [k: string]: boolean | string } = Object.fromEntries(
			Object.entries(choices).map(([key, choice]) => [key, Boolean(choice.value)])
		);

		if (fingerprinting) {
			const fp =
				JSON.parse(cookies.get(cookie.name) ?? '{}').fingerprint ??
				(fingerprinting === true ? uuid() : fingerprinting.uuid);

			if (fingerprinting !== true && 'cookie' in fingerprinting) {
				const { name, ...config } = fingerprinting.cookie!;
				cookies.set(name, fp, config);
			} else {
				data.fingerprint = fp;
			}
		}

		const { name, ...config } = cookie;
		cookies.set(name, JSON.stringify(data), config);

		Object.entries(choices).forEach(([_, choice]) =>
			choice.value ? choice.onAccepted?.() : choice.onRejected?.()
		);

		escapeAction = 'close';
	};

	const rejectAll = () => {
		Object.values(choices).forEach((choice) => {
			choice.value = Boolean(choice.mandatory);
		});
		saveChoices();
		showBanner = false;
	};

	const acceptAll = () => {
		Object.values(choices).forEach((choice) => {
			choice.value = true;
		});
		saveChoices();
		showBanner = false;
	};

	const showCustomizeBtn = () => {
		showCustomize = true;
		document.documentElement.classList.add('blury-background-for-cookie-banner');
	};

	const closeCustomize = () => {
		document.documentElement.classList.remove('blury-background-for-cookie-banner');
		showCustomize = false;
		showBanner = escapeAction === 'banner';
	};

	const confirmCustomize = (e: Event) => {
		e.preventDefault();
		saveChoices();
		closeCustomize();
		showBanner = false;
	};

	const editCookies = () => {
		showBanner = true;
		showCustomizeBtn();
	};

	onMount(() => {
		let data = cookies.get(cookie.name);
		if (!data) return void (showBanner = true);

		const selectedCookies: { [k: string]: boolean | string } | undefined = JSON.parse(data);
		if (!selectedCookies) return void (showBanner = true);

		Object.entries(selectedCookies).forEach(([key, value]) => {
			if (key !== 'fingerprint') {
				const choice = choices[key];
				choice.value = value as boolean;
				void (value ? choice?.onAccepted?.() : choice?.onRejected?.());
			}
		});
		escapeAction = 'close';
	});

	const onKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Escape' && showBanner && visible && showCustomize) {
			closeCustomize();
		}
	};

	const toHtmlId = (str: string) =>
		str
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9\s-]/g, '')
			.replace(/\s+/g, '-')
			.replace(/-+/g, '-');
</script>

<svelte:options
	customElement={{
		tag: "cookie-banner"
	}}
/>

{#if showBanner && visible}
	<div
		role="dialog"
		aria-labelledby="cookie-banner-title"
		aria-describedby="cookie-banner-description"
		style="--bg-color: {bgColor}; --fg-color: {fgColor}"
	>
		{#if !showCustomize}
			<div class="banner">
				<div>
					<h3 id="cookie-banner-title">{heading}</h3>
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					<p id="cookie-banner-description">{@html description}</p>
				</div>

				<div class="actions">
					{#if customize}
						<button id="customize" onclick={showCustomizeBtn}>{customize.label}</button>
					{/if}
					{#if rejectAllLabel}
						<button id="reject" onclick={rejectAll}>{rejectAllLabel}</button>
					{/if}
					{#if acceptAllLabel}
						<button id="accept" onclick={acceptAll}>{acceptAllLabel}</button>
					{/if}
				</div>
			</div>
		{:else if customize}
			<div class="customize">
				<div>
					<h3 id="cookie-banner-title">{heading}</h3>
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					<p id="cookie-banner-description">{@html description}</p>
				</div>

				<form>
					<h4>{customize.chooseLabel}</h4>
					{#each Object.entries(choices) as [key, choice] (key)}
						<div>
							<input
								type="checkbox"
								id={toHtmlId(choice.label)}
								bind:checked={choice.value}
								disabled={choice.mandatory}
							/>
							<label for={toHtmlId(choice.label)}>
								<!-- eslint-disable-next-line svelte/no-at-html-tags -->
								<strong>{choice.label}</strong> - {@html choice.description}
							</label>
						</div>
					{/each}

					<button onclick={confirmCustomize}>{customize.confirmLabel}</button>
				</form>
			</div>
		{/if}
	</div>
{:else if editable}
	<button class="edit" onclick={editCookies}>
		<img src={Cookie} alt="Edit Cookies" />
	</button>
{/if}

<svelte:window on:keydown={onKeydown} />

<style lang="scss">
	:global(.blury-background-for-cookie-banner) {
		pointer-events: none;
		overflow: hidden;
		position: relative;

		&::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: inherit;
			backdrop-filter: blur(2px);
			filter: blur(2px);
			z-index: 0;
			pointer-events: none;
		}
	}

	.banner {
		z-index: 9999;
		position: fixed;
		bottom: 1vh;
		right: 1vw;
		display: flex;
		flex-direction: column;
		gap: 20px;
		max-width: 500px;
		background-color: var(--bg-color);
		color: var(--fg-color);
		padding: 20px;
		border-radius: 10px;

		h3 {
			font-size: larger;
			font-weight: 500;
			margin-top: 0;
		}

		.actions {
			display: flex;
			justify-content: flex-end;
			gap: 15px;
		}
	}

	.customize {
		z-index: 9999;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: var(--bg-color);
		color: var(--fg-color);
		padding: 30px;
		pointer-events: auto;
		backdrop-filter: 'blur(5px)';
		border-radius: 10px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);

		> div {
			box-sizing: border-box;
			margin: 0;
			padding: 0;

			h3 {
				font-size: 18px;
				font-weight: bold;
				margin-bottom: 10px;
			}

			p {
				font-size: 14px;
				line-height: 1.5;
				margin-bottom: 16px;
			}
		}

		form {
			h4 {
				font-size: 16px;
				margin: 16px 0 10px;
			}

			input[type='checkbox'] {
				margin-right: 8px;
				transform: scale(1.1);
			}

			label {
				display: inline-block;
				font-size: 14px;
				margin-bottom: 10px;
				line-height: 1.4;

				strong {
					font-weight: 600;
				}
			}

			button {
				width: 100%;
				margin-top: 16px;
				font-weight: 600;
			}
		}
	}

	button:not(.edit) {
		cursor: pointer;
		padding: 10px;
		border: 2px solid white;
		transition: all 0.7s;
		border-radius: 5px;
		font-size: medium;
		width: calc(100% / 3);

		&#customize {
			background-color: inherit;
			color: inherit;
			border: none;
		}

		&:hover {
			color: inherit;
			background-color: rgba(128, 128, 128, 0.2);
		}
	}

	.edit {
		cursor: pointer;

		position: fixed;
		z-index: 9999;
		bottom: 10px;
		right: 10px;
		background-color: inherit;
		border: none;
		color: blue;

		img {
			width: 50px;
		}
	}
</style>
