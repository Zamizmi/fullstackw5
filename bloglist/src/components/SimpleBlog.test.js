import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.skip('<SimpleBlog />', () => {

  const simpleBlog = {
    title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
    author: 'Turun Murre',
    url: 'www.koo',
    likes: 5
  }

  const simpleBlogComponent = shallow(<SimpleBlog blog={simpleBlog} />)

  it('renders title', () => {
    const titleDiv = simpleBlogComponent.find('.title')
    expect(titleDiv.text()).toContain(simpleBlog.title)

  })

  it('renders author', () => {
    const authorDiv = simpleBlogComponent.find('.author')
    expect(authorDiv.text()).toContain(simpleBlog.author)

  })

  it('renders likes', () => {
    const likesDiv = simpleBlogComponent.find('.likes')
    expect(likesDiv.text()).toContain(simpleBlog.likes.toString())
  })

  it('clicking the like button calls event handler once', () => {

  const mockHandler = jest.fn()

  const blogComponent = shallow(
  <SimpleBlog
    blog={simpleBlog}
    onClick={mockHandler}
  />
)


  const button = blogComponent.find('button')
  button.simulate('click')
  button.simulate('click')

  expect(mockHandler.mock.calls.length).toBe(2)
})
})
