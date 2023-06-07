import React from "react";

function HomeCell({ title, value, headingColor, active = false, ownstyle="t-heading text-[11px]", ownstyle2="text-[18px]" }) {
  return (
    <div>
      <p className={`${ownstyle} ${headingColor ? 'bg-gradient-to-r from-[#777] to-[#31ED13] from-10% to-100% text-transparent bg-clip-text' : 'bg-gradient-to-r from-[#777] to-[#0094FF] from-10% to-100% text-transparent bg-clip-text'}`}>{title}</p>
      <p className={`${active ? 'text-[#3761f6]' : 'text-[#6a6661]' } font-syn-regular ${ownstyle2}`}>{value}</p>
    </div>
  );
};

export { HomeCell };
