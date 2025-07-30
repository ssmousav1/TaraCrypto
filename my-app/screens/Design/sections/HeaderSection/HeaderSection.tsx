import React, { JSX } from "react";
import { WalletConnect } from "../../../../components/WalletConnect";

export const HeaderSection = (): JSX.Element => {
  return (
    <header className="z-20 flex w-full items-center justify-between px-4 sm:px-6 md:px-12 lg:px-[120px] py-4 md:py-[30px] sticky top-0 bg-[#00000080] border-b border-[#ffffff80]">
      <div className="font-bold text-xl sm:text-2xl md:text-[32px]">
        <span className="text-[#47fc28]">LOREM </span>
        <span className="text-white">EPS</span>
        <span className="text-[#47fc28]">UM</span>
      </div>

      <WalletConnect />
    </header>
  );
};
