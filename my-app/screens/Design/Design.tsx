import React, { JSX } from "react";
import { HeaderSection } from "./sections/HeaderSection";
import { TokenListSection } from "./sections/TokenListSection";
import { MainContentSection } from "./sections/MainContentSection/MainContentSection";
import Image from "next/image";
// import { HeaderSection } from "./sections/HeaderSection";
// import { MainContentSection } from "./sections/MainContentSection/MainContentSection";
// import { TokenListSection } from "./sections/TokenListSection";

export const Design = (): JSX.Element => {
  return (
    <main
      className="relative flex flex-col bg-black min-h-screen overflow-hidden"
      data-model-id="1:10"
    >
      {/* Background blur image */}
      <Image
        width={50}
        height={50}
        className="absolute w-full h-full top-0 left-0 blur-[15px] object-cover"
        alt="Background texture"
        src="https://c.animaapp.com/mdlodzlxjRuFxk/img/34101981-rm311-ploy-14b.png"
      />

      {/* Header section at the top */}
      <HeaderSection />

      <div className="relative z-10 flex flex-col gap-8 md:gap-12 lg:gap-[60px] pt-6 md:pt-8 lg:pt-10 pb-12 md:pb-16 lg:pb-[100px] px-4 sm:px-6 md:px-12 lg:px-[120px] ">
        {/* Token list section */}
        <TokenListSection />

        {/* Main content section */}
        <MainContentSection />

        {/* Footer copyright */}
        <footer className="text-center w-full mt-8">
          <p className="text-sm text-white opacity-50 font-normal">
            Copyright © 2024 All rights reserved. Tarachain
          </p>
        </footer>
      </div>
    </main>
  );
};
