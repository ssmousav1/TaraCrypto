import React, { JSX } from "react";
import { Button } from "../../../../components/ui/button";

export const HeaderSection = (): JSX.Element => {
  return (
    <header className="flex w-full items-center justify-between px-4 sm:px-6 md:px-12 lg:px-[120px] py-4 md:py-[30px] sticky top-0 z-10 bg-[#00000080] border-b border-[#ffffff80]">
      <div className="font-bold text-xl sm:text-2xl md:text-[32px]">
        <span className="text-[#47fc28]">LOREM </span>
        <span className="text-white">EPS</span>
        <span className="text-[#47fc28]">UM</span>
      </div>

      <Button className="h-8 md:h-10 px-3 md:px-4 py-1 md:py-2 bg-[#47fc28] text-black hover:bg-[#3be01f] font-medium text-xs md:text-sm">
        Connect Wallet
      </Button>
    </header>
  );
};
