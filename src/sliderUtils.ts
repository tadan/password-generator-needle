/**
 * Normalize a value to ensure it falls within a specified range
 * @param value - The value to normalize
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @returns Normalized value within the specified range
 */
export const normalizeValue = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

/**
 * Convert a value to its percentage representation within a range
 * @param value - Current value
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Percentage (0-100)
 */
export const valueToPercent = (value: number, min: number, max: number): number => {
  return ((value - min) / (max - min)) * 100;
};

/**
 * Convert a percentage to its corresponding value within a range
 * @param percent - Percentage (0-100)
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Value corresponding to the percentage
 */
export const percentToValue = (percent: number, min: number, max: number): number => {
  return min + (percent / 100) * (max - min);
};

/**
 * Calculate slider value from mouse/touch position
 * @param clientX - Client X coordinate
 * @param rect - DOMRect of the slider element
 * @param min - Minimum slider value
 * @param max - Maximum slider value
 * @returns Calculated value based on position
 */
export const getValueFromPosition = (
  clientX: number,
  rect: DOMRect,
  min: number,
  max: number,
): number => {
  const sliderWidth = rect.width;
  const position = clientX - rect.left;
  const percentage = Math.max(0, Math.min(100, (position / sliderWidth) * 100));
  return percentToValue(percentage, min, max);
};
