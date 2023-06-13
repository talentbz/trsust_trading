import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaSave } from "react-icons/fa";

function AdminRow(props) {
  const { data, editUser, deleteUser} = props;
  const [editFlag, setEditFlag] = useState(0);

  let userData = {
    username: data.username,
    email: data.email,
    password: data.password,
    account_no: data.account_no,
    api_token: data.api_token,
    reward: data.reward,
    reward_stopout: data.reward_stopout,
    hedge: data.hedge,
    hedge_stopout: data.hedge_stopout,
    wallet: data.wallet,
    gross_profit: data.gross_profit
  };
  let keys = Object.keys(data);
  keys = keys.slice(1, keys.length); 

  const hadleEdit = ()=> {
    setEditFlag(1);
  }

  const handleSave = ()=> {
    setEditFlag(0);
    let wallet = Number(userData.wallet);
    userData.wallet = wallet;
    editUser(data.id, userData);
  }

  const onChangeData = (e, field) => {
    userData[field] = e.target.value;
  }

  return (
    <div className="mb-8 mx-5">
      <div className="flex justify-between" >
        <span className="text-[#3b93eb]">{ data.username } </span>
        <span className="flex items-center text-lg text-[#444] gap-4 font-syncopate-light dark:text-dark-text">
          {editFlag?<FaSave onClick={handleSave}/>:<FaEdit onClick={hadleEdit} />}
          <FaTrashAlt onClick={()=>deleteUser(data.id)} />
        </span>
      </div>
      {
        keys.map(
          (field,index)=>{
            return(
              <div key={index} className="grid grid-flow-col">
                <div className="w-full grid grid-cols-3  border-r-0 border-[#999] border-solid border-b lg:p-1 lg:px-5 p-1 pl-2 text-xs ">
                  <span
                    className={`font-syncopate-light text-[#555] dark:text-dark-text`}>
                    {field}
                  </span>
                  <div className="col-span-2">
                    <input type={ ['wallet' ,'investment', 'gross_profit'].includes(field)?'number':(field==='begin_date'?'date':'text') } className="font-syncopate-light text-[#555] w-[400px] dark:text-dark-text dark:focus:bg-[#454545] dark:bg-[#454545]" onChange={(e)=>onChangeData(e,field)} disabled={!editFlag} defaultValue={data[field]} />
                  </div>
                </div>
              </div> 
            )
          }
        )
      }
    </div>
  );
  
}

export { AdminRow };
