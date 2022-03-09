import '@testing-library/jest-dom'

import { render } from '@testing-library/react'

import { App } from './App'

describe('<App />', () => {
  it('renders without errors', () => {
    render(<App />)
  })
  it('Finder header text', () => {
    const screen = render(<App />)
    const titleText = screen.getByText(/Easily generate a report of your transactions/i)
    expect(titleText).toBeInTheDocument()
  })
})
