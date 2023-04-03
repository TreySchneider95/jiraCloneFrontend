import { useState } from "react"
import { useAuth } from "../Hooks/Auth";
import { useNavigate } from "react-router-dom";

const NewUserPage = (props) =>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registerMessage, setRegisterMessage] = useState("");
    const auth = useAuth();
    const navigate = useNavigate();

    return (
        <div className="card m-5">
            <h2 className="m-3">Register</h2>
            <form className="mx-5 text-start">
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="email" 
                        placeholder="Enter email"
                        defaultValue={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Enter password"
                        defaultValue={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
                <div className="text-center">
                    <button 
                        type="submit" 
                        className="btn btn-primary my-3"
                        onClick={async (e) => {
                            e.preventDefault()
                            const registerResult = await auth.register(email, password);
                            if (registerResult.success) {
                                navigate("/login");
                            }
                            if (!registerResult.success) {
                                setRegisterMessage(registerResult.message);
                            }
                          }}
                    >Submit</button>
                </div>
            </form>
        </div>
    )
}

export default NewUserPage