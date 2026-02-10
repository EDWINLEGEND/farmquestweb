'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import ScaleSelection from '@/components/auth/ScaleSelection';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [step, setStep] = useState<'auth' | 'scale'>('auth');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic
        console.log('Login:', formData);
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

                {/* Left Side - Image/Branding */}
                <div className="w-full md:w-1/2 bg-[#0F6435] relative p-12 flex flex-col justify-between text-white overflow-hidden">
                    <div className="relative z-10">
                        <h1 className="text-3xl font-bold mb-2">FarmQuest</h1>
                        <p className="text-emerald-100">Smart Farming for Future Generations</p>
                    </div>

                    <div className="relative z-10 mt-12">
                        <h2 className="text-4xl font-bold mb-6 leading-tight">Elegance in Focus</h2>
                        <p className="text-lg text-emerald-100 mb-8">
                            Your complete farm management solution designed for modern agriculture.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <span className="text-xl">🌱</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Crop Management</h4>
                                    <p className="text-sm text-emerald-100">Track growth cycles effortlessly</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Abstract circles/background elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                    {/* Background Image Overlay */}
                    <div className="absolute inset-0 z-0 opacity-20">
                        <Image src="/images/background.png" alt="Background" fill className="object-cover" />
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white">
                    <div className="max-w-md mx-auto w-full">
                        {step === 'auth' ? (
                            <>
                                <div className="text-center mb-10">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                                    <p className="text-gray-500">Please enter your details to sign in</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#0F6435] focus:ring-2 focus:ring-[#0F6435]/20 outline-none transition-all placeholder:text-gray-400"
                                            placeholder="Enter your email"
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
                                                placeholder="Enter your password"
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

                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#0F6435] focus:ring-[#0F6435]" />
                                            <span className="text-sm text-gray-600">Remember me</span>
                                        </label>
                                        <button type="button" className="text-sm font-medium text-[#0F6435] hover:underline">
                                            Forgot password?
                                        </button>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-3.5 px-4 bg-[#0F6435] hover:bg-[#0A4523] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                                    >
                                        Log in
                                    </button>
                                </form>

                                <div className="mt-8 text-center text-sm text-gray-600">
                                    Don't have an account?{' '}
                                    <Link href="/register" className="font-semibold text-[#0F6435] hover:underline">
                                        Sign up
                                    </Link>
                                </div>

                                <div className="mt-8 flex items-center gap-4">
                                    <div className="h-px bg-gray-200 flex-1"></div>
                                    <span className="text-gray-400 text-xs uppercase">Or continue with</span>
                                    <div className="h-px bg-gray-200 flex-1"></div>
                                </div>

                                <div className="mt-6 grid grid-cols-2 gap-4">
                                    <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                        <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                                        <span className="text-sm font-medium text-gray-700">Google</span>
                                    </button>
                                    <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                        <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78 1.18-.19 2.31-.89 3.51-.84 1.54.06 2.7.79 3.22 1.64-2.85 1.69-2.3 5.79 1.16 7.15-.36 1.03-.89 2.22-1.74 3.44-.92 1.34-1.9 2.7-3.23 2.8zm-4.03-16.6c.72-1.22 2.26-1.97 3.56-1.77.29 1.55-.8 3.53-2.33 4.14-.99.4-2.5.06-3.22-1.24-.13-.24-.22-.64-.01-1.13z" /></svg>
                                        <span className="text-sm font-medium text-gray-700">Apple</span>
                                    </button>
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
