// import bg from  'images/loginBack.jpg';
import logo from '../_assets/logo.png';

function Credentials({children}) {
  return (
    <div className="flex justify-center items-center flex-col md:w-[85%]">
      <div className="flex justify-start items-start w-full">
        <img width={96} height={96} className="mb-5" src={logo} alt="logo" />
      </div>
      <div style={{backgroundImage: `url('images/loginBack.jpg')`, backgroundSize: 'cover'}} className={`flex justify-between items-center w-full bg-white h-auto rounded-2xl overflow-hidden  credentialBack`}>
        <div className="w-auto">{children}</div>
        <div className="w-[50%]" ></div>
      </div>
    </div>
  )
}

export { Credentials }