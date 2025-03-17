import React, { useRef, useState, useEffect, useCallback } from 'react';
import './CustomSlider.css';
import { SliderProps } from '../../types';
import { SLIDER_CONFIG } from '../../constants';
import { getValueFromPosition, normalizeValue, valueToPercent } from '../../sliderUtils';

export const CustomSlider: React.FC<SliderProps> = ({
  min = SLIDER_CONFIG.MIN_LENGTH,
  max = SLIDER_CONFIG.MAX_LENGTH,
  value = SLIDER_CONFIG.DEFAULT_LENGTH,
  onChange,
  ariaLabel = SLIDER_CONFIG.ARIA_LABEL,
  disabled = false,
}) => {
  // Hook to avoid rerendering the component
  const sliderRef = useRef<HTMLDivElement>(null);
  // State to keep track of dragging state
  const [isDragging, setIsDragging] = useState(false);

  // Calculate percentage for positioning the thumb
  const percentage = valueToPercent(value, min, max);

  // Handle mouse/touch interaction, triggered when user clicks on the thumb
  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    e.preventDefault(); // Prevent text selection
    setIsDragging(true);
  };

  // Handle track click
  const handleTrackClick = (e: React.MouseEvent) => {
    if (disabled) return;
    updateValue(e.clientX);
  };

  // Handle mouse up event, triggered when user releases the thumb
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Update value based on click/drag position
  const updateValue = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      // Calculate new value based on position
      let newValue = getValueFromPosition(clientX, rect, min, max);

      // Constrain value to min/max range
      newValue = normalizeValue(newValue, min, max);

      // Round to nearest integer if needed
      newValue = Math.round(newValue);

      // Call onChange only if value has changed
      if (newValue !== value) {
        onChange(newValue);
      }
    },
    [min, max, value, onChange],
  );
  // Handle mouse move event, triggered when user drags the thumb
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging && !disabled) {
        updateValue(e.clientX);
      }
    },
    [isDragging, disabled, updateValue],
  );
  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    let newValue = value;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        if (value < max) {
          newValue = Math.min(max, value + 1);
        } else {
          return; // Already at max, don't trigger onChange
        }
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        if (value > min) {
          newValue = Math.max(min, value - 1);
        } else {
          return; // Already at min, don't trigger onChange
        }
        break;
      case 'Home':
        newValue = min;
        break;
      case 'End':
        newValue = max;
        break;
      default:
        return;
    }

    if (newValue !== value) {
      onChange(newValue);
      e.preventDefault();
    }
  };

  // Set up and clean up event listeners
  useEffect(() => {
    // Only add listeners when dragging
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    // Clean up event listeners
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]); // Re-run effect when isDragging changes

  return (
    <div className={`slider ${disabled ? 'slider--disabled' : ''}`}>
      <div
        ref={sliderRef}
        className="slider__track"
        onClick={handleTrackClick}
        data-testid="slider-track"
      >
        <div className="slider__track-fill" style={{ width: `${percentage}%` }} />
      </div>
      <div
        className={`slider__thumb ${isDragging ? 'slider__thumb--dragging' : ''}`}
        style={{ left: `${percentage}%` }}
        onMouseDown={handleMouseDown}
        onKeyDown={handleKeyDown}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-label={ariaLabel}
        tabIndex={disabled ? -1 : 0}
      />
    </div>
  );
};

export default CustomSlider;
