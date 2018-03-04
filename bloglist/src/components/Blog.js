import React from 'react'
import blogService from '../services/blogs'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user,
      blog: this.props.blog,
      visibility: false
    }
  }

  click = (event) => {
    this.setState({ visibility: !this.state.visibility })
  }

  like = async (event) => {
    event.preventDefault()

    const blogObject = {
      _id: this.state.blog.id,
      title: this.state.blog.title,
      author: this.state.blog.author,
      url: this.state.blog.url,
      likes: this.state.blog.likes + 1,
      user: this.state.blog.user
    }
    await this.setState({ blog: blogObject })
    blogService
      .updateBlog(this.state.blog._id, blogObject)
      .catch(error => {
        console.log(error, blogObject)
      })
      this.props.updateBlog(blogObject)
  }

  delete = async (event) => {
   event.preventDefault()

   if (window.confirm(`Delete '${this.state.blog.title}' by ${this.state.blog.author}`)) {
     blogService
       .deleteBlog(this.state.blog.id)
       .then(this.props.filterBlogOut(this.state.blog.id))
     }
   }

render() {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  let deleteButton = <button onClick={this.delete}>Delete</button>

  const name = () => (
    <div>
      {this.state.user === undefined ?
        '' :
        <p>added by {this.state.blog.user.username}</p>
      }
    </div>
  )

  const blog = this.props.blog
  const styleVisibility = { display: this.state.visibility ? '' : 'none' }

  return (
    <div style={blogStyle} className="wrapper">
      <div className="title" onClick={this.click}>{blog.title} {blog.author}</div>
      <div style={styleVisibility} className="details">
        <div className='url'><a href={"http://" + blog.url}> {blog.url}</a></div>
        <div className='likes'>{blog.likes} likes
        <button onClick={this.like} className='likeButton'>Like</button></div>
        <div className='name'> {name()} </div>
        <div className='deleteButton'> {deleteButton} </div>
      </div>
    </div>
    )
  }
}

export default Blog
