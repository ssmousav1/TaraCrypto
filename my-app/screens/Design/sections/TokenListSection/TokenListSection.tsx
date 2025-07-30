import React, { JSX } from "react";

export const TokenListSection = (): JSX.Element => {
  return (
    <section className="flex flex-col lg:flex-row justify-between items-center gap-8 py-8 md:py-12 w-full">
      <div className="flex flex-col gap-2.5 w-full lg:w-auto">
        <h3 className="font-bold text-xl md:text-2xl text-[#47fc28] font-['Spline_Sans',Helvetica]">
          LOREM EPSUM
        </h3>

        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[64px] leading-tight font-['Spline_Sans',Helvetica]">
            <span className="text-[#47fc28]">Lorem ipsum dolor</span>
            <span className="text-white block lg:inline"> sit amet, consectetur </span>
          </h1>

          <p className="text-sm text-white max-w-full lg:max-w-[644px] font-['Spline_Sans',Helvetica] mt-2 md:mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget
            velit aliquet sagittis id consectetur purus ut faucibus pulvinar.
            Sit amet commodo nulla facilisi nullam vehicula. Arcu risus quis
            varius quam quisque id diam.
          </p>
        </div>
      </div>

      <div className="flex-shrink-0 mt-6 lg:mt-0">
        <img
          className="w-auto h-[300px] md:h-[400px] lg:h-[600px]"
          alt="Token stack illustration"
          src="https://c.animaapp.com/mdlodzlxjRuFxk/img/frame.svg"
        />
      </div>
    </section>
  );
};
