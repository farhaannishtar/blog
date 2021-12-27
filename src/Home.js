import { useState, useEffect } from "react";
import BlogList from "./BlogList";

const Home = () => {
  const [name, setName] = useState('Shehan');
  const [blogs, setBlogs] = useState([
    { title: 'My new website', body: 'lorem ipsum...', author: 'mario', id: 1 },
    { title: 'Welcome party!', body: 'lorem ipsum...', author: 'yoshi', id: 2 },
    { title: 'Web dev top tips', body: 'lorem ipsum...', author: 'mario', id: 3 }
  ])

  const deleteBlog = (id) => {
    const newBlogs = blogs.filter(blog => blog.id !== id);
    setBlogs(newBlogs);
  } 

  useEffect(() => {
    console.log('useEffect ran');
  }, [name])

  return (
      <div className="home">
          <BlogList blogs={blogs} title='Will not give up' deleteBlog={deleteBlog}  />
          <button onClick={ () => setName('Shiraz') }>Change Name</button>
          <p>{ name }</p>
      </div>
  );
}

export default Home;
