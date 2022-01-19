import { useState } from "react";
import { useHistory } from "react-router-dom";

const post = (path, data) => {
  return fetch(`http://localhost:8000${path}`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
};

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const [comments, setComments] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // const blog = { title, body, author };
    const blog = {
      title: title, 
      body: body,
      author: author,
      comments: comments
    }

    post('/blogs', blog).then(() => {
      history.push('/'); // go back to homepage
    })
  }

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input 
          type="text" 
          required 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog author:</label>
        <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value=".">Please Select the Following:</option>
          <option value="Alisha">Alisha</option>
          <option value="Faraaz">Faraaz</option>
        </select>
        <button>Add Blog</button>
      </form>
    </div>
  );
}
 
export default CreateBlog;