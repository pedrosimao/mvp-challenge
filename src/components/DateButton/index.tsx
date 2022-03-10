import { Button, ButtonProps } from '@chakra-ui/react'
import { FC, forwardRef, LegacyRef, useState } from 'react'

import { StyledDatePicker } from './styles'

export interface DateButtonProps extends ButtonProps {
  onChangeDate?: (date: Date | null) => void
  placeholderText?: string
}

export const DateButton: FC<DateButtonProps> = ({ placeholderText, onChangeDate, ...props }) => {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const CustomInput = forwardRef(
    (
      { value, onClick }: { value?: string; onClick?: () => void },
      ref: LegacyRef<HTMLButtonElement> | undefined,
    ) => (
      <Button onClick={onClick} ref={ref} {...props}>
        {value || placeholderText}
      </Button>
    ),
  )
  CustomInput.displayName = 'CustomDateButton'
  return (
    <StyledDatePicker
      selected={startDate}
      onChange={(date) => {
        // @ts-ignore Todo: fix this typing
        setStartDate(date)
        // @ts-ignore Todo: fix this typing
        if (onChangeDate) onChangeDate(date)
      }}
      customInput={<CustomInput />}
    />
  )
}
