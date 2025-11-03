// // components/Banner.jsx
// "use client";

// import dynamic from 'next/dynamic';

// const NativeAd = dynamic(() => import('./NativeAd'), { ssr: false });

// const ids = {
//   header: 'container-header-native',
//   middle: 'container-0e1640332d1c1c66fd5db9d9651057fa', // your working native ID
//   footer: 'container-footer-native',
// };

// export default function Banner({ position }) {
//   return (
//     <div
//       className={`
//         ${position === "header" ? "py-1 bg-gray-50" : ""}
//         ${position === "middle" ? "my-4" : ""}
//         ${position === "footer" ? "mt-6 py-2 bg-gray-50" : ""}
//         flex justify-center
//       `}
//     >
//       <NativeAd id={ids[position]} minHeight={position === 'middle' ? 280 : 200} />
//     </div>
//   );
// }