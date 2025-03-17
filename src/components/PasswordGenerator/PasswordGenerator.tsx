// components/PasswordGenerator/PasswordGenerator.tsx
import React, { useState, useCallback } from 'react';
import { Button, Checkbox, TextInput, toast, Toaster, ClipboardButton } from '@neo4j-ndl/react';

// Import our custom Slider
import CustomSlider from '../CustomSlider/CustomSlider';
import './PasswordGenerator.css';
import { PasswordGeneratorProps } from '../../types';

// Import our password utilities
import { generatePassword, isVulnerablePassword } from '../../passwordUtils';
import { DEFAULT_PASSWORD_OPTIONS, UI_TEXT } from '../../constants';

const PasswordGenerator: React.FC<PasswordGeneratorProps> = ({
  minLength = DEFAULT_PASSWORD_OPTIONS.MIN_LENGTH,
  maxLength = DEFAULT_PASSWORD_OPTIONS.MAX_LENGTH,
  defaultLength = DEFAULT_PASSWORD_OPTIONS.length,
}) => {
  // Password options state
  const [passwordLength, setPasswordLength] = useState(defaultLength);
  const [includeUppercase, setIncludeUppercase] = useState(
    DEFAULT_PASSWORD_OPTIONS.includeUppercase,
  );
  const [includeLowercase, setIncludeLowercase] = useState(
    DEFAULT_PASSWORD_OPTIONS.includeLowercase,
  );
  const [includeSymbols, setIncludeSymbols] = useState(DEFAULT_PASSWORD_OPTIONS.includeSymbols);
  const [password, setPassword] = useState('');

  // Generate a password based on the current options
  const handleGeneratePassword = useCallback(() => {
    // Check if the password might be vulnerable
    if (isVulnerablePassword(passwordLength, includeUppercase, includeLowercase, includeSymbols)) {
      // Show toast warning for vulnerable password
      toast.danger('Vulnerable password, please use it carefully', {
        shouldAutoClose: true,
        isCloseable: true,
      });
    }

    // Generate the password using our utility
    const newPassword = generatePassword(
      passwordLength,
      includeUppercase,
      includeLowercase,
      includeSymbols,
    );

    setPassword(newPassword);
  }, [passwordLength, includeUppercase, includeLowercase, includeSymbols]);

  // Handle slider value change
  const handleLengthChange = useCallback((newLength: number) => {
    setPasswordLength(newLength);
  }, []);

  // Handle checkbox changes
  const handleUppercaseChange = useCallback(() => {
    setIncludeUppercase((prev) => !prev);
  }, []);

  const handleLowercaseChange = useCallback(() => {
    setIncludeLowercase((prev) => !prev);
  }, []);

  const handleSymbolsChange = useCallback(() => {
    setIncludeSymbols((prev) => !prev);
  }, []);

  return (
    <div className="password-generator-card">
      <Toaster />
      <div className="password-generator__container">
        <span className="password-generator__header">{UI_TEXT.TITLE}</span>

        <div className="password-generator__password-section">
          <div className="password-generator__input-wrapper">
            <span className="password-generator__label">{UI_TEXT.PASSWORD_LENGTH_LABEL}</span>
            <TextInput
              className="password-generator__input"
              value={password}
              isReadOnly={true}
              placeholder='Click "Generate" to start'
              size="medium"
              htmlAttributes={{
                'aria-label': UI_TEXT.PASSWORD_LENGTH_LABEL,
              }}
            />
          </div>
          <div className="password-generator__copy-button">
            <ClipboardButton
              textToCopy={password}
              htmlAttributes={{
                'aria-label': UI_TEXT.COPY_BUTTON,
              }}
            />
          </div>
        </div>

        <div className="password-generator__slider-section">
          <div className="password-generator__slider-header">
            <span className="password-generator__slider-title">
              {UI_TEXT.PASSWORD_LENGTH_LABEL}
            </span>
            <span className="password-generator__slider-value">{passwordLength}</span>
          </div>
          <CustomSlider
            min={minLength}
            max={maxLength}
            value={passwordLength}
            onChange={handleLengthChange}
            ariaLabel={UI_TEXT.PASSWORD_LENGTH_LABEL}
          />
        </div>

        <div className="password-generator__options-section">
          <Checkbox
            isChecked={includeUppercase}
            onClick={handleUppercaseChange}
            label={UI_TEXT.INCLUDE_UPPERCASE}
            htmlAttributes={{
              'aria-label': UI_TEXT.INCLUDE_UPPERCASE,
            }}
          />

          <Checkbox
            isChecked={includeLowercase}
            onClick={handleLowercaseChange}
            label={UI_TEXT.INCLUDE_LOWERCASE}
            htmlAttributes={{
              'aria-label': UI_TEXT.INCLUDE_LOWERCASE,
            }}
          />

          <Checkbox
            isChecked={includeSymbols}
            onClick={handleSymbolsChange}
            label={UI_TEXT.INCLUDE_SYMBOLS}
            htmlAttributes={{
              'aria-label': UI_TEXT.INCLUDE_SYMBOLS,
            }}
          />
        </div>

        <div className="password-generator__generate-button-container">
          <Button
            onClick={handleGeneratePassword}
            fill="filled"
            size="medium"
            className="password-generator__generate-button"
          >
            {UI_TEXT.GENERATE_BUTTON}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
