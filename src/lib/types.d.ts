export type SuggestedChoices = 'necessary' | 'tracking' | 'analytics' | 'marketing';
export type Choices = Record<
	SuggestedChoices | string,
	{
		/**
		 * The name of the option that the user will see.
		 */
		label: string;

		/**
		 * The description of the option that the user will see.
		 * You can use HTML
		 */
		description: string;

		/**
		 * If set to true the user won't be able to reject this option.
		 */
		mandatory?: boolean;
		/**
		 * The default value if the user doesn't specify their choice.
		 * Will contain the actual value of the cookie
		 */
		value?: boolean;

		/**
		 * Callback function to pass when the cookie is accepted.
		 */
		onAccepted?: () => void | Promise<void>;

		/**
		 * Callback function to pass when the cookie is rejected.
		 */
		onRejected?: () => void | Promise<void>;
	}
>;

export type CookieConfig = {
	name: string;
	path: string;
	domain?: string;
	expiration?: number | Date;
	secure?: boolean;
	sameSite?: 'strict' | 'lax' | 'none';
};

export type FingerprintingConfig = {
	/**
	 * A Unique User ID used for server-side tracking.
	 * If not provided a random one will be generated
	 */
	uuid?: string;

	/**
	 * The cookie configuration.
	 * If provided a new cookie will be created.
	 */
	cookie?: CookieConfig;
};

export type Props = {
	/**
	 * Whether the banner is displayed or not to the user.
	 * Useful, for example, if you're in an iframe and there is no room to show the banner.
	 * If set to false all the default values will be used.
	 */
	visible?: boolean;

	/**
	 * The cookie configuration.
	 */
	cookie?: CookieConfig;

	/**
	 * The title of the popup
	 */
	heading?: string;

	/**
	 * The description of the popup
	 */
	description?: string;

	/**
	 * The label to accept all the cookies.
	 * Set this to false if you don't want the user to see it.
	 */
	acceptAllLabel?: string | false;

	/**
	 * The label to reject all the cookies.
	 * Set this to false if you don't want the user to see it.
	 */
	rejectAllLabel?: string | false;

	/**
	 * The label to customize the choices.
	 * Set this to false if you don't want the user to see it.
	 */
	customize?:
		| {
				label: string;
				chooseLabel: string;
				confirmLabel: string;
		  }
		| false;

	/**
	 * Whether the cookies are editable or not.
	 */
	editable?: boolean;

	/**
	 * The cookie choices given to the user.
	 */
	choices?: Choices;

	/**
	 * Enable fingerprinting.
	 * I
	 */
	fingerprinting?: boolean | FingerprintingConfig;

	/**
	 * The background color.
	 */
	bgColor?: string;

	/**
	 * The foreground color.
	 */
	fgColor?: string;
};
