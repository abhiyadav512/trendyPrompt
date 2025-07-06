import { EyeOff, Eye, Lock, Mail, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useRegister } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [passwordShow, setPasswordShow] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const registerMutation = useRegister({
        onSuccess: (data) => {
            const { message } = data;
            toast.success(message);
            navigate("/signin");
        },
        onError: (err) => {
            // console.log(err);
            toast.error(err?.response?.data?.message || err?.response?.data?.errors || 'Login failed.');
        }
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        registerMutation.mutate(form)
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 bg-gray-50">
            <div className="max-w-md w-full p-8">
                <h3 className="text-center font-thin text-3xl mb-4">TrendyPrompt</h3>
                <h2 className="text-2xl font-light mb-6 text-center">Create a new account</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block mb-1 font-medium">
                            Full Name
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={form.name}
                                placeholder="Enter Name"
                                required
                                className="pl-9 w-full py-2 border border-gray-300 rounded-md focus:outline-none"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block mb-1 font-medium">
                            Email address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={form.email}
                                placeholder="you@example.com"
                                required
                                className="pl-9 w-full py-2 border border-gray-300 rounded-md focus:outline-none"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-1 font-medium">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                id="password"
                                name="password"
                                type={passwordShow ? "text" : "password"}
                                value={form.password}
                                placeholder="Create a password"
                                required
                                className="pl-9 w-full py-2 border border-gray-300 rounded-md focus:outline-none"
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                onClick={() => setPasswordShow(!passwordShow)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                                aria-label={passwordShow ? "Hide password" : "Show password"}
                            >
                                {passwordShow ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={registerMutation.isPending}
                        className={`w-full py-2 border rounded-lg border-slate-700 hover:bg-slate-800 hover:text-white transition duration-200 ${registerMutation.isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {registerMutation.isPending ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-blue-600 hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
