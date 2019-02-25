const blogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: {
      _id: '1234567890',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: {
      _id: '1234567890',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: {
      _id: '0987654321',
      username: 'hellas',
      name: 'Arto Hellas'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (token) => {console.log(token)}

export default { getAll, setToken }