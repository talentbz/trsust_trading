import { useState, useEffect } from "react";

import { FaRegTimesCircle } from "react-icons/fa";

function ExchangeSideBar({show, setShow, dark}) {
  const [isDarkMode, setIsDarkMode] = useState(dark.dark);

  useEffect(() => {
    console.log(isDarkMode);
    setIsDarkMode(dark.dark);
  }, [dark.dark]);

  return (
    <div className={`${show ? "right-0" : "hidden"} bg-[#fff] border-[1.5px] rounded-l-3xl px-5 py-3 border-gray-300 z-30 transition-transform text-sm sidebar text-center dark:bg-[#121212] dark:border-[#121212]`}>
      <div className="flex items-center mt-5">
        <span onClick={() => setShow()} className="float-left cursor-pointer ml-3"><FaRegTimesCircle className="h-6 w-6 text-gray-300 dark:text-dark-text" /></span>
        <span className="text-xl bg-gradient-to-r from-[#9327EB] to-30% to-[#3B93EB] text-transparent bg-clip-text font-light whitespace-nowrap font-syncopate-light text-center mx-auto dark:text-dark-text dark:bg-none">Exchange</span>
      </div>
      <div className="w-[654px] h-[600px]">
        <iframe
          key={isDarkMode ? "dark" : "light"} // Update the key value based on isDarkMode
          allowtransparency="true"
          // scrolling="no"
          src={isDarkMode ? "https://widget.mtpelerin.com/?type=web&lang=en&tab=buy&bdc=USDT&ssc=USDT&sdc=CHF&mylogo=https://dualnet.ch/static/media/logo.78c163da5bd59f6d3565.png&primary=%23e3006f&success=%23e3006f&ctry=CH&chain=polygon_mainnet&mode=dark" : "https://widget.mtpelerin.com/?type=web&lang=en&tab=buy&bdc=USDT&ssc=USDT&sdc=CHF&mylogo=https://dualnet.ch/static/media/logo.78c163da5bd59f6d3565.png&primary=%239327eb&success=%239327eb&ctry=CH&chain=polygon_mainnet"}
          className="w-[444px] h-full m-auto"
        ></iframe>
      </div>
    </div>
  );
}

export { ExchangeSideBar }