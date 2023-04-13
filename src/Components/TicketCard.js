import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TicketCard = (props)=>{

    const { ticket, urlEndPoint } = props;
    const [title, setTitle] = useState()
    const [description, setDescription] = useState(ticket.description)
    const [assignedToUserId, setassignedToUserId] = useState(ticket.assignedToUserId)
    const [status, setStatus] = useState(ticket.status)
    const [createdById, setCreatedById] = useState(ticket.createdById)
    const [createdUser, setCreatedUser] = useState()
    const [assignedUser, setAssignedUser] = useState()

    useEffect(() => {
        axios.get(`${urlEndPoint}/users/one/${createdById}`)
        .then(function (response) {
          setCreatedUser(response.data.user.email);
        })
        .catch(function (error) {
          console.log(error);
        });

        axios.get(`${urlEndPoint}/users/one/${assignedToUserId}`)
        .then(function (response) {
          setAssignedUser(response.data.user.email);
        })
        .catch(function (error) {
          console.log(error);
        });

        setTitle(ticket.title)
        setDescription(ticket.description)
        setStatus(ticket.status)

      },[ticket])

    return (
        <div className="col-md-4">
            <div className="card my-2">
                <div className="card-body">
                    <h5 className="card-title"><Link to={``} >{title}</Link></h5>
                    <h6 className="card-subtitle mb-2 text-muted">Created By: {createdUser}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">Assigned To: {assignedUser}</h6>
                    <p className="card-text text-truncate">{description}</p>
                    <small><p>Status: {status}</p></small>
                </div>
            </div>
        </div>
    )
}

export default TicketCard