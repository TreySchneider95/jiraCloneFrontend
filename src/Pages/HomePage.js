import TicketCard from "../Components/TicketCard";
import { useEffect, useState } from "react";
import { useAuth } from "../Hooks/Auth";

const HomePage = (props)=>{
    const auth = useAuth()
    const {
        ticketList, 
        urlEndPoint
    } = props
    const [tickets, setTickets] = useState(ticketList)

    const filterList = (filter)=>{
        if (filter === "All"){
            setTickets(ticketList)
        }else{
            const newTickets = ticketList.filter((ticket)=>{
                return ticket.status === filter
            })
            setTickets(newTickets)
            console.log(newTickets)
        }
    }

    useEffect(()=>{
        if(!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }
        setTickets(ticketList)
    }, [ticketList])


    return (
        <div className="">
            <h2 className="m-2">All Tickets</h2>
            <div className="d-flex justify-content-center">
            <select
                className="form-select w-25"
                onChange={(e)=>{
                    filterList(e.target.value)
                }}
            >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
            </select>
            </div>
            <div className="row m-4">
                {/* {console.log(tickets.map((item, index)=>{
                    return item.title
                }))} */}
                {tickets.map((item, index) => {
                    return (<TicketCard 
                        ticket={item} 
                        urlEndPoint={urlEndPoint}
                        key={index} /> 
                    );
                })}
            </div>
        </div>
    )
}
export default HomePage