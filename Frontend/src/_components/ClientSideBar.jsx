import { FaBars } from "react-icons/fa";
import { common } from '_helpers';

function ClientSideBar({show, setShow, selectedUserId, userList, allInfo, onSelect}) {
  const dataArray = Object.entries(allInfo);
  
  const hedgeFilteredData = dataArray.filter(([key, value]) => value.hedgePip !== 0);
  const rewardFilteredData = dataArray.filter(([key, value]) => value.rewardPip !== 0);
  
  const minHedgePip = hedgeFilteredData.reduce(
    (min, [key, value]) => (value.hedgePip < min ? value.hedgePip : min),
    Infinity
  );

  const minRewardPip = rewardFilteredData.reduce(
    (min, [key, value]) => (value.rewardPip < min ? value.rewardPip : min),
    Infinity
  );
  
  // Sort the userList array by account_no 
  const sortedUserList = Array.from(userList).sort((a, b) => {
    const accountNoA = Number(a.account_no);
    const accountNoB = Number(b.account_no);
    return accountNoA - accountNoB;
  });

  return (
    <div className={`${show ? "right-0" : "hidden"} bg-[#fef6e6] md:w-[680px] border-[1.5px]  rounded-l-3xl px-5 py-3 border-gray-300 z-30 transition-transform text-sm sidebar dark:bg-[#454545] dark:border-[#6D6D6D]`}>
      <h1 className="text-xl mb-5 text-[rgb(143,143,143)] text-center dark:text-dark-text">Sub-Clients</h1>
      <div className="grid md:grid-cols-3 w-auto h-[450px] md:h-[500px] overflow-y-auto">
        
        { 
          sortedUserList &&  sortedUserList.map((item, key)=>{
            let addClassName = (selectedUserId && selectedUserId == item.id)?'border-b-[1px] border-[red]':'border-b-[1px] border-[rgb(177,177,177)]';
            return (
                <div key={key}  className={`md:w-[180px] md:h-[150px] font-syn-regular grid grid-cols-2 gap-y-1 md:p-4 p-2 m-2 ${addClassName}`}>
                  <div onClick={()=>onSelect(item.id)} className="col-span-2 bg-gradient-to-r from-[#9327E8] to-30% to-[#3B93EB] text-transparent bg-clip-text text-xs">
                    { item.username??'nobody' }
                  </div>
                  <span className="text-xs dark:text-dark-text"> reward</span> <span className={`text-xs ${(allInfo[item.id] && allInfo[item.id].rewardPip === minRewardPip && minRewardPip < minHedgePip) ? "text-[red]": "dark:text-dark-text"}  `}>  { (allInfo[item.id] && allInfo[item.id].rewardPip)?common.numberFormat(allInfo[item.id].rewardPip):0 }</span>
                  <span className="text-xs dark:text-dark-text"> hedge </span> <span className={`text-xs ${(allInfo[item.id] && allInfo[item.id].hedgePip === minHedgePip && minHedgePip < minRewardPip ) ? "text-[red]": "dark:text-dark-text"}  `}>   { (allInfo[item.id] && allInfo[item.id].hedgePip)?common.numberFormat(allInfo[item.id].hedgePip):0 }</span>
                  <span className="hidden md:block text-xs font-syn-bold dark:text-dark-text"> Assets</span> <span className="hidden md:block text-xs font-syn-bold dark:text-dark-text"> { (allInfo[item.id] && allInfo[item.id].assets)?common.numberFormat(allInfo[item.id].assets):0 }</span>
                </div>
            )
          })
        }

      </div>
      <hr className="dark:hidden"/>
      <div className="menu mt-2 text-2xl w-full flex justify-end" onClick={()=> setShow()}>
        <span ><FaBars className="dark:text-dark-text"/></span>
      </div>
    </div>
  )
}

export { ClientSideBar }