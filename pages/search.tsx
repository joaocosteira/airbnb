import { useRouter } from "next/router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";

export type SearchResult = {
    description : string,
    location : string,
    img : string,
    lat: number,
    long: number,
    price : string,
    star : number,
    title : string,
    total : string

}

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const Search = ({ searchResults } : { searchResults : SearchResult [] }) => {

    const router = useRouter();
    const { startDate, endDate, location, numberOfGuests } = router.query

    var formatedStartDate=''
    var formatedEndDate=''

    if(startDate && endDate && isString(startDate) && isString(endDate) && Boolean(Date.parse((startDate))) && Boolean(Date.parse(endDate))){
        formatedStartDate = format(new Date(startDate),"dd MMMM yy")
        formatedEndDate = format(new Date(endDate),"dd MMMM yy")
    }
    const range = `${formatedStartDate} - ${formatedEndDate}`

    return(
        <div>
            <Header placeholder={`${location} | ${range} | ${numberOfGuests}`}/>
            <main className="flex">
                <section className="flex-grow pt-14 px-6">
                    <p className="text-xs">300+ Stays - {range} - for {numberOfGuests} guests</p>
                    <h1 className="text-3xl font-semibold mt-2 mb-6">Stays In {location}</h1>
                    <div 
                    className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800
                    white-space-nowrap
                    ">
                        <p className="button">Cancellation Flexibility</p>
                        <p className="button">Type of Place</p>
                        <p className="button">Price</p>
                        <p className="button">Rooms and beds</p>
                        <p className="button">More Filters</p>
                    </div>
                    <div className="flex flex-col">
                        { searchResults?.map(item => <InfoCard key={`${item.description}-${item.img}`} {...item}/>) }
                    </div>
                </section>
            </main>
            <Footer/>
        </div>
    )

}

export default Search;

export async function getServerSideProps() {
    const searchResults = await fetch('https://jsonkeeper.com/b/5NPS').then( r => r.json() )

    return {
        props : { searchResults }
    }
}