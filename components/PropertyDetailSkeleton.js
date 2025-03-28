import React from 'react';

export default function PropertyDetailSkeleton() {
  return (
    <div className="animate-pulse max-w-6xl mx-auto px-4 py-8">
      {/* Image Gallery Skeleton */}
      <div className="mb-8">
        <div className="bg-gray-200 rounded-xl h-96 w-full mb-4"></div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-24 w-32 flex-shrink-0"></div>
          ))}
        </div>
      </div>

      {/* Property Header */}
      <div className="mb-8">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
        <div className="flex flex-wrap gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-6 bg-gray-200 rounded w-24"></div>
          ))}
        </div>
      </div>

      {/* Price and Booking */}
      <div className="flex flex-col md:flex-row gap-8 mb-10">
        <div className="w-full md:w-2/3">
          {/* Description */}
          <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5 mb-8"></div>

          {/* Amenities */}
          <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-5 bg-gray-200 rounded w-32"></div>
            ))}
          </div>
        </div>

        {/* Booking Card */}
        <div className="w-full md:w-1/3">
          <div className="bg-gray-100 rounded-xl p-6">
            <div className="h-7 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-5 bg-gray-200 rounded w-full mb-6"></div>
            <div className="space-y-4 mb-6">
              <div className="h-10 bg-gray-200 rounded w-full"></div>
              <div className="h-10 bg-gray-200 rounded w-full"></div>
            </div>
            <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="mb-8">
        <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
        <div className="bg-gray-200 rounded-lg h-64 w-full"></div>
      </div>

      {/* Reviews */}
      <div>
        <div className="h-6 bg-gray-200 rounded w-40 mb-6"></div>
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="border border-gray-100 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="h-10 w-10 bg-gray-200 rounded-full mr-3"></div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}