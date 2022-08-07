import Image from "next/image";
import { 
    SearchIcon,
    GlobeAltIcon,
    MenuIcon,
    UserCircleIcon,
    UserIcon
 } from '@heroicons/react/solid';

const Header = () => {
    return(
        <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
            {/** Left */}
            <div className="relative flex items-center h-10 cursor-pointer my-auto">
                <Image 
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png'
                    layout="fill"
                    objectFit="contain"
                    objectPosition="left"
                />
            </div>
            {/** Middle: Search Bar */}
            <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
                <input className="pl-5 flex-grow bg-transparent outline-none text-sm text-gray-400" placeholder="Start Your Search"/>
                <SearchIcon 
                    className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2"/>
            </div>
            {/** Right */}
            <div className="flex items-center justify-end text-gray-500 space-x-4">
                <p className="hidden md:inline cursor-pointer">Become a host</p>
                <GlobeAltIcon className="h-6 cursor-pointer"/>
                <div className="flex items-center space-x-2 border-2 p-2 rounded-full cursor-pointer">
                    <MenuIcon className="h-6"/>
                    <UserCircleIcon className="h-6"/>
                </div>
            </div>
        </header>
    )
}



export default Header;