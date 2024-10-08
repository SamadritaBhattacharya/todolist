import bgimg from '../assets/bgimg.png';
import bgimg1 from '../assets/alarm.jpg';
import bgimg2 from '../assets/life.jpg';
import bgimg5 from '../assets/alarm.png';
import bgimg4 from '../assets/img5.jpg';



export default function Home() {
  return (
    <div
      className="flex flex-col items-center justify-center w-full min-h-screen bg-cover bg-center opacity-95 "
      style={{
        backgroundImage: `url(${bgimg5})`,
      }}
    >
      <div className='w-[90%] h-full   md:w-[70%] lg:w-[60%] mx-auto opacity-100 '>

      <div className="shadow-[0_20px_50px_rgba(8,_112,_184,_0.6)]
      
      rounded-xl  border-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 ">
        <div className="bg-neutral-600 bg-opacity-75 py-8 sm:py-12 px-4 sm:px-6 rounded-xl shadow-xl text-center">
          <h1 className="text-3xl lg:text-6xl font-normal text-cyan-50 mb-4">
            Welcome to Todo Master
          </h1>
          <p className="text-cyan-300  text-sm lg:text-xl mb-6">
            Manage your tasks efficiently and effectively.
          </p>
          <div className="space-x-2 sm:space-x-4">
            <a href="/sign-up" className="inline-block px-4 sm:px-6 py-1 text-white font-medium ring-indigo-500 ring-4 bg-indigo-400 rounded-full hover:bg-indigo-700">
              Sign Up
            </a>
            <a href="/login" className="inline-block px-4 sm:px-6 py-2 text-white font-medium bg-indigo-500 rounded-full hover:bg-indigo-700">
              Login
            </a>
          </div>
        </div>
      </div>

      </div>
    </div>
  );
}
