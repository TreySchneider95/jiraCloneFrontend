import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../Hooks/Auth';


const TicketPage = (props)=>{
    const auth = useAuth()
    const { urlEndPoint } = props
    const { id } = useParams();
    const [ticket, setTicket] = useState({});
    const [ticketTitle, setTicketTitle] = useState(ticket.title)
    const [description, setDescription] = useState(ticket.description)
    const [createdById, setCreatedById] = useState(ticket.createdById)
    const [status, setStatus] = useState(ticket.status)
    const [createdAt, setCreatedAt] = useState(ticket.createdAt)
    const [assignedToUserId, setAssignedToUserId] = useState(ticket.assignedToUserId)
    const [createdUser, setCreatedUser] = useState()
    const [assignedUser, setAssignedUser] = useState()
    const [users, setUsers] = useState([])
    // const [author, setAuthor] = useState(blog.author)
    // const [categories, setCategories] = useState(blog.categories)
    const [isEditing, setIsEditing] = useState(false);


    useEffect(() => {
            axios
            .get(urlEndPoint + '/tickets/single/' + id)
            .then(res => {
              setTicket(res.data.ticket)
              setAssignedToUserId(res.data.ticket.assignedToUserId)
            })
            .catch(err => {
              console.log("Error:" + err);
            });


        axios.get(`${urlEndPoint}/users/all`)
        .then(function (response) {
          // console.log(response);
          setUsers(response.data.users);
        })
        .catch(function (error) {
          console.log(error);
        });
  
      },[id, urlEndPoint])

      useEffect(()=>{
        axios.get(`${urlEndPoint}/users/one/${ticket.assignedToUserId}`)
        .then(function (response) {
            console.log(response.data.user.email)
          setAssignedUser(response.data.user.email);
        })
        .catch(function (error) {
          console.log(error);
        });

        axios.get(`${urlEndPoint}/users/one/${ticket.createdById}`)
        .then(function (response) {
          setCreatedUser(response.data.user.email);
        })
        .catch(function (error) {
          console.log(error);
        });

      }, [ticket, urlEndPoint])

      const handleUpdateTicket = ()=>{
        const req = {
            title: ticketTitle,
            description: description,
            assignedToUserId: assignedToUserId,
            status: status,
            lastModified: Date.now()
            // categories: categories
          } 
          axios.put(`${urlEndPoint}/tickets/update-one/${ticket._id}`, req)
          .then(function (response) {
            console.log(response);
          },{
          'Content-Type': 'application/json'
          })
      }

      const handleDeleteTicket = ()=>{
        axios.delete(`${urlEndPoint}/tickets/single/${ticket._id}`)
        .then(function(response){
            console.log("deleted")
        })
      }

    return (
        <div>
            <div className="card m-5">
                <div className="card-body">
                    <div className='row'>
                        <div className='col'>
                            <p className='text-start'>Created By: {createdUser}</p>
                        </div>
                        <div className='col'>
                            {!isEditing && <p className='text-end'>Status: {ticket.status}</p>}
                            {isEditing && 
                            <select 
                            className='form-select mx-2'
                            defaultValue={ticket.status}
                            onChange={(e)=>{
                                setStatus(e.target.value)
                            }}
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                            </select>}
                        </div>
                    </div>
                    {!isEditing && <h5 className="card-title">{ticket.title}</h5>}
                    {isEditing && (
                        <div className='text-start m-2'>
                            <label htmlFor='title'>Title:</label>
                            <input
                            id='title'
                            className='form-control'
                            type="text"
                            defaultValue={ticket.title}
                            onChange={(e) => {
                                setTicketTitle(e.target.value);
                            }}
                            />
                        </div>
                    )}
                    {!isEditing && <p className="card-text">{ticket.description}</p>}
                    {isEditing && (
                        <div className='text-start m-2'>
                            <label htmlFor='description'>description:</label>
                            <textarea
                            id='description'
                            className='form-control'
                            defaultValue={ticket.description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                            />
                        </div>
                    )}
                    {!isEditing && <p className="card-text">Assigned To: {assignedUser}</p>}
                    {isEditing && (
                        <div className='text-start m-2'>
                            <label htmlFor='assign'>Assign To:</label>
                            <select
                                required
                                id='assign'
                                className='form-select'
                                onChange={(e)=>{
                                    setAssignedToUserId(e.target.value)
                                }}  
                            >
                                <option value={ticket.assignedToUserId}>{assignedUser}</option>
                                {users.map((item, index) => {
                                    return (<option
                                            key={index}
                                            value={item._id}
                                            >{item.email}</option>
                                        )
                                })}
                            </select>
                        </div>
                    )}
                    
                <div className='row'>
                        <div className='col'>
                            <p className='text-start'>Created at: {ticket.createdAt.split('T')[0]}</p>
                        </div>
                        <div className='col'>
                           <p className='text-end'>Last updated at {ticket.lastModified.split('T')[0]}</p>
                        </div>
                    </div>
                </div>
                
            </div>
                {auth.userEmail && !isEditing && <button type="button" className="btn btn-primary mx-2"
                    onClick={() => {
                    setIsEditing(true);
                    }}
                >Edit Ticket</button>
                }
                {isEditing && <div><button type="button" className="btn btn-primary mx-2"
                    onClick={() => {
                    setIsEditing(false);
                    handleUpdateTicket()
                    window.location.reload()
                    }}
                >Update Ticket</button>
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
                            handleDeleteTicket();
                        }else{
                            e.preventDefault()
                        }
                    }}
                >
                    Delete Ticket
                </Link>}
        </div>
    )
}

export default TicketPage