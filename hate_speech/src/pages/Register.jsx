import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../api/api";

function Register() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);


    const handleRegister = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        if (!username.trim() || !password) {
            setError("Username and password are required.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {

            const response = await api.post("/register", {
                username: username.trim(),
                password: password
            });

            if (response.data.success) {

                setSuccess(
                    "Account created successfully. Redirecting to login..."
                );

                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            }

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Registration failed."
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
                onSubmit={handleRegister}
                className="w-full max-w-md p-8 rounded-xl bg-black/30 border-1 border-white backdrop-blur-lg"
            >

                <h1 className="text-3xl font-bold text-white mb-8 text-center">
                    Create Account
                </h1>


                {error && (
                    <p className="text-red-400 mb-4 text-center">
                        {error}
                    </p>
                )}


                {success && (
                    <p className="text-green-400 mb-4 text-center">
                        {success}
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
                    className="w-full mb-4 p-3 rounded-lg bg-white/10 text-white outline-none"
                />


                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) =>
                        setConfirmPassword(e.target.value)
                    }
                    className="w-full mb-6 p-3 rounded-lg bg-white/10 text-white outline-none"
                />


                <button
                    type="submit"
                    disabled={loading}
                    className="w-full p-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold"
                >

                    {loading
                        ? "Creating account..."
                        : "Create Account"
                    }

                </button>


                <p className="text-gray-400 text-center mt-6">

                    Already have an account?

                    <Link
                        to="/login"
                        className="text-red-400 ml-2 hover:text-red-300"
                    >
                        Login
                    </Link>

                </p>

            </form>

        </div>
        </div>
    );
}

export default Register;