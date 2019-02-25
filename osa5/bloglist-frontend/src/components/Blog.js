import React, { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog, user }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showRemoveButton = (blog) => {
    if (blog.user.name === user.name) {
      return (
        <div><button onClick={() => removeBlog(blog.id)}>remove</button></div>
      )
    }
  }

  if (!showDetails) {
    return (
      <div style={blogStyle} className='blogWithoutDetails'>
        <div onClick={() => setShowDetails(!showDetails)} className='clickShowDetails'>
          {blog.title} {blog.author}
        </div>
      </div>
    )
  } else {
    return (
      <div style={blogStyle} className='blogWithDetails'>
        <div onClick={() => setShowDetails(showDetails)}>
          <div>{blog.title} {blog.author}</div>
          <div>{blog.url}</div>
          <div>{blog.likes} likes <button onClick={() => addLike(blog.id)}>like</button></div>
          <div>added by {blog.user.name}</div>
          <div>{showRemoveButton(blog)}</div>
        </div>
      </div>
    )
  }
}


export default Blog