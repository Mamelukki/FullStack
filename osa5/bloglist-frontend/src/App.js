import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Error from './components/Error'
import Togglable from './components/Togglable'
import { useField } from './hooks'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const username = useField('text')
  const password = useField('password')
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const [ user, setUser ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ message, setMessage ] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.create({
        title: title.value,
        author: author.value,
        url: url.value
      })
      setBlogs(blogs.concat(blog))
      title.reset()
      author.reset()
      url.reset()

      setMessage(`a new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('blog creation failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addLike = id => {
    const blog = blogs.find(b => b.id === id)

    const changedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }

    blogService
      .update(changedBlog.id, changedBlog).then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
  }

  const removeBlog = id => {
    const blog = blogs.find(b => b.id === id)

    if (window.confirm(`Remove blog ${blog.title} ${blog.author}`)) {
      try {
        blogService
          .remove(id)
          .then(() => {
            setBlogs(blogs.filter(b => b.id !== id))
            setMessage(`the blog ${blog.title} by ${blog.author} was deleted`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      } catch (exception) {
        setErrorMessage('blog deletion failed')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      })

      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      username.reset()
      password.reset()

      setMessage(`welcome ${user.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setMessage(`${user.name} logged out`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <Notification message={message} />
        <Error message={errorMessage} />
        <LoginForm
          handleLogin={handleLogin}
          username={username.allButReset}
          password={password.allButReset}
        />
      </div>
    )
  }

  const blogFormRef = React.createRef()

  return (
    <div>
      <Notification message={message} />
      <Error message={errorMessage} />
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>log out</button>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          addBlog={addBlog}
          title={title.allButReset}
          author={author.allButReset}
          url={url.allButReset}
        />
      </Togglable>
      <h2>blogs</h2>
      {blogs.sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            addLike={() => addLike(blog.id)}
            removeBlog={() => removeBlog(blog.id)}
            user={user}
          />
        )}
    </div>
  )
}

export default App