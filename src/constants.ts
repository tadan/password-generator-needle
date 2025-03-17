export const SLIDER_CONFIG = {
  MIN_LENGTH: 4,
  MAX_LENGTH: 32,
  DEFAULT_LENGTH: 12,
  ARIA_LABEL: 'Password Length',
};

// Default state for password options
export const DEFAULT_PASSWORD_OPTIONS = {
  MIN_LENGTH: 4,
  MAX_LENGTH: 20,
  length: SLIDER_CONFIG.DEFAULT_LENGTH,
  includeUppercase: true,
  includeLowercase: true,
  includeSymbols: false,
};

export const UI_TEXT = {
  TITLE: 'Password Generator',
  GENERATE_BUTTON: 'Generate',
  COPY_BUTTON: 'Copy',
  COPIED_MESSAGE: 'Copied!',
  PASSWORD_LENGTH_LABEL: 'Password Length:',
  INCLUDE_UPPERCASE: 'Include Uppercase Letters',
  INCLUDE_LOWERCASE: 'Include Lowercase Letters',
  INCLUDE_NUMBERS: 'Include Numbers',
  INCLUDE_SYMBOLS: 'Include Symbols',
};
