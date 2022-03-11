import '@testing-library/jest-dom'

import { wrappedRender } from 'src/utils/testing'

import { NoReports } from './index'

describe('<NoReports />', () => {
  it('renders without errors', () => {
    wrappedRender(<NoReports />)
  })
  it('Header and description are correct', () => {
    const screen = wrappedRender(<NoReports description="here is a description" />)
    const titleText = screen.getByRole('heading', { level: 2 })
    expect(titleText).toHaveTextContent('No reports')

    const descriptionText = screen.getByText('here is a description')
    expect(descriptionText).toBeInTheDocument()
  })
})
