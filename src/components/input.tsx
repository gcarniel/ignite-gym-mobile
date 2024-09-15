import { Input as GluestackInput, InputField } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

interface InputProps extends ComponentProps<typeof InputField> {
  isReadOnly?: boolean
}

export function Input({ isReadOnly = false, ...props }: InputProps) {
  return (
    <GluestackInput
      h="$14"
      borderColor="$gray600"
      borderRadius="$md"
      $focus={{
        borderColor: '$green600',
      }}
      isReadOnly={isReadOnly}
      opacity={isReadOnly ? 0.5 : 1}
    >
      <InputField
        px="$4"
        bg="$gray700"
        color="$white"
        fontFamily="$body"
        placeholderTextColor="$gray300"
        {...props}
      />
    </GluestackInput>
  )
}
