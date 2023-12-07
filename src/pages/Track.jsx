import ListingCategory from "../components/listing/ListingCategory";
import { categories } from '../components/navbar/Categories';
import Button from "../components/Button";
import ListingCard from "../components/listing/ListingCard";
import { useDispatch, useSelector } from 'react-redux'

import Loader from "../components/Loader"
import Search from "../components/navbar/Search";
import Mark from "../components/Mark";
import { useState } from "react";

import { BiCalendar } from "react-icons/bi";
import { BiSolidBookContent } from "react-icons/bi";
import { BiSolidMap } from "react-icons/bi";

import { BiSolidCar } from "react-icons/bi";

import { BiSolidTruck } from "react-icons/bi";
import { BiSolidBriefcase } from "react-icons/bi";

function TrackPage({listings ,isLoading}) {

const [isAccordionOpen, setIsAccordionOpen] = useState(false);
const [isAccordionSOpen, setIsAccordionSOpen] = useState(false);
  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };


  const toggleSAccordion = () => {

    setIsAccordionSOpen(!isAccordionSOpen);

  };

  return (
    <>
<div className="relative h-[650px] sm:h-[200px] lg:h-[250px] xl:h-[350px] 2xl:h-[250px]">


  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
    <p className="text-sm sm:text-lg">Track Your Delivery</p>
    <Search />
  </div>

 
</div>



<main className="max-w-7xl mx-auto px-8 sm:px-16">






<div class="bg-white shadow-md rounded-lg overflow-hidden">
<div id="accordion-collapse" data-accordion="collapse">
  <h2 id="accordion-collapse-heading-1">
    <button type="button"  onClick={toggleAccordion} class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 " data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
      <span>More Shipment Details</span>
      <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
    {isAccordionOpen && (
  
  <table class="w-full">
   
   
    
    <tbody>
   
      <tr class="border-b bg-gray-50 dark:bg-gray-500 dark:border-gray-700">
        <th class="px-4 py-2 text-left">Total Pieces </th>
        <th class="px-4 py-2 text-center">1</th>
  
      </tr>
      <tr>
        <td class="px-4 py-2">Weight </td>
        <td class="px-4 py-2 text-center">  
950.7 KGM</td>
   
      </tr>
     
      <tr class="border-b bg-gray-50 dark:bg-gray-500 dark:border-gray-700">
        <td class="px-4 py-2">Volume (MTQ) </td>
        <td class="px-4 py-2 text-center">  
0.457</td>
   
      </tr>
    
      <tr>
        <td class="px-4 py-2">Customer Reference</td>
        <td class="px-4 py-2 text-center">  
575479</td>
      
      </tr>
    
   <tr class="border-b bg-gray-50 dark:bg-gray-500 dark:border-gray-700">
        <td class="px-4 py-2">Shipment ID </td>
        <td class="px-4 py-2 text-center">  
  
S2303820637</td>
      
      </tr>
    
     <tr>
        <td class="px-4 py-2">Housebill</td>
        <td class="px-4 py-2 text-center">  
A839034</td>
      
      </tr>
    
    <tr>
        <th class="px-4 py-2 text-left" rowspan="2">Masterdetails</th>
        
      </tr>

      </tbody>

    
    <tbody>
   
      <tr class="border-b bg-gray-50 dark:bg-gray-500 dark:border-gray-700">
        <td class="px-4 py-2">Voyage Flight Number </td>
        <td class="px-4 py-2 text-center">  
  TK 0034</td>
   
      </tr>
     
      <tr >
        <td class="px-4 py-2">Airport of Departure </td>
        <td class="px-4 py-2 text-center">  
  IST Istanbul Airport TR </td>
   
      </tr>
    
      <tr class="border-b bg-gray-50 dark:bg-gray-500 dark:border-gray-700">
        <td class="px-4 py-2">Airport of Destination</td>
        <td class="px-4 py-2 text-center">  
575479</td>
      
      </tr>
    
   <tr>
        <td class="px-4 py-2">Estimated Departure Date </td>
        <td class="px-4 py-2 text-center">  
  
September, 06 2023 20:55 (UTC-05:00)</td>
      
      </tr>
    
     <tr class="border-b bg-gray-50 dark:bg-gray-500 dark:border-gray-700">
        <td class="px-4 py-2">Estimated Arrival Date </td>
        <td class="px-4 py-2 text-center">  
  September, 07 2023 17:05 (UTC+03:00)</td>
      
      </tr>
    </tbody>
  </table>
 
     )}
        <button type="button"  onClick={toggleSAccordion} class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 " data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
      <span>All Shipment Updates</span>
      <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2>
  

  {isAccordionSOpen && (


<ol class="m-10 relative border-l border-gray-200 dark:border-gray-700">                  
    <li class=" mb-10 ml-6">            
        <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
         




        </span>
        <h3 class="flex items-center mb-1 text-lg font-semibold text-gray-900 ">Import Document Handover</h3>
        <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">January 13th, 2022 10:15 (UTC+03:00)</time>
        <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Westlands</p>
  
    </li>
    <li class="mb-10 ml-6">
        <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            


        </span>
        <h3 class="mb-1 text-lg font-semibold text-gray-900">Broker Notified</h3>
        <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Released on December 7th, 2021</time>
        <p class="text-base font-normal text-gray-500 dark:text-gray-400">Westlands</p>
    </li>
    <li class="ml-6">
        <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
       



        </span>
        <h3 class="mb-1 text-lg font-semibold text-gray-900">Arrived Final Destination</h3>
        <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Released on December 2nd, 2021</time>
        <p class="text-base font-normal text-gray-500 dark:text-gray-400">Kangemi</p>
    </li>
</ol>


  



 
     )}
  </div>
</div>



 <section className=" flex flex-row items-center gap-2 pt-24">


       <div className="
     w-full
          h-[60vh]
          overflow-hidden 
          rounded-xl
          relative
         
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

export default TrackPage
