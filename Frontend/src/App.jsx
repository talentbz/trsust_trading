import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { FaRegQuestionCircle, FaGlobe, FaYinYang } from 'react-icons/fa';

import { history } from '_helpers';
import { PrivateRoute, InformationBar} from '_components';
import { Users, Home } from 'pages';
import { Login, Signup } from 'auth';

export { App };

function App() {
    // init custom history object to allow navigation from 
    // anywhere in the react app (inside or outside components)
    history.navigate = useNavigate();
    history.location = useLocation();
    const [infoSidebar, setInfoSideBar] = useState(null);
    const [infoType, setInfoType] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const showInfo = (type)=> {
      setInfoType(type)
    }
    useEffect(() => {
      const storedDarkMode = localStorage.getItem('isDarkMode');
      if (storedDarkMode !== null) {
        try {
          setIsDarkMode(JSON.parse(storedDarkMode));
        } catch (error) {
          // Handle invalid JSON value
          console.error('Error parsing dark mode value:', error);
        }
      }
    }, []);

    const toggleDarkMode = () => {
      const newDarkMode = !isDarkMode;
      setIsDarkMode(newDarkMode);
      localStorage.setItem('isDarkMode', JSON.stringify(newDarkMode));
    };
    
    return (
      <div className={`grid place-items-center pt-10 h-screen bg-[#aaa] ${isDarkMode ? 'dark' : 'light'}`}>
        <div className='fixed md:hidden lg:flex top-0 w-screen h-8 p-2 px-8 text-[#fff] bg-[#aaa] z-1000 justify-between'>
          <span 
            className='p-1 cursor-pointer' 
            onClick={() => {
              showInfo(1);
              setInfoSideBar(infoSidebar === 1 ? null : 1);
            }}
          >Business</span>
          <span>
            <span 
              className='mr-5 inline-flex items-center cursor-pointer'
              onClick={toggleDarkMode}
            >
              <FaYinYang />
            </span>
            <span 
              className='mr-5 inline-flex items-center cursor-pointer' 
              onClick={() => {
                showInfo(2)
                setInfoSideBar(infoSidebar === 2 ? null : 2);
              }}>
              <FaRegQuestionCircle />
              <span className='p-1 pt-2'>FAQ</span>
              </span>
            <span className='mr-5 inline-flex items-center text-[#fff]' >
              <FaGlobe />
              <select className='bg-opacity-0 focus:outline-none bg-[#000] p-1' name="lang" id="langBar">
                <option className='text-[#333] p-2' value="en">En</option>
                <option className='text-[#333] p-2' value="de">De</option>
                <option className='text-[#333] p-2' value="fr">Fr</option>
                <option className='text-[#333] p-2' value="it">It</option>
              </select>
            </span>
          </span>
        </div>
        <div className="max-w-[90%] border-[4px] rounded-[4em] border-[#3d3d3d]">
          <div className="border-[2px] rounded-[3.7em] border-[#212121]">
            <div className="max-w-full mx-auto bg-[#fef6e6] frameBorder relative border-[33px] rounded-[3.5em] border-[#3d3d3d] dark:bg-[#454545]">
              <div className="absolute h-4 w-14 bg-[#434343] -top-[49px] left-8 -z-10 rounded-md"></div>
              <div className="absolute h-4 w-14 bg-[#434343] -top-[49px] left-28 -z-10 rounded-md"></div>
              <div className='absolute w-[33px] h-auto -left-[33px] top-[300px] justify-center'>
                <div className=" h-[15px] w-[15px] bg-[#212121] mx-auto mb-6 rounded-full"></div>
                <div className=" h-[4px]  w-[4px]  bg-[#212121] mx-auto mb-6 rounded-full"></div>
                <div className=" h-[6px]  w-[6px]  bg-[#212121] mx-auto mb-6 rounded-full"></div>
                <div className=" h-[15px] w-[15px] bg-[#212121] mx-auto mb-6 rounded-full"></div>
                <div className=" h-[11px] w-[11px] bg-[#212121] mx-auto mb-6 rounded-full"></div>
              </div>
              
              <Routes>
                  <Route path="/" element={ <PrivateRoute> <Home dark={isDarkMode}/> </PrivateRoute> } />
                  <Route path="/admin" element={ <PrivateRoute> <Users /> </PrivateRoute> } />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="*" element={<Navigate to="/" />} />
              </Routes>
              
              <InformationBar
                show={infoSidebar}
                setShow={() => setInfoSideBar(null)}
                type={infoType}
              />
              {/* <Chart darkMode={isDarkMode} /> */}
            </div>
          </div>
        </div>
      </div>
    );
}
