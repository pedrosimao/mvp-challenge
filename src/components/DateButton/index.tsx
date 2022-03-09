import { Button, ButtonProps } from '@chakra-ui/react'
import { FC, forwardRef, LegacyRef, useState } from 'react'

import { StyledDatePicker } from './styles'

export interface DateButtonProps extends ButtonProps {
  onChangeDate?: (date: Date | [Date | null, Date | null] | null) => void
}

export const DateButton: FC<DateButtonProps> = ({ onChangeDate, ...props }) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const CustomInput = forwardRef(
    (
      { value, onClick }: { value?: string; onClick?: () => void },
      ref: LegacyRef<HTMLButtonElement> | undefined,
    ) => (
      <Button onClick={onClick} ref={ref} {...props}>
        {value}
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
        if (onChangeDate) onChangeDate(date)
      }}
      customInput={<CustomInput />}
    />
  )
}
