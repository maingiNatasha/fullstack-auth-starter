import { useState } from 'react';
import { BsPersonCircle } from "react-icons/bs";

function Login() {
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Email: ", email);
		console.log("Password: ", password);
		alert("Form Submitted 😊😊");
	};

    return (
        <div className='w-full max-w-sm bg-blue-100 dark:bg-blue-950 dark:text-blue-100 rounded-2xl shadow-lg shadow-gray-500 dark:shadow-blue-800 dark:border-2 dark:border-blue-900 p-6'>
            <h2 className='text-2xl font-bold text-center text-gray-950 dark:text-blue-100 mb-6'>
                Login
            </h2>
            <div className='flex justify-center mb-6'>
                <BsPersonCircle size={60} />
            </div>
            <form className='space-y-4' onSubmit={handleSubmit}>
                {/* Email */}
                <div>
                    <label className='block text-sm font-medium text-gray-700 dark:text-blue-100'>
                        Email
                    </label>
                    <input 
                        type='email'
                        className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='email@test.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {/* Password */}
                <div>
                    <label className='block text-sm font-medium text-gray-700 dark:text-blue-100'>
                        Password
                    </label>
                    <input
                        type="password"
                        className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='********'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    className='mt-6 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition'
                >
                    Sign In
                </button>
            </form>

            <p className='mt-8 text-center text-sm text-gray-600 dark:text-blue-100'>
                Don't have an account?
                <a href="#" className='ml-2 text-blue-600 hover:underline'>Sign Up</a>
            </p>
        </div>
    );
}

export default Login;