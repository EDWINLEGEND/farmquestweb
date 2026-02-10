"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import axios from "@/lib/axios";
import { Button } from "@/components/ui/button";

type PlantType = {
  id: number;
  name: string;
  description: string;
  full_image_url: string;
  cropped_image_url?: string;
  basic_needs: string[];
  tags: string[];
  price: number;
  rating: number;
  type?: string;
};

// Dummy plant data for fallback
const dummyPlant: PlantType = {
  id: 1,
  name: "Tomato Plant",
  description:
    "A versatile plant that produces juicy red fruits. Perfect for salads and cooking. Tomatoes are rich in vitamins and antioxidants, making them a healthy addition to any diet. They thrive in warm conditions with plenty of sunlight.",
  full_image_url: "/images/plant-1.png",
  cropped_image_url: "/images/plant-1.png",
  basic_needs: [
    "Full sunlight",
    "Regular watering",
    "Well-drained soil",
    "Support structure",
  ],
  tags: ["Vegetable", "Easy to grow", "Popular", "Fruit-bearing"],
  price: 299,
  rating: 4,
  type: "Outdoor",
};

export default function PlantDetailPage() {
  const params = useParams();
  const router = useRouter();  // Make sure useRouter is imported if not already, or added to imports
  const [plant, setPlant] = useState<PlantType | null>(null);
  const [loading, setLoading] = useState(true);

  // New state for checkboxes and notification
  const [addFertilizer, setAddFertilizer] = useState(false);
  const [addToolkit, setAddToolkit] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const handleStartFarming = () => {
    let message = "";
    if (addFertilizer && addToolkit) {
      message = "Fertilizer and Tool Kit will be delivered shortly.";
    } else if (addFertilizer) {
      message = "Fertilizer will be delivered shortly.";
    } else if (addToolkit) {
      message = "Tool Kit will be delivered shortly.";
    } else {
      message = "Happy farming!";
    }

    setNotification(message);

    // Redirect after showing notification (allow some time for user to see it)
    setTimeout(() => {
      router.push("/growth-status");
    }, 2500);
  };


  useEffect(() => {
    const fetchPlantData = async () => {
      setLoading(true);

      // First try to get from localStorage
      const storedPlant = localStorage.getItem("selectedPlant");
      if (storedPlant) {
        try {
          const parsedPlant = JSON.parse(storedPlant);
          if (parsedPlant.id.toString() === params.id) {
            setPlant(parsedPlant);
            setLoading(false);
            return;
          }
        } catch (error) {
          console.error("Error parsing stored plant data:", error);
        }
      }

      // If not in localStorage or ID doesn't match, fetch from API
      try {
        const response = await axios.get(`/crops/${params.id}`);
        if (response.data) {
          setPlant(response.data);
        } else {
          // Fallback to dummy data if API returns nothing
          setPlant(dummyPlant);
        }
      } catch (error) {
        console.error("Error fetching plant details:", error);
        // Fallback to dummy data on error
        setPlant(dummyPlant);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPlantData();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded-xl mb-6"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="h-10 bg-gray-200 rounded w-full mb-6"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Plant Not Found</h2>
          <p className="mb-6">
            The plant you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link href="/plants">
            <Button>Browse All Plants</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/dashboard" className="hover:text-green-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/plants" className="hover:text-green-600">
          Plants
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{plant.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Plant Image */}
        <div className="bg-gray-50 rounded-xl p-6 flex items-center justify-center relative">
          <Link
            href="/dashboard"
            className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md z-10 md:block hidden"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </Link>
          <div className="relative h-80 w-full">
            <Image
              src={plant.full_image_url || "/images/plant-1.png"}
              alt={plant.name}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Plant Details */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-3xl font-bold">{plant.name}</h1>
            <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shadow-sm hover:bg-gray-200 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </button>
          </div>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <span className="text-[#77AD3F] text-xl font-medium">
              ★ {plant.rating}
            </span>
            <span className="text-gray-500 text-sm ml-2">(200 Reviews)</span>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed mb-2">
              {plant.description}
            </p>
            <button className="text-[#0F6435] font-medium hover:text-[#77AD3F]">
              Read more
            </button>
          </div>

          {/* Basic Needs Section */}
          <div className="mb-8">
            <h3 className="text-gray-800 font-semibold text-lg mb-4">
              Basic Needs
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {plant.basic_needs.map((need, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-50 rounded-lg p-4 border border-gray-100"
                >
                  <div
                    className={`${index % 2 === 0
                      ? "bg-gradient-to-r from-[#77AD3F] to-[#0F6435]"
                      : "bg-yellow-400"
                      } p-3 rounded-md mr-3`}
                  >
                    {index % 2 === 0 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <circle cx="12" cy="12" r="5" />
                        <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {need.split(" ")[0]}
                    </p>
                    <p className="text-sm text-gray-600">
                      {need.split(" ").slice(1).join(" ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Price and Button */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-gray-600 text-sm">Price</p>
              <p className="text-3xl font-bold text-gray-800">₹{plant.price}</p>
            </div>

            <div className="flex flex-col items-end gap-3">
              <div className="flex gap-4 text-sm text-gray-700">
                <label className="flex items-center cursor-pointer hover:text-[#0F6435] transition-colors">
                  <input
                    type="checkbox"
                    checked={addFertilizer}
                    onChange={(e) => setAddFertilizer(e.target.checked)}
                    className="mr-2 w-4 h-4 accent-[#0F6435] rounded cursor-pointer"
                  />
                  Order Fertilizer
                </label>
                <label className="flex items-center cursor-pointer hover:text-[#0F6435] transition-colors">
                  <input
                    type="checkbox"
                    checked={addToolkit}
                    onChange={(e) => setAddToolkit(e.target.checked)}
                    className="mr-2 w-4 h-4 accent-[#0F6435] rounded cursor-pointer"
                  />
                  Order Tool Kit
                </label>
              </div>

              <button
                onClick={handleStartFarming}
                className="bg-gradient-to-r from-[#77AD3F] to-[#0F6435] text-white py-3 px-8 rounded-lg font-medium hover:shadow-md active:scale-[0.99] transition-all"
              >
                Start Farming
              </button>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {plant.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Related Plants Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <Link
                key={index}
                href={`/plant/${index + 2}`}
                className="group relative block mt-12"
              >
                <div className="relative">
                  {/* Image - Popping out */}
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-10 w-28 h-28 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2">
                    <Image
                      src={`/images/plant-${(index % 5) + 1}.png`}
                      alt="Related Plant"
                      fill
                      className="object-contain drop-shadow-xl"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="bg-[#F4F6F5] rounded-[2rem] p-4 pt-14 pb-4 relative z-0 flex flex-col gap-2 border border-gray-100 transition-all duration-300 group-hover:bg-white group-hover:shadow-lg">
                    <div className="text-center mt-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-0.5 leading-tight">
                        Related Plant {index + 1}
                      </h3>
                      <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">
                        Indoor
                      </p>
                    </div>

                    <div className="flex justify-between items-center w-full mt-1">
                      <span className="text-lg font-bold text-gray-900">
                        ₹{199 + index * 50}
                      </span>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                          <span className="text-xs font-bold text-gray-700">4</span>
                        </div>
                        <button className="w-8 h-8 rounded-full bg-[#0F6435] flex items-center justify-center text-white shadow-md hover:bg-[#0A4523] hover:scale-105 transition-all duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14" />
                            <path d="M12 5v14" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 bg-white border-l-4 border-[#0F6435] shadow-xl rounded-lg p-4 animate-in slide-in-from-right-full duration-300 z-50 flex items-start max-w-sm">
          <div className="bg-[#e6f4ea] p-2 rounded-full mr-3 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F6435" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 border-b border-gray-100 pb-1 mb-1">Order Confirmed!</h4>
            <p className="text-sm text-gray-600 font-medium">starting farming...</p>
            <p className="text-xs text-gray-500 mt-1">{notification}</p>
          </div>
        </div>
      )}
    </div>
  );
}
