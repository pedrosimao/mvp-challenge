import '@testing-library/jest-dom'

import { wrappedRender } from 'src/utils/testing'

import { App } from './App'

describe('<App />', () => {
  it('renders without errors', () => {
    wrappedRender(<App />)
  })
  it('Finder header text', () => {
    const screen = wrappedRender(<App />)
    const titleText = screen.getByText(/Easily generate a report of your transactions/i)
    expect(titleText).toBeInTheDocument()
  })
})
