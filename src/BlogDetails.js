import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useState } from "react";

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, error, isPending } = useFetch('http://localhost:8000/blogs/' + id);
  const history = useHistory();
  const [comment, setComment] = useState('');
  const [commentHistory, setCommentHistory] = useState([]);

  const handleClick = () => {
    fetch('http://localhost:8000/blogs/' + blog.id, {
      method: 'DELETE'
    }).then(() => {
      history.push('/');
    }) 
  }

  const put = (path, data) => {
    return fetch(`http://localhost:8000${path}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    blog.comment = comment;
    setCommentHistory([...commentHistory, comment]);
    const templateBlog = {
      title: blog.title, 
      body: blog.body,
      author: blog.author,
      comments: blog.commentHistory
    }
    put(`/blogs/${blog.id}`, templateBlog);
    setComment('');
    // Testing
    console.log(blog.title);
    console.log(blog.body);
    console.log(blog.author);
    console.log(blog.commentHistory);

  }

  const handleChange = (e) => {
    setComment(e.target.value)
  }
    
  return (
    <div className="blog-details">
      { isPending && <div>Loading...</div> }
      { error && <div>{ error }</div> }
      { blog && (
        <article>
          <h2>{ blog.title }</h2>
          <p>Written by { blog.author }</p>
          <div>{ blog.body }</div>
          <button onClick={handleClick}>delete</button>
        </article>
      )}
      <div>
        <textarea 
          type="text" 
          required 
          value={comment}
          onChange={handleChange}/>
        <button onClick={handleCommentSubmit}>comment</button>
      </div>
      { commentHistory  &&  <div> { 
          commentHistory.map((element, i) => {
            return <div key={i}> {element} </div>
          })
        } 
        </div> }
        {/* <p>{ blog.comment }</p>   */}
    </div>
  );
}

export default BlogDetails;

