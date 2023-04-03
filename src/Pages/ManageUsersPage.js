import UserCard from '../Components/UserCard';

const ManageUsersPage = (props)=>{

    const {
        userList,
        urlEndPoint
    } = props

    console.log(userList)

    return (
        <div>
            <h2 className="m-2">All Users</h2>
            {userList.map((item, index) => {
                return (<UserCard
                    user={item} 
                    urlEndPoint={urlEndPoint}
                    key={index} /> 
                );
            })}
        </div>
    )
}

export default ManageUsersPage