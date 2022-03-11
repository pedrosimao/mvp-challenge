import '@testing-library/jest-dom'

import { fireEvent } from '@testing-library/dom'
import { act } from 'react-dom/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { wrappedRender } from 'src/utils/testing'

import { DateButton } from './index'

describe('<DateButton />', () => {
  it('renders without errors', () => {
    wrappedRender(<DateButton />)
  })

  it('has the correct placeholder text', () => {
    const screen = wrappedRender(<DateButton placeholderText="My Name" />)
    const titleText = screen.getByRole('button')
    expect(titleText).toHaveTextContent('My Name')
  })

  it('can be clicked', () => {
    const handleClick = vi.fn()
    const screen = wrappedRender(<DateButton onClick={handleClick} />)
    act(() => {
      fireEvent.click(screen.getByRole('button'))
    })
    expect(handleClick).toHaveBeenCalled()
  })

  it('can choose date', () => {
    const handleDateChange = vi.fn()
    const button = wrappedRender(<DateButton onChangeDate={handleDateChange} />)
    act(() => {
      fireEvent.click(button.getByRole('button'))
    })
    const dateOption = button.getByText('12')
    expect(dateOption).toBeInTheDocument()

    act(() => {
      fireEvent.click(dateOption)
    })
    expect(handleDateChange).toHaveBeenCalled()
  })
})
