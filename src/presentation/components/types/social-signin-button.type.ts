export type SocialSigninButtonProps = {
  /** Type of the social login button (e.g., google, facebook) */
  type: 'google' | 'facebook';
  /** Type of the social login button (e.g., google, facebook) */
  className?: string;
  /** Callback function triggered when the button is clicked */
  onClick?: () => void;
};
