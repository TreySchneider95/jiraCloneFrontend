import { useState, useEffect } from "react"
import axios from "axios"
import { useAuth } from "../Hooks/Auth"
import { useNavigate } from "react-router-dom";

const NewTicketPage = (props) =>{
    const auth = useAuth()
    const {
        urlEndPoint
    } = props
    const [users, setUsers] = useState([])
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [assignedToUserId, setAssignedToUserId] = useState()
    const [status, setStatus] = useState("Pending")
    const [createdById, setCreatedById] = useState(auth.userId)
    const navigate = useNavigate()

    const handleSubmit = ()=>{
        const req = {
            title: title,
            description: description,
            assignedToUserId: assignedToUserId,
            status: status,
            createdById: createdById
          }
          axios.post(`${urlEndPoint}/tickets/create-one`, req)
          .then((response)=>{
            console.log(response)
            auth.setNeedsReload(true)

          })
          .catch((err)=>{
            console.log(`Error creating ticket: ${err}`)
          })
    }

    useEffect(() => {
        axios.get(`${urlEndPoint}/users/all`)
        .then(function (response) {
          // console.log(response);
          setUsers(response.data.users);
        })
        .catch(function (error) {
          console.log(error);
        });
      },[])

    return (
        <div className="card m-5">
            <h2 className="m-3">New Ticket</h2>
            <form className="mx-5 text-start">
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        required
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
                    <label htmlFor="author">Description:</label>
                    <textarea
                        required
                        rows="5"
                        className="form-control" 
                        id="desctiption" 
                        placeholder="Enter desctiption"
                        defaultValue={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    />
                </div>
                <div className="input-group">
                    <div className="form-group">
                        <label htmlFor="assign">Assign to:</label>
                        <select
                            required
                            className="form-select"
                            onChange={(e)=>{
                                console.log("here")
                                setAssignedToUserId(e.target.value)
                            }}    
                        >
                            <option value=''>Pick someone</option>
                            {users.map((item, index) => {
                                return (<option
                                    key={index}
                                    value={item._id}
                                    >{item.email}</option> 
                                );
                            })}
                        </select>
                    </div>
                    <div className="form-group mx-4">
                        <label htmlFor="status">Staus:</label>
                        <select
                            required
                            className="form-select"
                            onChange={(e)=>{
                                console.log("look Here")
                                setStatus(e.target.value)
                                console.log(status)
                            }}    
                        >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                </div>
                <div className="text-center">
                    <button 
                        type="submit" 
                        className="btn btn-primary my-3"
                        onClick={()=>{
                            handleSubmit()
                            auth.setNeedsReload(true)
                            navigate("/")
                        }}
                    >Submit</button>
                </div>
            </form>
        </div>
    )
}

export default NewTicketPage