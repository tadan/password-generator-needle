/**
 * Password generation utility functions
 */

// Character sets for password generation
export const CHAR_SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

/**
 * Shuffle a string randomly
 * @param str - String to shuffle
 * @returns Shuffled string
 */
export const shuffleString = (str: string): string => {
  const array = str.split('');
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.join('');
};

/**
 * Check if a password might be vulnerable
 * @param length - Password length
 * @param includeUppercase - Whether to include uppercase letters
 * @param includeLowercase - Whether to include lowercase letters
 * @param includeSymbols - Whether to include symbols
 * @returns Whether the password might be vulnerable
 */
export const isVulnerablePassword = (
  length: number,
  includeUppercase: boolean,
  includeLowercase: boolean,
  includeSymbols: boolean,
): boolean => {
  return (!includeUppercase && !includeLowercase && !includeSymbols) || length < 8;
};

/**
 * Generate a password based on the given options
 * @param length - Password length
 * @param includeUppercase - Whether to include uppercase letters
 * @param includeLowercase - Whether to include lowercase letters
 * @param includeSymbols - Whether to include symbols
 * @returns Generated password string
 */
export const generatePassword = (
  length: number,
  includeUppercase: boolean,
  includeLowercase: boolean,
  includeSymbols: boolean,
): string => {
  // Create an array of character sets to use
  const charSets: string[] = [];
  if (includeUppercase) charSets.push(CHAR_SETS.uppercase);
  if (includeLowercase) charSets.push(CHAR_SETS.lowercase);
  charSets.push(CHAR_SETS.numbers); // Always include numbers
  if (includeSymbols) charSets.push(CHAR_SETS.symbols);

  // Start with one character from each selected set to ensure all types are included
  let newPassword = '';
  charSets.forEach((set) => {
    const randomIndex = Math.floor(Math.random() * set.length);
    newPassword += set[randomIndex];
  });

  // Combine all character sets for remaining length
  const availableChars = charSets.join('');

  // Fill the rest of the password length
  for (let i = newPassword.length; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * availableChars.length);
    newPassword += availableChars[randomIndex];
  }

  // Shuffle the password to avoid predictable patterns from our algorithm
  return shuffleString(newPassword);
};
