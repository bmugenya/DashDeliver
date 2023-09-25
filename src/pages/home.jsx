import ListingCategory from "../components/listing/ListingCategory";
import { categories } from '../components/navbar/Categories';
import Button from "../components/Button";
import ListingCard from "../components/listing/ListingCard";
import { useDispatch, useSelector } from 'react-redux'
import { amenities } from "../utils/amenities"
import Loader from "../components/Loader"
import Search from "../components/navbar/Search";
import Mark from "../components/Mark";

import { BiCalendar } from "react-icons/bi";
import { BiSolidBookContent } from "react-icons/bi";
import { BiSolidMap } from "react-icons/bi";

import { BiSolidCar } from "react-icons/bi";

import { BiSolidTruck } from "react-icons/bi";
import { BiSolidBriefcase } from "react-icons/bi";

function HomePage({listings ,isLoading}) {

 const { currentUser } = useSelector((state) => state.currentUser)

  return (
    <>
<div className="relative h-[650px] sm:h-[400px] lg:h-[550px] xl:h-[650px] 2xl:h-[750px]">
  <img
    className="w-full h-full object-cover"
    src="/images/banner.avif"
    alt="Logo"
  />

  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
    <p className="text-sm sm:text-lg">Track Your Delivery</p>
    <Search />
  </div>

  <div className="absolute left-1/2 transform -translate-x-1/2">
    <div className="border-[1px] py-10  shadow-sm hover:shadow-md transition cursor-pointer">
     <div 
        className="
          flex 
          flex-row 
          items-center 
          justify-between
        "
      >
        <div 
          className="
          text-sm 
            pl-6 
            pr-2 
            text-gray-600 
            flex 
            flex-row 
            border-x-[1px] 
            items-center 
            gap-3
          "
        >
        <BiCalendar size={18} />
        <div className="hidden sm:block">Ship Now</div>
      

        </div>
        <div 
          className="
       text-sm 
            pl-6 
            pr-2 
            text-gray-600 
            flex 
            flex-row 
            border-x-[1px] 
            items-center 
            gap-3
          "
        >
         <BiCalendar size={18} />
         <div className="hidden sm:block">Get a Quote</div>
         
         
        </div>
        <div 
          className="
            text-sm 
            pl-6 
            pr-2 
            text-gray-600 
            flex 
            flex-row 
            items-center 
            gap-3
          "
        >
 <BiSolidMap size={18} />
          <div className="hidden sm:block">Find a Location</div>
    
        </div>
      </div>
    </div>
  </div>
</div>



<main className="max-w-7xl mx-auto px-8 sm:px-16">

<section className="pt-24">
<h2 className="text-4xl font-semibold pb-5">Product and Service</h2>
    <div 
        className="
        pt-6
          grid 
          grid-cols-1 
          md:grid-cols-3 
          gap-3
       
      
        "
      >

 

       <ListingCard
             icon={BiSolidTruck}
              image='/images/package-shipping.jpg'
          label="Shipping Packages"
          description="Our expert team will carefully package your items  whether gifts, documents, or goods,  taking the hassle out of sending parcels or packages to their intended destinations"
      
        />


    


       <ListingCard
             icon={BiSolidMap}
              image='/images/pin-location.jpg'
          label="Package Tracking"
          description="We offer real-time tracking for all your parcels and packages. Using unique tracking numbers, you can monitor the location of your items as they make their way to their destinations."
      
        />

   <ListingCard
             icon={BiSolidBriefcase}
              image='/images/creative.jpg'
          label="Business Solutions"
          description=" Our business solutions include managing your company's outgoing and incoming mail, optimizing shipping processes, and providing reliable courier services for your business."
      
        />


 </div>







 </section>







 <section className=" flex flex-row items-center gap-2 pt-24">

       <div className="
        aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
        "
      >
        <img
          src='/images/news.jpg'
 
          className=" object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition"
          alt="Image"
        />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
    <p className="text-sm sm:text-lg text-white">Important News</p>
   </div>
        </div>

 



     <div className="
        aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
        "
      >
        <img
          src='/images/contact-us.jpg'
 
          className=" object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition"
          alt="Image"
        />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
    <p className="text-sm sm:text-lg text-white">Contact Us</p>
   </div>
        </div>


       <div className="
       aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
         
        "
      >
        <img
          src='/images/question.jpg'
 
          className=" object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition"
          alt="Image"
        />
               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
    <p className="text-sm sm:text-lg text-white">FAQS</p>
   </div>
        </div>

</section>


 </main>
    </>
  )
}

export default HomePage
