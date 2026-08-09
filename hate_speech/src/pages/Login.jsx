import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../api/api";

export default function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await api.post(
                "/login",
                {
                    username,
                    password
                }
            );

            if (response.data.success) {

                navigate("/chat");

            }

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Login failed."
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="min-h-screen bg-black">

            <Navbar />

            <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">

                <form
                    onSubmit={handleLogin}
                    className="w-full max-w-md p-8 rounded-xl bg-black/30 border-1 border-white backdrop-blur-lg"
                >

                    <h1 className="text-3xl font-bold text-white mb-8 text-center">
                        Login
                    </h1>


                    {error && (

                        <p className="text-red-400 mb-4 text-center">
                            {error}
                        </p>

                    )}


                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                        className="w-full mb-4 p-3 rounded-lg bg-white/10 text-white outline-none"
                    />


                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        className="w-full mb-6 p-3 rounded-lg bg-white/10 text-white outline-none"
                    />


                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full p-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50"
                    >

                        {loading
                            ? "Logging in..."
                            : "Login"
                        }

                    </button>


                    <p className="text-gray-400 text-center mt-6">

                        Don't have an account?

                        <Link
                            to="/register"
                            className="text-red-400 ml-2 hover:text-red-300"
                        >
                            Create Account
                        </Link>

                    </p>

                </form>

            </div>

        </div>
    );
}