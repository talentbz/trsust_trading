import { FaRegTimesCircle } from "react-icons/fa";

function ExchangeSideBar({show, setShow}) {

  return (
    <div className={`${show ? "right-0" : "hidden"} bg-[#fff] border-[1.5px]  rounded-l-3xl px-5 py-3 border-gray-300 z-30 transition-transform text-sm sidebar text-center`}>
      <div className="flex items-center mt-5">
        <span onClick={() => setShow()} className="float-left cursor-pointer ml-3"><FaRegTimesCircle className="h-6 w-6 text-gray-300"/></span>
        <span className="text-xl bg-gradient-to-r from-[#9327EB] to-30% to-[#3B93EB] text-transparent bg-clip-text font-light whitespace-nowrap font-syncopate-light text-center mx-auto">Exchange</span>
      </div>
      <div className="w-[654px] h-[600px]">
        <iframe
          allowtransparency="true" 
          // scrolling="no"
          src="https://widget.mtpelerin.com/?type=web&lang=en&tab=buy&bdc=USDT&ssc=USDT&sdc=CHF&mylogo=https://dualnet.ch/static/media/logo.78c163da5bd59f6d3565.png&primary=%239327eb&success=%239327E8&ctry=CH&chain=polygon_mainnet"
          className="w-[444px] h-full m-auto"></iframe>
      </div>
    </div>
  )
}

export { ExchangeSideBar }