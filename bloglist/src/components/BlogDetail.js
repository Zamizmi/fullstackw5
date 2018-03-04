import React from 'react'
const BlogDetail = ({blog, likeClick, deleteClick, visibility}) => (
  <div className='details'>
    {blog.title} has <b>{blog.likes}</b> likes.
    <button onClick={likeClick}>Like</button>
    <br/>
    <p>For more information check <a href={"http://" + blog.url}> {blog.url}</a></p>
    Added by {blog.user.username}
    <div style={visibility}>
      <button onClick={deleteClick}>Delete</button>
    </div>
  </div>
)

export default BlogDetail
