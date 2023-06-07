import { FaBars } from "react-icons/fa";
import { common } from '_helpers';

function ClientSideBar({show, setShow, selectedUserId, userList, allInfo, onSelect}) {

  return (
    <div className={`${show ? "right-0" : "hidden"} bg-[#fef6e6] border-[1.5px]  rounded-l-3xl px-5 py-3 border-gray-300 z-30 transition-transform text-sm sidebar`}>
      <h1 className="text-xl mb-5 text-[rgb(143,143,143)] text-center">Sub-Clients</h1>
      <div className="grid grid-cols-3 w-auto h-[500px] overflow-y-auto">
        
        { 
          userList &&  userList.map((item, key)=>{
            let addClassName = (selectedUserId && selectedUserId == item.id)?'border-b-[1px] border-[red]':'border-b-[1px] border-[rgb(177,177,177)]';
            return (
                <div key={key}  className={`w-[180px] h-[150px] font-syn-regular grid grid-cols-2 gap-y-1 p-4 m-2 ${addClassName}`}>
                  <div onClick={()=>onSelect(item.id)} className="col-span-2 bg-gradient-to-r from-[#9327E8] to-30% to-[#3B93EB] text-transparent bg-clip-text text-xs">
                    { item.username??'nobody' }
                  </div>
                  <span className="text-xs"> reward</span> <span className="text-xs ">  { (allInfo[item.id] && allInfo[item.id].rewardPip)?common.numberFormat(allInfo[item.id].rewardPip):0 }</span>
                  <span className="text-xs"> hedge </span> <span className="text-xs">   { (allInfo[item.id] && allInfo[item.id].hedgePip)?common.numberFormat(allInfo[item.id].hedgePip):0 }</span>
                  <span className="text-xs font-syn-bold"> Assets</span> <span className="text-xs font-syn-bold"> { (allInfo[item.id] && allInfo[item.id].assets)?common.numberFormat(allInfo[item.id].assets):0 }</span>
                </div>
            )
          })
        }

      </div>
      <hr/>
      <div className="menu mt-2 text-2xl w-full flex justify-end" onClick={()=> setShow()}>
        <span ><FaBars /></span>
      </div>
    </div>
  )
}

export { ClientSideBar }