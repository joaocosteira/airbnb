import Image from "next/image";
import { 
    SearchIcon,
    GlobeAltIcon,
    MenuIcon,
    UserCircleIcon,
    UsersIcon
 } from '@heroicons/react/solid';
import { useState } from "react";


import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from "next/router";

const Header = ( { placeholder } : { placeholder : string}) => {
    const [searchInput, setSearchInput] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const router = useRouter();

    const selectionRange = {
        startDate, 
        endDate,
        key: 'selection'
    }

    const handleSelect = ( ranges ) =>  {

        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);

    }

    const search = () => {
        router.push({
            pathname : '/search',
            query : { 
                location : searchInput,
                startDate : startDate.toISOString(),
                endDate : endDate.toISOString(),
                numberOfGuests
            }
        })
    }

    return(
        <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
            {/** Left */}
            <div 
                className="relative flex items-center h-10 cursor-pointer my-auto"
                onClick={() =>{ router.push('/') }}
            >
                <Image 
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png'
                    layout="fill"
                    objectFit="contain"
                    objectPosition="left"
                />
            </div>
            {/** Middle: Search Bar */}
            <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
                <input 
                    className="pl-5 flex-grow bg-transparent outline-none text-sm text-gray-400" 
                    placeholder= { placeholder.length > 0 ? placeholder : "Start Your Search" }
                    value={searchInput}
                    onChange={({ target }) => { setSearchInput(target.value) }}
                />
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
            { searchInput && (
                <div className="flex flex-col col-span-3 mx-auto mt-5">
                    <DateRangePicker
                        ranges={[selectionRange]}
                        minDate={new Date()}
                        rangeColors={["#FD5B61"]}
                        onChange={handleSelect}
                    />
                    <div className="flex items-center border-b mb-4">
                        <h2 className="text-2xl flex-grow font-semibold">
                            Number of Guests
                        </h2>
                        <UsersIcon className="h-5"/>
                        <input 
                            type="number" 
                            className="w-12 pl-2 text-lg outline-none text-red-400" 
                            value={numberOfGuests}
                            min={1}
                            onChange={ ({target}) => { setNumberOfGuests(Number(target.value)) }}
                        />
                     </div>
                     <div className="flex">
                        <button className="flex-grow text-gray-500" onClick={() => { setSearchInput('') }}>Cancel</button>
                        <button className="flex-grow text-red-400" onClick={search}>Search</button>
                    </div>
                </div>
            )}
        </header>
    )
}



export default Header;