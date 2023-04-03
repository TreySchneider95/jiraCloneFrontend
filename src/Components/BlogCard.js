import { useState } from "react";
import { Link } from "react-router-dom";

const BlogCard = (props)=>{

    const { blog, urlEndPoint } = props;
    const [author, setAuthor] = useState(blog.author)
    const [categories, setCategories] = useState(blog.categories)
    const [createdAt, setCreatedAt] = useState(blog.createdAt)
    const [text, setText] = useState(blog.text)
    const [title, setTitle] = useState(blog.title)

    return (
        <div className="card m-5">
            <div className="card-body">
                <h5 className="card-title"><Link to={`/blog/${blog.id}`} >{title}</Link></h5>
                <h6 className="card-subtitle mb-2 text-muted">By: {author}</h6>
                <p className="card-text text-truncate">{text}</p>
                <small><p>Created At: {createdAt.toString()}</p></small>
            </div>
        </div>
    )
}

export default BlogCard