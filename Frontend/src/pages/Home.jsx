import { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client'

import { ClientSideBar, ExchangeSideBar, HomeCell, Chart, WalletSideBar } from "_components";
import { userActions, authActions } from '_store';
import { fetchWrapper, common } from '_helpers';

import logo from '../_assets/logo.png';
import subclient from '../_assets/sub-client.png';
import darkSubclient from '../_assets/dark-sub-client.png';
import exchange from '../_assets/history.png';
import vector from '../_assets/vector.png';
import darkVector from '../_assets/dark-vector.png';
import settingIcon from '../_assets/setting.png';
import power from '../_assets/log-out.png';

let socket;

function Home(dark) {
  const dispatch = useDispatch();
  const { user: authUser } = useSelector(x => x.auth);
  const { users } = useSelector(x => x.users);
  const logout = () => dispatch(authActions.logout());

  const [clientSidebar, setClientSideBar] = useState(false);
  const [exchangeSidebar, setExchangeSideBar] = useState(false);
  const [walletSidebar, setWalletSideBar] = useState(false);
  const [reward, setReward] = useState('');
  const [hedge, setHedge] = useState('');
  const [seluserid, setSelUserid] = useState(authUser[1]?.id || 0);
  const [allInfo, setAllInfo] = useState({});

  const isAdmin = useRef(authUser[1]?.usertype || 0);
  const selectedUser = useRef({
    username: authUser[1]?.username || '',
    wallet: authUser[1]?.wallet || 0,
    rewardStopout: authUser[1]?.reward_stopout || 0,
    hedgeStopout: authUser[1]?.hedge_stopout || 0,
    investment: authUser[1]?.investment || 0,
    beginData: authUser[1]?.begin_date || 'Not Set',
    grossProfit: authUser[1]?.gross_profit || 0
  });

  
  //get meta-api data of selected user on menu
  const onSelectUser = ( user_id )=> {
    if(user_id !==0 && seluserid !== user_id) {
      setSelUserid(user_id);
      const userOne = getUser(users.rows, user_id);
      selectedUser.current = {
        username: userOne.username,
        wallet: userOne.wallet,
        rewardStopout: userOne.reward_stopout,
        hedgeStopout: userOne.hedge_stopout,
        investment: userOne.investment,
        beginData: userOne.begin_date,
        grossProfit: userOne.gross_profit
      }

      // if(isAdmin.current !== 1)
        socket.emit('oneInfo', user_id);
      setReward({});
      setHedge({});
    }
  }

  // get user informatino from userlist
  const getUser = (arr, id)=> arr.find(item=> item.id == id);

  // sum property value of objects in Object array
	const sum = (items, prop)=> items.reduce((a, b) => a + b[prop], 0);

  // update metatrade data of selected user in realtime
  const updateUserData = (data)=> {
    if (data[0] && data[0]!=null) {
      data[0]['equity'] = data[0]['equity'] - data[0]['credit'];
      data[0]['freeMargin'] = data[0]['freeMargin'] - data[0]['credit'] + data[0]['margin'] * (100 - selectedUser.current.rewardStopout)/100;
      data[0]['freepip'] = (data[0]['sumlot'] === 0)?0:data[0]['freeMargin'] / (data[0]['sumlot'] * 10);
    }
    if (data[1]) {
      data[1]['equity'] = data[1]['equity'] - data[1]['credit'];
      data[1]['freeMargin'] = data[1]['freeMargin'] - data[1]['credit'] + data[1]['margin'] * (100 - selectedUser.current.hedgeStopout)/100;
      data[1]['freepip'] = (data[1]['sumlot'] === 0)?0:data[1]['freeMargin'] / (data[1]['sumlot'] * 10);
    }
    setReward(data[0] || {});		// reward account information
    setHedge(data[1] || {});		// hadge  account information
  }


  useEffect(() => {
    // console.log('app-start------------------')
    dispatch(userActions.getAll());

    const socketInitializer = async () => {
      let api_url = fetchWrapper.api_url;
      socket = io(`${api_url}`, {
        // transports: ['websocket'],
        reconnection: true, // enable automatic reconnection
        reconnectionAttempts: 100, // maximum number of reconnection attempts
        reconnectionDelay: 5000, // delay between reconnection attempts (in milliseconds)
      })
  
      socket.on('connect', () => {
        console.log('connected');
        reqSocket();
      })
  
      socket.on('update-information', res => {
        let data = JSON.parse(res);
        updateUserData(data);
      })
  
      socket.on('disconnect', () => {
        console.log('disconnected')
      })
    
      socket.on('reconnect', (attemptNumber) => {
        console.log(`reconnected after ${attemptNumber} attempts`)
      })
    
      socket.on('reconnect_failed', () => {
        console.log('failed to reconnect')
      })
  
    }
  
    const reqSocket = ()=> {
      if(isAdmin.current === 1){
        socket.emit('allInfo', 1);
      } 
      socket.emit('oneInfo', seluserid);
    }

    socketInitializer();

    return () => {
      if (socket) {
          socket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    
    // update metatrade data of all users in real time
    const updateAllUserData = (data)=> {
      let userList = users.rows || [];
      if(userList && userList.length > 0) {
        let keys = Object.keys(data);
        let subClientData = {};
        keys.map(
          (uid)=>{
            const userOne = getUser(userList, uid);
            let metaData = data[uid]??[];
            if (metaData[0] && metaData[0]!=null) {
              metaData[0]['equity'] = metaData[0]['equity'] - metaData[0]['credit'];
              metaData[0]['freeMargin'] = metaData[0]['freeMargin'] - metaData[0]['credit'] + metaData[0]['margin'] * (100 - userOne.reward_stopout)/100;
              metaData[0]['freepip'] = (metaData[0]['sumlot'] === 0)?0:metaData[0]['freeMargin'] / (metaData[0]['sumlot'] * 10);
            }
            if (metaData[1]) {
              metaData[1]['equity'] = metaData[1]['equity'] - metaData[1]['credit'];
              metaData[1]['freeMargin'] = metaData[1]['freeMargin'] - metaData[1]['credit'] + metaData[1]['margin'] * (100 - userOne.hedge_stopout)/100;
              metaData[1]['freepip'] = (metaData[1]['sumlot'] === 0)?0:metaData[1]['freeMargin'] / (metaData[1]['sumlot'] * 10);
            }
            subClientData[uid] = metaData.length>0? {
              rewardPip: metaData[0]?.freepip || 0,
              hedgePip: metaData[1]?.freepip || 0,
              assets: (metaData[0]?.equity || 0) + (metaData[1]?.equity || 0) + userOne.wallet
            }:{};
            
          }
        )
        setAllInfo(subClientData);
      }
    }

    socket.on('update-users-information', res => {
      let data = JSON.parse(res);
      updateAllUserData(data);
    })

    // Cleanup the socket event listener when the component unmounts
    return () => {
      socket.off('update-users-information');
    };
  }, [dispatch, setAllInfo]);


  
  let total = (reward.equity??0) + (hedge.equity??0) + selectedUser.current.wallet;
  console.log('total', selectedUser)
  let profit = (total - selectedUser.current.investment) * selectedUser.current.grossProfit /100;
  let profit_rate = profit>0 && selectedUser.current.investment>0? 100 * profit / selectedUser.current.investment: 0;

  return (
    <div className="w-full flex justify-center items-start lg:items-start p-5">
      <div className="grid grid-cols-8 h-auto w-full gap-10 lg:gap-0">
        <div className="col-span-8 ml-10">
          <img height={95} width={95} src={logo} alt="logo" />
          <div className="text-2xl bg-gradient-to-r from-[#9327EB] to-30% to-[#3B93EB] text-transparent bg-clip-text mb-4 font-light whitespace-nowrap font-syncopate-light flex justify-start items-center mt-5">
            <span className='text-[25px] font-syn-regular'>{ selectedUser.current.username }</span>
            <button className="ml-10 inline-flex items-center text-xs bg-gradient-to-r from-[#777] to-[#0094FF] from-10% to-100% text-transparent bg-clip-text" onClick={()=>logout()}>
              Logout<img width={30} src={power} alt="power" />
            </button>
            <div className="flex justify-center items-center place-items-start cursor-pointer" 
                onClick={() => {
                  setExchangeSideBar(!exchangeSidebar);
                }}
              >
                <span className="settingText ml-10 mr-2 text-[11px] s-text bg-gradient-to-r from-[#777777] to-[#7830AF] from-10% to-100% text-transparent bg-clip-text dark:text-[#f4ebdb] dark:bg-none dark:font-normal">exchange</span>
                <img width={26} src={exchange} alt="exchange" />
              </div>
              <div className="flex justify-center items-center place-items-start cursor-pointer" 
                onClick={() => {
                  setWalletSideBar(!walletSidebar);
                }}
              >
                <span className="settingText ml-10 mr-2 text-[11px] s-text bg-gradient-to-r from-[#777777] to-[#7830AF] from-10% to-100% text-transparent bg-clip-text dark:text-[#f4ebdb] dark:bg-none dark:font-normal">wallet</span>
                <img width={26} src={exchange} alt="exchange" />
              </div>
          </div>
        </div>

        <div className="lg:pt-8 ml-10 flex items-center lg:items-start flex-col overflow-hidden col-span-8 lg:col-span-3">
          <div className="grid grid-cols-2 gap-x-20 gap-y-3">
            <HomeCell title="Reward" value={reward.login??0} headingColor={true} />
            <HomeCell title="Hedge" value={hedge.login??0} headingColor={false} />

            <div className="col-span-2 w-[23rem] -mt-14 -mb-16 relative">
              <img className="h-auto w-[90%] my-2 -mx-1 block dark:hidden" src ={vector} alt="" />
              <img className="h-auto w-[90%] my-2 -mx-1 hidden dark:block" src ={darkVector} alt="" />
              <div className='absolute w-[88%]'>
                <div className='flex w-full col-span-2'>
                  <span className=" text-center mx-auto text-[10px] font-syn-regular text-[rgb(188,188,188)] dark:text-dark-text">
                    wallet
                  </span>
                </div>
                <div className='flex w-full col-span-2'>
                  <span className=" mx-auto text-lg text-[#81807f] font-syn-regular dark:text-dark-text">
                    { common.numberFormat(selectedUser.current.wallet, 0) }
                  </span>
                </div>
              </div>
            </div>

            <HomeCell title="balance" value={reward.balance?common.numberFormat(reward.balance):0} headingColor={true} />
            <HomeCell title="balance" value={hedge.balance?common.numberFormat(hedge.balance):0} headingColor={false} />

            <HomeCell title="EQUITY" value={reward.equity?common.numberFormat(reward.equity):0} headingColor={true} />
            <HomeCell title="EQUITY" value={hedge.equity?common.numberFormat(hedge.equity):0} headingColor={false} />

            <HomeCell title="Lot offen" value={reward.sumlot?common.numberFormat(reward.sumlot, 2):0} headingColor={true} />
            <HomeCell title="Lot offen" value={hedge.sumlot?common.numberFormat(hedge.sumlot, 2):0} headingColor={false} />

            <HomeCell title="Trades offen" value={reward.trades??0} headingColor={true} />
            <HomeCell title="Trades offen" value={hedge.trades??0} headingColor={false} />

            <HomeCell title="free pip" value={reward.freepip?common.numberFormat(Math.round(reward.freepip)):0} active="true" headingColor={true} ownstyle2={'text-[18px]'}  />
            <HomeCell title="free pip" value={hedge.freepip?common.numberFormat(Math.round(hedge.freepip)):0} active="true" headingColor={false} ownstyle2={'text-[18px]'} />

            <HomeCell title="free margin" value={reward.freeMargin?common.numberFormat(reward.freeMargin):0} headingColor={true} />
            <HomeCell title="free margin" value={hedge.freeMargin?common.numberFormat(hedge.freeMargin):0} headingColor={false} />

            <HomeCell title="used margin" value={reward.margin?common.numberFormat(reward.margin):0} headingColor={true} />
            <HomeCell title="used margin" value={hedge.margin?common.numberFormat(hedge.margin):0} headingColor={false} />

            <div className='col-span-2'>
              <HomeCell title="totally assets" ownstyle2={'text-[20px]'} value={common.numberFormat(total)} headingColor={true} />
            </div>
          </div>

          <div className="flex gap-16 mt-5 justify-between">
            <div>
              <HomeCell title="INVESTMENT" value={common.numberFormat(selectedUser.current.investment || 0)} ownstyle={"text-[11px]"} />
              <p className={`font-syn-regular text-[12px] dark:text-dark-text`}>{'Since: ' + selectedUser.current.beginData??'Not set'}</p>
            </div>
            
            <div>
              <HomeCell title="PROFIT" value={profit>0?common.numberFormat(profit):0} ownstyle={"text-[11px]"} />
              <p className={`font-syn-regular text-[12px] dark:text-dark-text`}>{common.numberFormat(profit_rate, 2)} %</p>
            </div>
{/* 
            <div>
              <HomeCell title="APR" value={profit>0?common.numberFormat(profit):0} ownstyle={"text-[#999] text-sm"} />
              <p className={`text-[#999]  font-syncopate-light text-xs`}>{common.numberFormat(profit_rate, 2)} %</p>
            </div>

            <div>
              <HomeCell title="APY" value={profit>0?common.numberFormat(profit):0} ownstyle={"text-[#999] text-sm"} />
              <p className={`text-[#999]  font-syncopate-light text-xs`}>{common.numberFormat(profit_rate, 2)} %</p>
            </div> */}
            
          </div>
        </div>

        <div className="flex items-center lg:items-end xl:items-start flex-col h-full overflow-hidden min-h-[450px] place-items-end col-span-8 lg:col-span-5 pt-7 ">
          {/* treadingView widget */}
          <div className='w-[587px] h-[426px] mx-auto'>
            <Chart dark = {dark}/>
          </div>

          <div className="flex justify-center mt-auto w-full">
            {isAdmin.current === 1 ? (
              <>
                <div className="flex justify-center items-center place-items-start cursor-pointer" 
                  onClick={() => {
                    setClientSideBar(!clientSidebar);
                  }}
                >
                  <span className="settingText mx-5 text-[11px]  text-[rgb(87,87,87)] bg-clip-text dark:text-[#f4ebdb] dark:bg-none">sub-clients</span>
                  <img className="block dark:hidden" width={26} src={subclient} alt="sub-client" />
                  <img className="hidden dark:block" width={26} src={darkSubclient} alt="sub-client" />
                </div>
                <NavLink to="/admin" className="text-sm text-[rgb(87,87,87)] text-center ml-9 cursor-pointer inline-flex items-center">
                  <span className="settingText mx-5 text-[11px]  bg-clip-text dark:text-[#f4ebdb] dark:bg-none">Status: Admin</span>
                  <img width={26}className="cursor-pointer" src={settingIcon} alt="second logo" />
                </NavLink>
              </>
            ) : null}
          </div>
        </div>

        <ClientSideBar
          show={clientSidebar}
          setShow={() => setClientSideBar(false)}
          userList={users.rows??[]}
          onSelect = { onSelectUser }
          selectedUserId = { seluserid }
          allInfo = { allInfo }
        />
        <ExchangeSideBar
          show={exchangeSidebar}
          dark={dark}
          setShow={() => setExchangeSideBar(false)}
        />
        <WalletSideBar
          show={walletSidebar}
          dark={dark}
          setShow={() => setWalletSideBar(false)}
        />
      </div>
    </div>
  );

}

export { Home };
