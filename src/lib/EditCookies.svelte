<script lang="ts">
	import Cookie from './cookie.svg';
	import type { CookiePosition } from './types.js';

	const { onclick, position }: { onclick: () => void; position: CookiePosition } = $props();
</script>

<button class="edit" {onclick} class:right={position === 'right'} class:left={position === 'left'}>
	<img src={Cookie} alt="Edit Cookies" width="50px" height="50px" />
</button>

<style lang="scss">
	.edit {
		position: fixed;
		z-index: 9999;
		cursor: pointer;
		bottom: 10px;
		background-color: inherit;
		border: none;

		&.right {
			right: 1vw;
			margin-left: 1vw;
		}

		&.left {
			left: 1vw;
			margin-right: 1vw;
		}

		img {
			width: 50px;
		}
	}
</style>
