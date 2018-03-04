import React from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      author: '',
      title: '',
      url: '',
      showAll: true,
      message: null,
      username: '',
      password: '',
      user: null
    }
  }

componentDidMount() {
  blogService.getAll().then(blogs =>
    this.setState({ blogs })
    )
    try {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  } catch (exception) {
      console.log('no user logged in')
    }
}

logout = (event) => {
  event.preventDefault()
  window.localStorage.removeItem('loggedBlogappUser')
  this.setState ({
    user: null,
    message: 'You logged out!'
  })
  setTimeout(() => {
    this.setState({message: null})
  }, 5000)
}

filterBlogOut = (id) => {
  this.setState({
    blogs: this.state.blogs.filter(blog => blog.id !== id)
  })
}

addBlog = (event) => {
  event.preventDefault()

  const blogObject = {
    title: this.state.title,
    author: this.state.author,
    url: this.state.url
  }
  if(this.state.url === '' || this.state.title === '' || this.state.author === '') {
    this.setState({
      message: 'URL, title or author was empty! Try again',
    })
  } else {
    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          author: '',
          title: '',
          url: '',
          message: 'New blog added!'
        })
      })
    }
    setTimeout(() => {
      this.setState({ error: null })
    }, 5000)
}

handleBlogChange = (event) => {
  this.setState({ [event.target.name]: event.target.value
  })
}

compareByLikes = (b1, b2) => {
  if (b1.likes > b2.likes)
    return -1
  if (b1.likes < b2.likes)
    return 1
  return 0
}

toggleVisible = () => {
  this.setState({ showAll: !this.state.showAll })
}

handleLoginFieldChange = (event) => {
  this.setState({ [event.target.name]: event.target.value })
}

login = async (event) => {
  event.preventDefault()
  try {
    const user = await loginService.login({
      username: this.state.username,
      password: this.state.password
    })

    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    blogService.setToken(user.token)
    this.setState({ username: '', password: '', user, message: 'You just logged in!'})
  } catch(exception) {
    this.setState({
      message: 'Wrong username or password!',
    })
    setTimeout(() => {
      this.setState({ error: null })
    }, 5000)
  }
}

updateBlog = (blog) => {
  const id = blog._id
  const blogToChange = this.state.blogs.find(b => b.id === id)
  const changedBlog = { ...blogToChange, likes: blogToChange.likes + 1 }
  const newList = this.state.blogs.map(blog => blog.id !== id ? blog : changedBlog)
  this.setState({
    blogs: newList
  })
}

  render() {
    const loginForm = () => {
      const hideWhenVisible = { display: this.state.loginVisible ? 'none' : '' }
      const showWhenVisible = { display: this.state.loginVisible ? '' : 'none' }

      return (
        <div>
          <div style={hideWhenVisible}>
            <button onClick={e => this.setState({ loginVisible: true })}>Log In</button>
          </div>
          <div style={showWhenVisible}>
            <LoginForm
              visible={this.state.visible}
              username={this.state.username}
              password={this.state.password}
              handleChange={this.handleLoginFieldChange}
              handleSubmit={this.login}
            />
            <button onClick={e => this.setState({ loginVisible: false })}>Cancel</button>
          </div>
        </div>
      )
    }

    const blogForm = () => (
      <div>
        <h2>Luo uusi blogi</h2>

        <BlogForm
          onSubmit={this.addBlog}
          handleChange={this.handleBlogChange}
          author={this.state.author}
          title={this.state.title}
          url={this.state.url}/>
      </div>
    )

    const blogList = () => (
      <div>
        <h2>Blogs</h2>
        {this.state.blogs.sort(this.compareByLikes).map(blog =>
          <Blog key={blog.id} updateBlog={this.updateBlog} blog={blog} user={blog.user} loggedUser={this.state.user}
           filterBlogOut={this.filterBlogOut} />
        )}
      </div>
    )

    return (
        <div>
          <div>
            <h1>Blogi Kone</h1>
            <Notification notification={this.state.message}/>
            {this.state.user === null ?
              loginForm() :
              <div>
                <p>
                  User: {this.state.user.username} Logged in
                </p>
                <button onClick={this.logout}>
                Logout</button>
                <Togglable buttonLabel="New Blog" ref={component => this.blogForm = component}>
                  <BlogForm
                    onSubmit={this.addBlog}
                    author={this.state.author}
                    title={this.state.title}
                    url={this.state.url}

                    handleChange={this.handleBlogChange}
                  />
                </Togglable>
                {blogList()}
              </div>
            }
        </div>
      </div>
    )
  }
}

export default App;
