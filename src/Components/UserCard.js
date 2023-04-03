
const UserCard = (props)=>{

    const { user, urlEndPoint } = props;

    return (
        <div className="card m-5">
            <div className="card-body">
                <h5 className="card-title">{user.email}</h5>
                <p className="card-text">{user.dateCreated.toString()}</p>
            </div>
        </div>
    )
}

export default UserCard