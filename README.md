# Svelte Cookie Consent

[![docs](https://img.shields.io/badge/DOCS-8A2BE)](https://svelte-cookie-consent.js.org/)
[![demo](https://img.shields.io/badge/DEMO-8A2BE2)](https://svelte-cookie-consent.js.org/demo/)
[![actions](https://github.com/SebaOfficial/svelte-cookie-consent/actions/workflows/publish.yml/badge.svg)](https://github.com/SebaOfficial/svelte-cookie-consent/actions/workflows/publish.yml) [![SvelteKit](https://img.shields.io/badge/svelte-kit-orange.svg)](https://kit.svelte.dev) [![Svelte v5](https://img.shields.io/badge/svelte-v5-blueviolet.svg)](https://svelte.dev)

A production-ready GDPR compliant cookie consent that allows developers to customize selections.

## Features

- Small, discrete, and non-intrusive;
- GDPR Compliant;
- Support for predefined choices (`necessary`, `marketing`, etc.)
- Multiple consents (box, banner, ...)
- Responsive;
- Runs any function on opting-in or opting-out (_even on each visit_)
- Svelte Ready
- Fully customizable

## Installation

### Via npm

```shell
npm install -D svelte-cookie-consent
```

### Via CDN

```html
<script
   type="module"
   src="https://unpkg.com/svelte-cookie-consent@latest/dist/cookie-consent.js"
></script>
```

## Usage

Check out the [documentation](https://svelte-cookie-consent.js.org) for a list of the available props.

### Svelte / SvelteKit

```svelte
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
```

### HTML / Web Components

```html
<cookie-banner
   heading="GDPR Notice"
   description="We use cookies to offer a better browsing experience, analyze site traffic, personalize content, and serve targeted advertisements. By clicking accept, you consent to our privacy policy & use of cookies."
   acceptAllLabel="Accept All"
   rejectAllLabel="Reject All"
   cookie='{
    "name": "gdpr-cookie",
    "path": "/",
    "secure": true,
    "sameSite": "strict"
   }'
   customize='{
    "label": "Customize",
    "chooseLabel": "Choose Which Cookies To Enable",
    "confirmLabel": "Confirm My Choices"
   }'
></cookie-banner>
```

## Fingerprinting

Accepting analytics or tracking cookies will create a unique UUID to allow you to differentiate events from different users when using server-side cookies in a system such as CAPI.

To enable fingerprinting you must have a configuration like this or use the default one (_which is already GDPR compliant_):

```svelte
<CookieBox fingerprinting={true} />
<!-- OR -->
<CookieBox
   fingerprinting={{
      uuid: 'a-unique-user-identifier',
      cookie: {
         name: 'fingerprint',
         path: '/',
         secure: true,
         sameSite: 'strict',
      },
   }}
/>
```
