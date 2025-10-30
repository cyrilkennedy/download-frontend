// components/Banner.jsx

"use client";  // REQUIRED
import dynamic from 'next/dynamic';

const AdContainer = dynamic(() => import('./AdContainer'), { ssr: false });
const NativeBanner = dynamic(() => import('./NativeBanner'), { ssr: false });

export default function Banner({ position }) {
  return (
    <div
      className={`
        ${position === "header" ? "py-2 bg-gray-100" : ""}
        ${position === "middle" ? "my-6" : ""}
        ${position === "footer" ? "mt-8 py-4 bg-gray-100" : ""}
        flex justify-center items-center
      `}
    >
      {position === 'middle' ? (
        <NativeBanner />
      ) : (
        <AdContainer zone="10115553" />
      )}
    </div>
  );
}