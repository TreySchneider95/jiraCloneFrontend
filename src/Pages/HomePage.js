import BlogCard from "../Components/BlogCard";

const HomePage = (props)=>{

    const {
        blogList, 
        urlEndPoint
    } = props

    return (
        <div>
            <h2 className="m-2">All Blogs</h2>
            {blogList.map((item, index) => {
                return (<BlogCard 
                    blog={item} 
                    urlEndPoint={urlEndPoint}
                    key={index} /> 
                );
            })}
        </div>
    )
}
export default HomePage