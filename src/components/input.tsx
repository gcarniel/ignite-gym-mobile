import { Input as GluestackInput, InputField } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

interface InputProps extends ComponentProps<typeof InputField> {}

export function Input({ ...props }: InputProps) {
  return (
    <GluestackInput
      bg="$gray700"
      h="$14"
      px="$4"
      borderColor="$gray600"
      borderRadius="$md"
      $focus={{
        borderColor: '$green600',
      }}
    >
      <InputField
        color="$white"
        fontFamily="$body"
        placeholderTextColor="$gray300"
        {...props}
      />
    </GluestackInput>
  )
}
