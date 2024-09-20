import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  Input as GluestackInput,
  InputField,
} from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

interface InputProps extends ComponentProps<typeof InputField> {
  isReadOnly?: boolean
  errorMessage?: string | null
  isInvalid?: boolean
  isDisabled?: boolean
}

export function Input({
  isReadOnly = false,
  errorMessage = null,
  isInvalid = false,
  isDisabled = false,
  ...props
}: InputProps) {
  const invalid = !!errorMessage || isInvalid
  return (
    <FormControl isInvalid={invalid} mb="$4" w="$full">
      <GluestackInput
        h="$14"
        borderWidth="$0"
        borderRadius="$md"
        isReadOnly={isReadOnly}
        opacity={isReadOnly ? 0.5 : 1}
        isInvalid={invalid}
        $focus={{
          borderWidth: 1,
          borderColor: invalid ? '$red500' : '$green500',
        }}
        $invalid={{
          borderWidth: 1,
          borderColor: '$red500',
        }}
        isDisabled={isDisabled}
        $disabled={{
          opacity: 0.5,
        }}
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

      <FormControlError>
        <FormControlErrorText color="$red500">
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}
