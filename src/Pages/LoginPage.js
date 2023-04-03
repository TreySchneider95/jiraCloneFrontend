import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/Auth";

const LoginPage = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginMessage, setLoginMessage] = useState("");
    const auth = useAuth(); //access the authentication context 
    const navigate = useNavigate() // be able to navigate to home on login

  return (
    <div className="card m-5">
            <h2 className="m-3">Login</h2>
            <h4>{loginMessage}</h4>
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
                            const loginResult = await auth.login(email, password);
                            if (loginResult.success) {
                                navigate("/")
                            }
                            if (!loginResult.success) {
                                setLoginMessage(loginResult.message)
                            }
                            }}
                    >Submit</button>
                </div>
            </form>
        </div>
  );
};

export default LoginPage;