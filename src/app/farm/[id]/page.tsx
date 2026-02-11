"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import UserPoints from "@/components/UserPoints";
import axios from "@/lib/axios";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Share2,
  MapPin,
  Newspaper,
  Calendar,
  Droplet,
  Activity,
  ChevronRight,
  Sprout,
  Info
} from "lucide-react";

type FarmType = {
  id: number;
  name: string;
  location: string;
  image: string;
  status: "Active" | "Inactive";
  area?: number;
  type: string;
  description?: string;
};

export default function FarmDetailPage() {
  const params = useParams();
  const farmId = params.id;

  const [showFullDescription, setShowFullDescription] = useState(false);
  const [farm, setFarm] = useState<FarmType | null>(null);
  const [loading, setLoading] = useState(true);

  const userPoints = {
    exp: 150,
    coins: 25,
  };

  useEffect(() => {
    const fetchFarmData = async () => {
      setLoading(true);
      try {
        // Try to fetch from API first
        const response = await axios.get(`/farms/${farmId}`);
        if (response.data) {
          setFarm(response.data);
        } else {
          // If API returns no data, try localStorage
          const storedFarm = localStorage.getItem('selectedFarm');
          if (storedFarm) {
            setFarm(JSON.parse(storedFarm));
          }
        }
      } catch (error) {
        console.error("Error fetching farm data:", error);
        // On error, try localStorage
        const storedFarm = localStorage.getItem('selectedFarm');
        if (storedFarm) {
          setFarm(JSON.parse(storedFarm));
        }
      } finally {
        setLoading(false);
      }
    };

    if (farmId) {
      fetchFarmData();
    }
  }, [farmId]);

  // Default description if none is provided
  const defaultDescription = "This farm setup is designed for optimal growth and sustainability. It incorporates modern farming techniques while respecting traditional methods.";

  if (loading) {
    return <div className="container mx-auto px-4 py-6 flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24">
      {/* Banner Image Section */}
      <div className="relative w-full h-[40vh] min-h-[300px]">
        <Image
          src={farm?.image || "https://images.unsplash.com/photo-1524486361537-8ad15938e1a3?q=80&w=2338&auto=format&fit=crop"}
          alt={farm?.name || "Farm Image"}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>

        {/* Navigation & Points Overlay */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-10">
          <Link href="/farms" className="bg-white/20 backdrop-blur-md text-white rounded-full p-2 hover:bg-white/30 transition-all">
            <ArrowLeft size={24} />
          </Link>
          <div className="flex gap-2">
            <button className="bg-white/20 backdrop-blur-md text-white rounded-full p-2 hover:bg-white/30 transition-all">
              <Share2 size={24} />
            </button>
          </div>
        </div>

        {/* Points - Absolute Positioned */}
        <div className="absolute top-20 right-6 z-10">
          {/* Note: UserPoints component might need adjustment to look good on dark background, 
                 or we can wrap it in a container */}
          <div className="bg-white/90 backdrop-blur-md rounded-xl p-2 shadow-lg">
            <UserPoints exp={userPoints.exp} coins={userPoints.coins} />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-20 -mt-32">
        {/* Main Details Card */}
        <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-xl mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{farm?.name || "Farm Name"}</h1>
          <div className="flex items-center text-gray-500 mb-6">
            <MapPin size={18} className="mr-1" />
            <span className="font-medium">{farm?.location || "Location"}</span>
          </div>

          <p className="text-gray-600 mb-8 leading-relaxed text-lg">
            {showFullDescription
              ? (farm?.description || defaultDescription)
              : (farm?.description?.substring(0, 150) || defaultDescription.substring(0, 150)) + "..."}
            <button
              className="text-green-600 font-semibold ml-2 hover:underline"
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? "Read less" : "Read more"}
            </button>
          </p>

          {/* Main Stats Row */}
          <div className="flex justify-between items-center max-w-2xl mx-auto border-t border-gray-100 pt-8 mb-10">
            <div className="text-center px-4">
              <p className="text-3xl md:text-4xl font-bold text-green-600 mb-1">85%</p>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">Health</p>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center px-4">
              <p className="text-3xl md:text-4xl font-bold text-green-600 mb-1">120</p>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">Days Old</p>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center px-4">
              <p className="text-3xl md:text-4xl font-bold text-green-600 mb-1">Jun 15</p>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">Harvest Date</p>
            </div>
          </div>

          {/* Status & News Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Growth Status */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Activity className="text-gray-400" size={20} />
                Growth Status
              </h3>
              <div className="bg-gray-50 rounded-2xl p-4 flex gap-4 transition-colors hover:bg-gray-100 cursor-pointer group">
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 relative">
                  <Image
                    src="https://images.unsplash.com/photo-1596636478939-59fed7a083f2?q=80&w=200&auto=format&fit=crop"
                    alt="Plant Growth"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <p className="text-gray-700 text-sm leading-snug mb-2">
                    Currently in <span className="font-bold text-gray-900">Vegetative Growth</span> phase. The plant is developing its stem, leaves, and root system.
                  </p>
                  <span className="text-green-600 text-xs font-bold flex items-center group-hover:translate-x-1 transition-transform">
                    See Details <ChevronRight size={14} className="ml-1" />
                  </span>
                </div>
              </div>
            </div>

            {/* Related News */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Newspaper className="text-gray-400" size={20} />
                Related News
              </h3>
              <div className="bg-gray-50 rounded-2xl p-4 flex gap-4 transition-colors hover:bg-gray-100 cursor-pointer group">
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 relative">
                  <Image
                    src="https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?q=80&w=200&auto=format&fit=crop"
                    alt="News"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <p className="text-gray-700 text-sm leading-snug mb-2">
                    <span className="font-bold text-gray-900">Preventing Banana Diseases:</span> Learn about common banana plant diseases...
                  </p>
                  <span className="text-green-600 text-xs font-bold flex items-center group-hover:translate-x-1 transition-transform">
                    Read Article <ChevronRight size={14} className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bento Grid - Info Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {/* Planting Details Card */}
          <div className="bg-white rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-100 p-2.5 rounded-full text-green-600">
                <Calendar size={20} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Planting Details</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                <span className="text-gray-500 text-sm">Planted on</span>
                <span className="font-semibold text-gray-900">Mar 10, 2023</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                <span className="text-gray-500 text-sm">Harvest Date</span>
                <span className="font-semibold text-gray-900">Jun 15, 2023</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-gray-500 text-sm">Soil Type</span>
                <span className="font-semibold text-gray-900">Loamy</span>
              </div>
            </div>
          </div>

          {/* Care Instructions Card */}
          <div className="bg-white rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-2.5 rounded-full text-blue-600">
                <Droplet size={20} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Care Instructions</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="min-w-[5px] h-[5px] rounded-full bg-green-500 mt-2"></div>
                <span className="text-sm text-gray-600 leading-relaxed">Water regularly, keeping soil moist but not soggy</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="min-w-[5px] h-[5px] rounded-full bg-green-500 mt-2"></div>
                <span className="text-sm text-gray-600 leading-relaxed">Provide at least 6 hours of direct sunlight</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="min-w-[5px] h-[5px] rounded-full bg-green-500 mt-2"></div>
                <span className="text-sm text-gray-600 leading-relaxed">Fertilize every 2 weeks with balanced fertilizer</span>
              </li>
            </ul>
          </div>

          {/* Growth Timeline Card */}
          <div className="bg-white rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-100 p-2.5 rounded-full text-purple-600">
                <Sprout size={20} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Growth Timeline</h3>
            </div>

            <div className="relative pt-4 pb-2">
              {/* Timeline Line */}
              <div className="absolute left-0 right-0 top-[22px] h-1.5 bg-gray-100 rounded-full">
                <div
                  className="bg-green-500 h-1.5 rounded-full"
                  style={{ width: '60%' }}
                ></div>
              </div>

              <div className="flex justify-between relative z-10">
                {/* Stop 1 */}
                <div className="flex flex-col items-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white shadow-sm mb-2"></div>
                  <span className="text-[10px] font-bold text-green-700">Germinate</span>
                </div>
                {/* Stop 2 */}
                <div className="flex flex-col items-center -ml-4">
                  <div className="w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white shadow-sm mb-2"></div>
                  <span className="text-[10px] font-bold text-green-700">Vegetative</span>
                </div>
                {/* Stop 3 - Pending */}
                <div className="flex flex-col items-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-gray-200 border-2 border-white shadow-sm mb-2"></div>
                  <span className="text-[10px] font-medium text-gray-400">Flowering</span>
                </div>
                {/* Stop 4 - Pending */}
                <div className="flex flex-col items-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-gray-200 border-2 border-white shadow-sm mb-2"></div>
                  <span className="text-[10px] font-medium text-gray-400">Fruiting</span>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-purple-50 rounded-xl p-3">
              <p className="text-xs text-purple-800 font-medium text-center">
                Next stage: <span className="font-bold">Flowering</span> in approx 15 days
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center pb-12">
          <Link href={'/progress'} className="w-full md:w-auto bg-black text-white px-8 py-3.5 rounded-full font-bold text-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform">
            <Activity size={20} />
            Track Full Progress
          </Link>
          <button className="w-full md:w-auto bg-white text-gray-900 border border-gray-200 px-8 py-3.5 rounded-full font-bold text-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            <Info size={20} />
            Get Expert Help
          </button>
        </div>
      </div>
    </div>
  );
} 