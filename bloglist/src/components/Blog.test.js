import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
  let blog;
  let blogComponent;

  beforeEach(() => {
    blog = {
      id: 100,
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'Turun Murre',
      url: 'www.koo',
      likes: 5,
      user: {
          id: 100,
          username: 'Raimo'
      }
    }

    const mockHandler = jest.fn()

    blogComponent = shallow(
        <Blog key={blog.id} blog={blog} user={blog.user} loggedUser={blog.user}
            filterBlogs={mockHandler} />
    )
  })

  it('renders', () => {
    const blogsTitle = blogComponent.find('.title')
    expect(blogsTitle.text()).toContain(blog.title)
  })

  it('at the start details are hidden', () => {
      let div = blogComponent.find('.details')
      expect(div.getElement().props.style).toEqual({ display: 'none' })
  })

  it('after clicking name, details are shown', () => {
      const name = blogComponent.find('.title')

      name.at(0).simulate('click')
      const div = blogComponent.find('.details')
      expect(div.getElement().props.style).toEqual({ display: '' })
  })
})
