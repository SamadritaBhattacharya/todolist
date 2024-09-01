import bgimg from '../assets/bgimg.png';
import bgimg1 from '../assets/alarm.jpg';
import bgimg2 from '../assets/life.jpg';


export default function Home() {
  return (
    <div
      className="flex flex-col items-center justify-center w-full min-h-screen bg-cover bg-center "
      style={{
        backgroundImage: `url(${bgimg2})`,
      }}
    >
      <div className='w-[90%] h-full   md:w-[70%] lg:w-[60%] mx-auto opacity-100 '>

      <div className="shadow-[0_20px_50px_rgba(8,_112,_184,_0.6)]
      
      rounded-xl  border-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 ">
        <div className="bg-neutral-400 bg-opacity-75 py-8 sm:py-12 px-4 sm:px-6 rounded-xl shadow-xl text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Welcome to Todo Master
          </h1>
          <p className="text-gray-600 mb-6">
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
