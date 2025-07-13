<script lang="ts">
	import { CookieBox } from '$lib/index.js';

	const choices = $state({
		necessary: {
			label: 'Necessary cookies',
			description: "Used for cookie control. Can't be turned off.",
			value: true,
			mandatory: true,
		},
		tracking: {
			label: 'Tracking cookies',
			description: 'Used for advertising purposes.',
			value: true,
		},
		analytics: {
			label: 'Analytics cookies',
			description: 'Used to control Analytics.',
			value: true,
		},
		marketing: {
			label: 'Marketing cookies',
			description: 'Used for marketing data.',
			value: true,
		},
	});
</script>

<h1>Demo</h1>

<CookieBox
	cookie={{
		name: 'gdpr-cookie',
		path: '/',
		secure: true,
		sameSite: 'strict',
	}}
	heading="GDPR Notice"
	description="We use cookies to offer a better browsing experience, analyze site traffic, personalize content, and serve targeted advertisements. By clicking accept, you consent to our privacy policy & use of cookies."
	acceptAllLabel="Accept All"
	rejectAllLabel="Reject All"
	customize={{
		label: 'Customize',
		chooseLabel: 'Choose Wich Cookies To Enable',
		confirmLabel: 'Confirm My Choices',
	}}
	{choices}
/>
