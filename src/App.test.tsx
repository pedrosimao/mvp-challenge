import '@testing-library/jest-dom'

import { render } from '@testing-library/react'

import { App } from './App'

describe('<App />', () => {
  it('renders without errors', () => {
    render(<App />)
  })
  it('renders without errors', () => {
    const screen = render(<App />)
    const titleText = screen.getByText(/Hello Vite/i)
    expect(titleText).toBeInTheDocument()
  })
})
