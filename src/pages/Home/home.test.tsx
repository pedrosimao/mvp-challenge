import '@testing-library/jest-dom'

import { wrappedRender } from 'src/utils/testing'

import { HomePage } from './index'

describe('<App />', () => {
  it('renders without errors', () => {
    wrappedRender(<HomePage />)
  })
  it('Finder header text', () => {
    const screen = wrappedRender(<HomePage />)
    const titleText = screen.getByText(/Easily generate a report of your transactions/i)
    expect(titleText).toBeInTheDocument()
  })
})
