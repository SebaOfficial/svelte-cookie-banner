/**
 * The predefined categories of cookie choices that can be offered to users.
 */
export type SuggestedChoices = 'necessary' | 'tracking' | 'analytics' | 'marketing';

/**
 * A cookie choice given to the user
 */
export type Choice = {
	/**
	 * The display name of the option shown to the user.
	 */
	label: string;

	/**
	 * A description of the option, shown to the user.
	 * HTML is supported.
	 */
	description: string;

	/**
	 * If true, this option cannot be declined by the user.
	 */
	mandatory?: boolean;

	/**
	 * The default selection state of this option.
	 * If not provided, it will be considered unselected by default.
	 */
	value?: boolean;

	/**
	 * Callback function executed when the user accepts this option.
	 * Can be asynchronous.
	 */
	onAccepted?: () => void | Promise<void>;

	/**
	 * Callback function executed when the user rejects this option.
	 * Can be asynchronous.
	 */
	onRejected?: () => void | Promise<void>;
};

/**
 * A map of cookie choice keys to their configuration objects.
 * You can use the predefined `SuggestedChoices` or define your own custom keys.
 */
export type Choices = Record<SuggestedChoices | (string & {}), Choice>;

/**
 * Configuration options for setting a cookie.
 */
export type CookieConfig = {
	/**
	 * The name of the cookie.
	 */
	name: string;

	/**
	 * The path attribute of the cookie.
	 */
	path: string;

	/**
	 * The domain attribute of the cookie.
	 */
	domain?: string;

	/**
	 * The expiration date of the cookie.
	 * Can be specified as a number (in days) or a specific Date.
	 */
	expiration?: number | Date;

	/**
	 * If true, the cookie will only be transmitted over secure protocols (HTTPS).
	 */
	secure?: boolean;

	/**
	 * The SameSite attribute to control cross-site request behavior.
	 */
	sameSite?: 'strict' | 'lax' | 'none';
};

/**
 * Configuration for fingerprinting-based tracking.
 */
export type FingerprintingConfig = {
	/**
	 * A unique user identifier used for server-side tracking.
	 * If not provided, a random UUID will be generated.
	 */
	uuid?: string;

	/**
	 * Configuration for the cookie that stores the UUID.
	 * If provided, the cookie will be created.
	 * If not provided, it will be stored inside the other cookie.
	 */
	cookie?: CookieConfig;
};

export type CookiePosition = 'left' | 'right';

export type BaseProps = {
	/**
	 * A map of cookie choices that the user can accept or reject.
	 */
	choices: Choices;

	/**
	 * Global cookie configuration.
	 */
	cookie: CookieConfig;

	/**
	 * The title displayed on the cookie consent popup.
	 * You can use HTML.
	 */
	heading: string;

	/**
	 * A description shown in the popup.
	 * You can use HTML.
	 */
	description: string;

	/**
	 * Configuration for the "Customize" option in the banner.
	 * Set to `false` to hide this section.
	 */
	customize:
		| {
				/**
				 * Label for the "Customize" button.
				 */
				label: string;

				/**
				 * Label shown on the choice selection screen.
				 */
				chooseLabel: string;

				/**
				 * Label for confirming selected cookie preferences.
				 */
				confirmLabel: string;
		  }
		| false;

	/**
	 * If true, users will be able to change their cookie choices after their initial selection.
	 * @default true
	 */
	editable?: boolean;

	/**
	 * Enables fingerprinting.
	 * Can be a boolean or detailed configuration.
	 * @default false
	 */
	fingerprinting?: boolean | FingerprintingConfig;

	/**
	 * The popup absolute position.
	 * @default "right"
	 */
	position?: CookiePosition;

	/**
	 * Background color of the banner.
	 * @default "#000000"
	 */
	bgColor?: string;

	/**
	 * Foreground (text) color of the banner.
	 * @default "#ffffff"
	 */
	fgColor?: string;
};

/**
 * Props common to every cookie consent.
 */
export type CommonProps = BaseProps & {
	/**
	 * Label for the "Accept All" button.
	 * Set to `false` to hide this button.
	 */
	acceptAllLabel: string;

	/**
	 * Label for the "Reject All" button.
	 * Set to `false` to hide this button.
	 */
	rejectAllLabel: string | false;
};
