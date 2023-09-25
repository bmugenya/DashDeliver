import ListingCategory from "../components/listing/ListingCategory";
import { categories } from '../components/navbar/Categories';
import Button from "../components/Button";
import ListingCard from "../components/listing/ListingCard";
import { useDispatch, useSelector } from 'react-redux'
import { amenities } from "../utils/amenities"
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

function ParcelPage({listings ,isLoading}) {

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

<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left  dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Order Number
                </th>
                <th scope="col" class="px-6 py-3">
                    Tracking Number
                </th>
                <th scope="col" class="px-6 py-3">
                    Parcel Type
                </th>
                <th scope="col" class="px-6 py-3">
                    Parcel Status
                </th>

                    <th scope="col" class="px-6 py-3">
                    Receiver Country
                </th>

                    <th scope="col" class="px-6 py-3">
                   Receiver Name
                </th>
                    <th scope="col" class="px-6 py-3">
                  Receiver Contact Number
                </th>


                     <th scope="col" class="px-6 py-3">
                   Sender Name
                </th>

                    <th scope="col" class="px-6 py-3">
                   Sender Contact Number
                </th>

                    <th scope="col" class="px-6 py-3">
                 Order Date
                </th>
                    <th scope="col" class="px-6 py-3">
                 Operation
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b ">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                   KEC2023092403244500001
                </th>
                <td class="px-6 py-4">
                    KE020012488668
                </td>
                <td class="px-6 py-4">
                   Domestic Consignment
                </td>
                <td class="px-6 py-4">
                    To be Picked-up
                </td>
                      <td class="px-6 py-4">
                    Kenya
                </td>
                <td class="px-6 py-4">
                    BrianOmondi
    

                </td>
                <td class="px-6 py-4">
                   700577453
                </td>
                      <td class="px-6 py-4">
                    BrianOmondi
    

                </td>
                <td class="px-6 py-4">
                700577453
                </td>
                <td class="px-6 py-4">
                    2023-09-23 17:41:41 
                </td>
                 <td class="px-6 py-4">
                    EDIT
                </td>
            </tr>
            <tr class="bg-white border-b ">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                   KEC2023092403244500001
                </th>
                <td class="px-6 py-4">
                    KE020012488668
                </td>
                <td class="px-6 py-4">
                   Domestic Consignment
                </td>
                <td class="px-6 py-4">
                    To be Picked-up
                </td>
                      <td class="px-6 py-4">
                    Kenya
                </td>
                <td class="px-6 py-4">
                    BrianOmondi
    

                </td>
                <td class="px-6 py-4">
                   700577453
                </td>
                      <td class="px-6 py-4">
                    BrianOmondi
    

                </td>
                <td class="px-6 py-4">
                700577453
                </td>
                <td class="px-6 py-4">
                    2023-09-23 17:41:41 
                </td>
                 <td class="px-6 py-4">
                    EDIT
                </td>
            </tr>
         <tr class="bg-white border-b ">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                   KEC2023092403244500001
                </th>
                <td class="px-6 py-4">
                    KE020012488668
                </td>
                <td class="px-6 py-4">
                   Domestic Consignment
                </td>
                <td class="px-6 py-4">
                    To be Picked-up
                </td>
                      <td class="px-6 py-4">
                    Kenya
                </td>
                <td class="px-6 py-4">
                    BrianOmondi
    

                </td>
                <td class="px-6 py-4">
                   700577453
                </td>
                      <td class="px-6 py-4">
                    BrianOmondi
    

                </td>
                <td class="px-6 py-4">
                700577453
                </td>
                <td class="px-6 py-4">
                    2023-09-23 17:41:41 
                </td>
                 <td class="px-6 py-4">
                    EDIT
                </td>
            </tr>
        </tbody>
    </table>
</div>

</div>






 </main>
    </>
  )
}

export default ParcelPage
