import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../Hooks/Auth';


const BlogPage = (props)=>{
    const auth = useAuth()
    const { id } = useParams();
    const { urlEndPoint } = props
    const [blog, setBlog] = useState({});
    const [blogTitle, setBlogTitle] = useState(blog.title)
    const [text, setText] = useState(blog.text)
    const [author, setAuthor] = useState(blog.author)
    const [categories, setCategories] = useState(blog.categories)
    const [isEditing, setIsEditing] = useState(false);

    console.log(blog.categories)

    useEffect(() => {
        axios
        .get(urlEndPoint + '/blogs/single/' + id)
        .then(res => {
          console.log(res.data);
          setBlog(res.data.blog[0])
        })
        .catch(err => {
          console.log("Error:" + err);
        })
  
      },[urlEndPoint, id])

      const handleUpdateBlog = ()=>{
        const req = {
            title: blogTitle,
            text: text,
            author: author,
            categories: categories
          } 
          axios.put(`${urlEndPoint}/blogs/update-one/${blog.title}`, req)
          .then(function (response) {
            console.log(response);
          },{
          'Content-Type': 'application/json'
          })
      }

      const handleDeleteBlog = ()=>{
        axios.delete(`${urlEndPoint}/blogs/single/${blog.title}`)
        .then(function(response){
            console.log("deleted")
        })
      }

    return (
        <div>
            <div className="card m-5">
                <div className="card-body">
                    {!isEditing && <h5 className="card-title">{blog.title}</h5>}
                    {isEditing && (
                        <div className='text-start m-2'>
                            <label htmlFor='title'>Title:</label>
                            <input
                            id='title'
                            className='form-control'
                            type="text"
                            defaultValue={blog.title}
                            onChange={(e) => {
                                setBlogTitle(e.target.value);
                            }}
                            />
                        </div>
                    )}
                    {!isEditing && <h6 className="card-subtitle mb-2 text-muted">By: {blog.author}</h6>}
                    {isEditing && (
                        <div className='text-start m-2'>
                            <label htmlFor='author'>Author:</label>
                            <input
                            id='author'
                            className='form-control'
                            type="text"
                            defaultValue={blog.author}
                            onChange={(e) => {
                                setAuthor(e.target.value);
                            }}
                            />
                        </div>
                    )}
                    {!isEditing && <p className="card-text">{blog.text}</p>}
                    {isEditing && (
                        <div className='text-start m-2'>
                            <label htmlFor='text'>Text:</label>
                            <textarea
                            rows="15"
                            id='text'
                            className='form-control'
                            defaultValue={blog.text}
                            onChange={(e) => {
                                setText(e.target.value);
                            }}
                            />
                        </div>
                    )}
                    {!isEditing && <p>Categories: {blog.categories && blog.categories.join(", ")}</p>}
                    {isEditing && (
                        <div className='text-start m-2'>
                            <label htmlFor='categories'>Categories:</label>
                            <input
                            id='categories'
                            className='form-control'
                            type="text"
                            defaultValue={blog.categories}
                            onChange={(e) => {
                                const array = e.target.value.split(',')
                                setCategories(array);
                            }}
                            />
                            <small id="categorieHelp" className="form-text text-muted">Enter each category seperated by commas no spaces.</small>
                        </div>
                    )}
                    <small><p>Created At: {blog.createdAt}</p></small>
                </div>
            </div>
                {auth.userEmail && !isEditing && <button type="button" className="btn btn-primary mx-2"
                    onClick={() => {
                    setIsEditing(true);
                    }}
                >Edit Blog</button>
                }
                {isEditing && <div><button type="button" className="btn btn-primary mx-2"
                    onClick={() => {
                    setIsEditing(false);
                    handleUpdateBlog()
                    window.location.reload()
                    }}
                >Update Blog</button>
                <button type="button" className="btn btn-danger mx-2"
                    onClick={()=>{
                        setIsEditing(false)
                    }}
                >Cancel</button>
                </div>
                }
                {auth.userEmail && !isEditing && <Link to="/" type="button" className="btn btn-danger mx-2"
                    onClick={(e) => {
                        if (window.confirm("Are you sure you want to delete?")){
                            handleDeleteBlog();
                        }else{
                            e.preventDefault()
                        }
                    }}
                >
                    Delete Blog
                </Link>}
        </div>
    )
}

export default BlogPage