'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ScaleSelection({ onComplete }: { onComplete?: () => void }) {
    const router = useRouter();

    const handleSelect = (scale: string) => {
        // You can save the preference here if needed
        console.log('Selected scale:', scale);
        if (onComplete) {
            onComplete();
        } else {
            router.push('/dashboard');
        }
    };

    const options = [
        "Never Leave Home",
        "Backyard Boys",
        "Tiny Farmer",
        "The Real Deal!"
    ];

    return (
        <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    What's your preferred scale of farming?
                </h2>
                <p className="text-gray-500">
                    Please let us know your preferred scale of farming.
                </p>
            </div>

            <div className="space-y-4">
                {options.map((option) => (
                    <button
                        key={option}
                        onClick={() => handleSelect(option)}
                        className="w-full bg-white border border-gray-200 rounded-xl p-5 flex items-center justify-between hover:border-[#0F6435] hover:shadow-md transition-all group text-left"
                    >
                        <span className="font-medium text-gray-800 text-lg group-hover:text-[#0F6435] transition-colors">
                            {option}
                        </span>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#0F6435] transition-colors" />
                    </button>
                ))}
            </div>
        </div>
    );
}
