import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Blog from './Blog'


const user = {
  name: 'testUser'
}

const blog = {
  title: 'First class tests',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
  likes: 10,
  user: { name: 'testUser' }
}

test('renders only title and author without clicking', async () => {
  const component = render(
    <Blog blog={blog} user={user} />
  )

  const notDetailed = component.container.querySelector('.blogWithoutDetails')
  expect(notDetailed).toHaveTextContent('First class tests')
  expect(notDetailed).toHaveTextContent('Robert C. Martin')
  expect(notDetailed).not.toHaveTextContent('http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html')
  expect(notDetailed).not.toHaveTextContent('10 likes')
})

test('renders all content after clicking', async () => {
  const component = render(
    <Blog blog={blog} user={user} />
  )

  fireEvent.click(component.container.querySelector('.clickShowDetails'))
  const detailed = component.container.querySelector('.blogWithDetails')
  expect(detailed).toHaveTextContent('First class tests')
  expect(detailed).toHaveTextContent('Robert C. Martin')
  expect(detailed).toHaveTextContent('http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html')
  expect(detailed).toHaveTextContent('10 likes')
})