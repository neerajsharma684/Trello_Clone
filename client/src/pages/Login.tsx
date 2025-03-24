import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Loader } from "../components";
import { login } from "../services/Auth";
import { useDispatch } from "react-redux";
import {loginStart, loginSuccess} from "../redux/slices/authSlice";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        dispatch(loginStart());
        try{
            const res = await login(email, password);
            dispatch(loginSuccess({
                user: res.data.user,
                token: res.data.token
            }));
            localStorage.setItem('token', res.data.token);
            setSubmitting(false);
            navigate('/');
        }catch(err){
            console.error(err);
            setSubmitting(false);
        }
    }

    return (
        <>
        {submitting && <Loader />}
        <div className={`flex items-center justify-center h-screen ${submitting ? 'blur-xs pointer-events-none' : ''}`}>
            <form className="relative w-80 p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
                <div className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</div>

                <div className="mb-4">
                    <div className="relative">
                        <FaEnvelope className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                        <input
                            required
                            aria-label="Email"
                            placeholder="Email"
                            className="w-full h-10 pl-10 pr-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <div className="relative">
                        <FaLock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                        <input
                            required
                            aria-label="Password"
                            placeholder="Password"
                            className="w-full h-10 pl-10 pr-10 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-2.5 text-gray-400"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                <FaEye/>
                            ) : (
                                <FaEyeSlash/>
                            )}
                        </button>
                    </div>
                </div>

                <button className="w-full h-10 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200" type="submit">
                    Login
                </button>

                <div className="mt-4 text-center text-sm">
                    <a
                        href="#"
                        className="text-gray-600 hover:text-blue-600"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate("/signup");
                        }}
                    >
                        Don't have an account? <span className="font-semibold text-blue-400">SignUp</span>
                    </a>
                </div>
            </form>
        </div>
        </>
    )
}

export default Login;