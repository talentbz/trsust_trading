import React from "react";

function HomeCell({ title, value, headingColor, active = false, ownstyle="t-heading text-[11px]", ownstyle2="text-[18px]" }) {
  return (
    <div>
      <p className={`${
        ownstyle
      } ${
        headingColor
          ? 'bg-gradient-to-r from-[#777] to-[#31ED13] from-10% to-100% text-transparent bg-clip-text'
          : 'bg-gradient-to-r from-[#777] to-[#0094FF] from-10% to-100% text-transparent bg-clip-text'
      } dark:text-[#f4ebdb] dark:bg-none`}>
        {title}
      </p>
      <p className={`${active ? 'text-[#3761f6] dark:text-[#E67406] dark:text-bold' : 'text-[#6a6661] dark:text-dark-text' } font-syn-regular ${ownstyle2} `}>{value}</p>
    </div>
  );
};

export { HomeCell };
