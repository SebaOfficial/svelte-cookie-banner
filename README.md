# Svelte Cookie Banner

[![demo](https://img.shields.io/badge/DEMO-8A2BE2)](https://sebaofficial.github.io/svelte-cookie-banner/)
[![actions](https://github.com/SebaOfficial/svelte-cookie-banner/actions/workflows/publish.yml/badge.svg)](https://github.com/SebaOfficial/svelte-cookie-banner/actions/workflows/publish.yml) [![SvelteKit](https://img.shields.io/badge/svelte-kit-orange.svg)](https://kit.svelte.dev) [![Svelte v5](https://img.shields.io/badge/svelte-v5-blueviolet.svg)](https://svelte.dev)

A production-ready GDPR compliant banner that allows developers to customize selections.

## Features

- Small, discrete, and non-intrusive;
- GDPR Compliant;
- Support for predefined choices (`necessary`, `marketing`, etc.)
- Responsive;
- Runs any function on opting-in or opting-out (_even on each visit_)
- Svelte Ready
- Fully customizable

## Installation

### Via npm

```shell
npm install -D svelte-cookie-banner
```

### Via CDN

```html
<script
   type="module"
   src="https://unpkg.com/svelte-cookie-banner@latest/dist/cookie-banner.js"
></script>
```

## Usage

### Svelte / SvelteKit

```svelte
<script>
   import CookieBanner from 'svelte-cookie-banner';
</script>

<CookieBanner heading="foo" description="bar" />
```

### HTML / Web Components

```html
<cookie-banner heading="foo" description="bar"></cookie-banner>
```

## Fingerprinting

Accepting analytics or tracking cookies will create a unique UUID to allow you to differentiate events from different users when using server-side cookies in a system such as CAPI.

To enable fingerprinting you must have a configuration like this or use the default one (_which is already GDPR compliant_):

```svelte
<CookieBanner
   choices={{
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
   }}
   fingerprinting={true}
/>
```
