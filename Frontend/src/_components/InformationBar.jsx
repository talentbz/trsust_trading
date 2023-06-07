import React from 'react';
import { useState, useEffect } from "react"
import { FaRegTimesCircle, FaPlus, FaMinus } from 'react-icons/fa';
import data from "_store/Infor"

function InformationBar({show, setShow, type}) {
  
  const [dataList, setDataList] = useState();
  const [activeAccordion, setActiveAccordion] = useState(null);
  
  useEffect(() => {
    setDataList(data);
    console.log(data);
  },[])

  const toggleAccordion = (accordionIndex) => {
    setActiveAccordion(accordionIndex === activeAccordion ? null : accordionIndex);
  };

  return (
    <div className={`${show ? "right-0" : "hidden"} bg-[#fef6e6] border-[1.5px] w-[60%] rounded-l-3xl px-5 py-3 border-gray-300 z-30 transition-transform text-sm sidebar`}>
      <div className="flex items-center mt-5">
        <span onClick={() => setShow(0)} className="float-left cursor-pointer ml-3"><FaRegTimesCircle className="h-6 w-6 text-gray-300"/></span>
        <span className="text-xl bg-gradient-to-r from-[#9327EB] to-30% to-[#3B93EB] text-transparent bg-clip-text font-light whitespace-nowrap font-syncopate-light text-center mx-auto">{type === 1? 'Business': `FAQ'S`}</span>
      </div>
      <div className="  h-[500px] overflow-y-auto">
      {type === 1? (
        <>

          <p className="text-[#555] px-4 text-sm">
            {dataList?.about??'About This Site.'}
          </p>
        </>
      )
      : (
        <>
          <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
            {dataList.faqs.map((accordion, index) => (
              <div key={index} className="py-5">
                <details 
                  className='group'
                >
                  <summary className="flex items-center cursor-pointer list-none">
                    <span className="transition group-open:rotate-180">
                    {activeAccordion === index ? (
                      <FaMinus className="h-3 w-3 text-[#3268FD]" />
                    ) : (
                      <FaPlus className="h-3 w-3 text-[#3268FD]" />
                    )}
                    </span>
                    <span className="ml-3 text-[#232323] font-normal	">{accordion.question}</span>
                  </summary>
                  <p className="text-sm mt-3 font-normal text-[#232323] group-open:animate-fadeIn">
                    {accordion.answer.split('\n').map((paragraph, paragraphIndex) => (
                      <React.Fragment key={paragraphIndex}>
                        {paragraph}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                </details>
              </div>
            ))}
          </div>
        </>
      )}
        
      </div>
    </div>
  )
}

export { InformationBar }