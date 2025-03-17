// components/Slider/Slider.test.tsx - Fixed
import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import CustomSlider from './CustomSlider';

describe('Slider Component', () => {
  // Setup mock for getBoundingClientRect
  const setupMockTrack = () => {
    // Mock getBoundingClientRect to return fixed dimensions
    const mockTrack = screen.getByTestId('slider-track');
    if (mockTrack) {
      jest.spyOn(mockTrack, 'getBoundingClientRect').mockImplementation(() => ({
        width: 200,
        height: 6,
        top: 100,
        left: 100,
        right: 300,
        bottom: 106,
        x: 100,
        y: 100,
        toJSON: () => {},
      }));
      return mockTrack;
    }
    return null;
  };

  // Clean up after each test
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  // Basic rendering test
  test('renders with correct initial value', () => {
    const handleChange = jest.fn();
    render(
      <CustomSlider min={0} max={100} value={50} onChange={handleChange} ariaLabel="Test Slider" />,
    );

    // Check if slider element exists with correct attributes
    const sliderThumb = screen.getByRole('slider');
    expect(sliderThumb).toBeInTheDocument();
    expect(sliderThumb).toHaveAttribute('aria-valuenow', '50');
    expect(sliderThumb).toHaveAttribute('aria-valuemin', '0');
    expect(sliderThumb).toHaveAttribute('aria-valuemax', '100');
    expect(sliderThumb).toHaveAttribute('aria-label', 'Test Slider');
  });

  // Test disabled state
  test('disables slider when disabled prop is true', () => {
    const handleChange = jest.fn();
    render(<CustomSlider min={0} max={100} value={50} onChange={handleChange} disabled={true} />);

    // Check if slider is disabled (has tabIndex -1)
    const sliderThumb = screen.getByRole('slider');
    expect(sliderThumb).toHaveAttribute('tabIndex', '-1');

    // Find the container element instead of the thumb
    const sliderContainer = screen.getByRole('slider').closest('.slider');
    expect(sliderContainer).toHaveClass('slider--disabled');
  });

  // Test keyboard interaction
  test('responds to keyboard navigation', () => {
    const handleChange = jest.fn();
    render(<CustomSlider min={0} max={100} value={50} onChange={handleChange} />);

    const sliderThumb = screen.getByRole('slider');

    // Arrow right should increase value by 1
    fireEvent.keyDown(sliderThumb, { key: 'ArrowRight' });
    expect(handleChange).toHaveBeenCalledWith(51);

    // Reset mock
    handleChange.mockClear();

    // Arrow left should decrease value by 1
    fireEvent.keyDown(sliderThumb, { key: 'ArrowLeft' });
    expect(handleChange).toHaveBeenCalledWith(49);

    // Reset mock
    handleChange.mockClear();

    // Home should set to min value
    fireEvent.keyDown(sliderThumb, { key: 'Home' });
    expect(handleChange).toHaveBeenCalledWith(0);

    // Reset mock
    handleChange.mockClear();

    // End should set to max value
    fireEvent.keyDown(sliderThumb, { key: 'End' });
    expect(handleChange).toHaveBeenCalledWith(100);
  });

  // Test mouse interaction
  test('updates value on track click', () => {
    const handleChange = jest.fn();

    // Render component first
    render(<CustomSlider min={0} max={100} value={50} onChange={handleChange} />);

    // Then set up mock after component is rendered
    const mockTrack = setupMockTrack();
    expect(mockTrack).not.toBeNull();

    // Simulate click at 25% of track
    fireEvent.click(mockTrack!, { clientX: 150 });
    expect(handleChange).toHaveBeenCalledWith(25);

    // Simulate click at 75% of track
    fireEvent.click(mockTrack!, { clientX: 250 });
    expect(handleChange).toHaveBeenCalledWith(75);
  });

  // Test drag operation
  test('handles mouse drag operations', () => {
    const handleChange = jest.fn();
    render(<CustomSlider min={0} max={100} value={50} onChange={handleChange} />);

    const sliderThumb = screen.getByRole('slider');
    const mockTrack = setupMockTrack();
    expect(mockTrack).not.toBeNull();

    // Start drag
    fireEvent.mouseDown(sliderThumb);

    // Simulate drag to 25% position
    fireEvent.mouseMove(document, { clientX: 150 });
    expect(handleChange).toHaveBeenCalledWith(25);

    // Simulate drag to 75% position
    fireEvent.mouseMove(document, { clientX: 250 });
    expect(handleChange).toHaveBeenCalledWith(75);

    // End drag
    fireEvent.mouseUp(document);

    // Movement after mouseUp should not trigger onChange
    handleChange.mockClear();
    fireEvent.mouseMove(document, { clientX: 200 });
    expect(handleChange).not.toHaveBeenCalled();
  });

  // Test edge cases - Split into two separate tests
  test('constrains values at maximum boundary', () => {
    const handleChange = jest.fn();

    // Test max boundary
    render(<CustomSlider min={0} max={100} value={100} onChange={handleChange} />);
    const maxSliderThumb = screen.getByRole('slider');

    // Try to increase beyond max
    fireEvent.keyDown(maxSliderThumb, { key: 'ArrowRight' });
    expect(handleChange).not.toHaveBeenCalled(); // Value already at max
  });

  test('constrains values at minimum boundary', () => {
    const handleChange = jest.fn();

    // Test min boundary
    render(<CustomSlider min={0} max={100} value={0} onChange={handleChange} />);
    const minSliderThumb = screen.getByRole('slider');

    // Try to decrease below min
    fireEvent.keyDown(minSliderThumb, { key: 'ArrowLeft' });
    expect(handleChange).not.toHaveBeenCalled(); // Value already at min
  });

  test('handles Home and End keys correctly', () => {
    const handleChange = jest.fn();

    render(<CustomSlider min={0} max={100} value={50} onChange={handleChange} />);
    const sliderThumb = screen.getByRole('slider');

    // Home key should set to min value
    fireEvent.keyDown(sliderThumb, { key: 'Home' });
    expect(handleChange).toHaveBeenCalledWith(0);

    // Clear mock
    handleChange.mockClear();

    // End key should set to max value
    fireEvent.keyDown(sliderThumb, { key: 'End' });
    expect(handleChange).toHaveBeenCalledWith(100);
  });
});
