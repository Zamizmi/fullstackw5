import React from 'react'

const BlogForm = ({ onSubmit, handleChange, author, title, url}) => {
  return (
    <div>
      <h2>Create new Blog</h2>

      <form onSubmit={onSubmit}>
        <input placeholder="Author"
          type="text"
          name="author"
          value={author}
          onChange={handleChange}
        />
        <br/>
        <br/>
        <input placeholder="Title"
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
        <br/>
        <br/>
        <input placeholder="URL"
          type="text"
          name="url"
          value={url}
          onChange={handleChange}
        />
        <br/>
        <br/>
        <button type="submit">Lisää Blogi</button>
      </form>
    </div>
  )
}

export default BlogForm
