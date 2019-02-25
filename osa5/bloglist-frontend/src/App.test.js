import React from 'react'
import { render, waitForElement } from 'react-testing-library'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  it('renders no blogs it gets from backend before user has logged in', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(() => component.getByText('log in'))

    expect(component.container).toHaveTextContent('log in to application')
    expect(component.container).toHaveTextContent('username')
    expect(component.container).toHaveTextContent('password')
    expect(component.container).not.toHaveTextContent('React patterns')
    expect(component.container).not.toHaveTextContent('Michael Chan')

  })

  it('renders all content it gets from backend after use has logged in', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Teuvo Testaaja'
    }

    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement(() => component.container.querySelectorAll('.blog'))

    expect(component.container).not.toHaveTextContent('log in to application')
    expect(component.container).toHaveTextContent('React patterns')
    expect(component.container).toHaveTextContent('Michael Chan')
    expect(component.container).toHaveTextContent('Go To Statement Considered Harmful')
    expect(component.container).toHaveTextContent('Edsger W. Dijkstra')
    expect(component.container).toHaveTextContent('Canonical string reduction')
  })
})