import type { NextPage } from 'next'
import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'
import SmallCard from '../components/SmallCard'
import MediumCard from '../components/MediumCard'
import LargeCard from '../components/LargeCard'
import Footer from '../components/Footer'

export type Location = {
  img : string,
  location : string,
  distance : string
}
export type LargeCardData = {
  img : string,
  title : string,
  description : string,
  buttonText : string
}

export type MidCardData = {
  img : string,
  title : string
}

export type HomeProps = {
  exploreData : Location [],
  cardsData : MidCardData []
}

const Home : NextPage<HomeProps> = ({ exploreData, cardsData }) => {

  return (
    <div>
      <Head>
        <title>Airbnb</title>
        <link rel="icon" href="/favicon.ico"
          />
      </Head>

      <Header placeholder=''/>
      <Banner/>

      <main className='max-w-7xl mx-auto px-8 sm:px-16'>
        <section  className='pt-6'>
          <h2 className='text-4xl font-semibold pb-5'>Explore Nearby</h2>
          <div className='grid sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4'>
            { exploreData?.map( (item : Location) =>( <SmallCard key={item.location} { ...item }  /> )) }
          </div>
        </section>
        <section>
          <h2 className='text-4xl font-semiblod py-8'>Live Anywhere</h2>
          <div className='flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3'>
            { cardsData?.map( (item : MidCardData) =>( <MediumCard key={item.title} { ...item }  /> )) }
          </div>
        </section>

          <LargeCard
            img="https://a0.muscache.com/im/pictures/2da67c1c-0c61-4629-8798-1d4de1ac9291.jpg?im_w=1440"
            title="The Greatest Outdoors"
            description="Wishlists curated by Airbnb"
            buttonText ="Get Inspired"
          />
    
      </main>
      <Footer/>
      
    </div>
  )
}

export async function getStaticProps(){
  const exploreData = await fetch('https://jsonkeeper.com/b/4G1G').then( r => r.json());
  const cardsData = await fetch('https://jsonkeeper.com/b/VHHT').then( r => r.json());
  return {
    props : { exploreData, cardsData }
  }

}

export default Home
