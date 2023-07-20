// import bg from  'images/loginBack.jpg';
import logo from '../_assets/logo.png';

function Credentials({children}) {
  return (
    <div className="w-[267px] mx-auto flex justify-center items-center flex-col md:w-[85%]">
      <div className="flex justify-start items-start w-full">
        <img width={96} height={96} className="my-[30px] md:my-0 md:mb-5" src={logo} alt="logo" />
      </div>
      {/* pc version */}
      <div style={{backgroundImage: `url('images/loginBack.jpg')`, backgroundSize: 'cover'}} className={`hidden md:flex justify-between items-center w-full bg-white h-auto rounded-2xl overflow-hidden  credentialBack`}>
        <div className="w-auto">{children}</div>
        <div className="w-[50%]" ></div>
      </div>
      {/* mobile version */}
      <div className={`md:hidden md:flex justify-between items-center w-full bg-white h-auto rounded overflow-hidden  credentialBack`}>
        <div className="w-auto">{children}</div>
        <div className="w-[50%]" ></div>
      </div>
    </div>
  )
}

export { Credentials }