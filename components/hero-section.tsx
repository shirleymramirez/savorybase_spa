import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="pb-8 pt-2 sm:pb-10">
      <div className="absolute inset-0">
         <Image
            src="/products/longsilog.webp"
            alt="Hearty plate of longsilog with garlic rice, fried egg, and sweet pork longganisa"
            fill
            sizes="100vw"
            className="object-cover opacity-90"
          />
        <div className="absolute inset-0 bg-[#F4F0E6]/45" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-132px)] max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#4B5340]">
          Pickup from Chandler or delivery in the Phoenix metro area.
        </p>
        <h1 className="mt-4 max-w-4xl font-bold leading-tight text-4xl lg:text-7xl">Filipino comfort food, ready to cook at home</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#3F382F]">
          Order comforting dishes. We provide ready-to-cook Filipino staples and home-cooked favorites so you can enjoy authentic flavors with ease.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/#products"
            className="inline-flex h-12 items-center justify-center rounded-md bg-[#D9C7A7] px-6 text-base font-semibold text-[#2B241E] transition hover:bg-[#CBB58F]"
          >
            Explore the Menu
          </Link>
        </div>
      </div>
    </section>
  );
}

// import Link from "next/link";
// import Image from "next/image";

// export function HeroSection() {
//   return (
//     /* 
//       The root container uses 'w-screen' paired with 'left-1/2 -translate-x-1/2' 
//       to break out of any parent layouts and occupy the literal full width of the viewport.
//     */
//     <section className="relative left-1/2 w-screen -translate-x-1/2 min-h-[35vh] overflow-hidden pb-8 pt-2 sm:pb-10">
      
//       {/* Background Layer Container - stretches edge-to-edge */}
//       <div className="absolute inset-0 h-full w-full">
//         {/* Background Images */}
//           <Image
//             src="/products/longsilog.webp"
//             alt="Hearty plate of longsilog with garlic rice, fried egg, and sweet pork longganisa"
//             fill
//             sizes="100vw"
//             className="object-cover opacity-90"
//           />
        
//         {/* Color Overlay - covers the entire screen width */}
//         <div className="absolute inset-0 bg-[#F4F0E6]/45" />
//       </div>

//       {/* Content Layer Container - centered and bounded safely inside the full-width block */}
//       <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
//         <p className="text-sm font-semibold uppercase tracking-wide text-[#4B5340]">
//           Pickup from Chandler or delivery in the Phoenix metro area.
//         </p>
//         <h1 className="mt-4 max-w-4xl font-bold leading-tight text-3xl lg:text-5xl">
//           Filipino comfort food, ready to cook at home
//         </h1>
//         <p className="mt-4 max-w-2xl text-base leading-7 text-[#3F382F]">
//           Order comforting dishes. We provide ready-to-cook Filipino staples and home-cooked favorites so you can enjoy authentic flavors with ease.
//         </p>
//         <div className="mt-6 flex flex-col gap-3 sm:flex-row">
//           <Link
//             href="/#products"
//             className="inline-flex h-11 items-center justify-center rounded-md bg-[#D9C7A7] px-6 text-sm font-semibold text-[#2B241E] transition hover:bg-[#CBB58F]"
//           >
//             Explore Our Menu
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }