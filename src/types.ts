//centralised type definitions here
// SliderProps, PasswordOptions
export interface SliderProps {
    min: number
    max: number
    value: number
    onChange: (value: number) => void
    ariaLabel?: string
    disabled?: boolean
}

export interface PasswordGeneratorProps {
    minLength?: number
    maxLength?: number
    defaultLength?: number
}
