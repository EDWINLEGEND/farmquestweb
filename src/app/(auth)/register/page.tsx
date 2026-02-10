'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import ScaleSelection from '@/components/auth/ScaleSelection';

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [step, setStep] = useState<'auth' | 'scale'>('auth');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle signup logic
        console.log('Signup:', formData);
        setStep('scale');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Link
                href="/"
                className="absolute top-8 left-8 flex items-center gap-2 text-gray-600 hover:text-[#0F6435] transition-colors font-medium"
            >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
            </Link>

            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">

                {/* Right Side (Visuals) - Mirrored for variety */}
                <div className="w-full md:w-1/2 bg-[#0F6435] relative p-12 flex flex-col justify-between text-white overflow-hidden">
                    <div className="relative z-10">
                        <h1 className="text-3xl font-bold mb-2">FarmQuest</h1>
                        <p className="text-emerald-100">Join 10,000+ Farmers Today</p>
                    </div>

                    <div className="relative z-10 mt-12">
                        <h2 className="text-4xl font-bold mb-6 leading-tight">Start Your Journey</h2>
                        <p className="text-lg text-emerald-100 mb-8">
                            Create an account to access smart farming tools, market insights, and expert community support.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <span className="text-xl">🚀</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Quick Setup</h4>
                                    <p className="text-sm text-emerald-100">Get started in less than 2 minutes</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Abstract circles/background elements */}
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute top-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>

                    {/* Background Image Overlay */}
                    <div className="absolute inset-0 z-0 opacity-20">
                        <Image src="/images/background.png" alt="Background" fill className="object-cover" />
                    </div>
                </div>

                {/* Left Side (Form) */}
                <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white">
                    <div className="max-w-md mx-auto w-full">
                        {step === 'auth' ? (
                            <>
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                                    <p className="text-gray-500">Start managing your farm smarter today</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#0F6435] focus:ring-2 focus:ring-[#0F6435]/20 outline-none transition-all placeholder:text-gray-400"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#0F6435] focus:ring-2 focus:ring-[#0F6435]/20 outline-none transition-all placeholder:text-gray-400"
                                            placeholder="you@example.com"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#0F6435] focus:ring-2 focus:ring-[#0F6435]/20 outline-none transition-all placeholder:text-gray-400"
                                                placeholder="Create a password"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" required className="w-4 h-4 rounded border-gray-300 text-[#0F6435] focus:ring-[#0F6435]" />
                                        <span className="text-sm text-gray-600">
                                            I agree to the <a href="#" className="text-[#0F6435] font-medium hover:underline">Terms of Service</a> and <a href="#" className="text-[#0F6435] font-medium hover:underline">Privacy Policy</a>
                                        </span>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-3.5 px-4 bg-[#0F6435] hover:bg-[#0A4523] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                                    >
                                        Create Account
                                    </button>
                                </form>

                                <div className="mt-8 text-center text-sm text-gray-600">
                                    Already have an account?{' '}
                                    <Link href="/login" className="font-semibold text-[#0F6435] hover:underline">
                                        Sign in
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <ScaleSelection />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
