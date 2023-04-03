import { useState } from "react"
import axios from "axios"

const NewBlogPage = (props) =>{

    const {
        urlEndPoint
    } = props

    const [title, setTitle] = useState()
    const [author, setAuthor] = useState()
    const [text, setText] = useState()
    const [categories, setCategories] = useState()

    const handleSubmit = ()=>{
        const req = {
            title: title,
            text: text,
            author: author,
            categories: categories
          }
          
          axios.post(`${urlEndPoint}/blogs/create-one`, req)
          .then((response)=>{
            console.log(response)
          })
          .catch((err)=>{
            console.log(`Error creating blog: ${err}`)
          })
    }

    return (
        <div className="card m-5">
            <h2 className="m-3">New Blog</h2>
            <form className="mx-5 text-start">
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="title" 
                        placeholder="Enter title"
                        defaultValue={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="author" 
                        placeholder="Enter Author"
                        defaultValue={author}
                        onChange={(e) => {
                            setAuthor(e.target.value);
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="text">Blog text:</label>
                    <textarea 
                        rows="5" 
                        className="form-control" 
                        id="text"
                        defaultValue={text}
                        onChange={(e) => {
                            setText(e.target.value);
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="categories">Categories:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="categories" 
                        placeholder="Enter Categories"
                        defaultValue={categories}
                        onChange={(e) => {
                            const array = e.target.value.split(',')
                            setCategories(array);
                        }}
                    />
                    <small id="categorieHelp" className="form-text text-muted">Enter each category seperated by commas no spaces.</small>
                </div>
                <div className="text-center">
                    <button 
                        type="submit" 
                        className="btn btn-primary my-3"
                        onClick={(e)=>{
                            handleSubmit()
                        }}
                    >Submit</button>
                </div>
            </form>
        </div>
    )
}

export default NewBlogPage