
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";

import { BiSolidBriefcase } from "react-icons/bi";
import { BiSolidPhone } from "react-icons/bi";
import { BiLogoGmail } from "react-icons/bi";
import { BiSolidTime } from "react-icons/bi";
import { useSelector } from 'react-redux'




import { BiLogoFacebook } from "react-icons/bi";
import { BiLogoInstagram } from "react-icons/bi";
import { BiLogoTwitter } from "react-icons/bi";
import { BiLogoWhatsapp } from "react-icons/bi";
function Footer() {



  return (
    <>
<footer className="mt-16 rounded-2xl bg-dark dark:bg-accentDark/90 m-2 sm:m-10 flex flex-col items-center text-light dark:text-dark">
  
    
          <div className="w-full  relative font-medium  flex  flex-col md:flex-row items-center justify-between">
        
          <div>
          <span className="text-center">
          Follow us   </span>
                  <a
        
          className="inline-block w-6  mr-4"
         
        >
          <BiLogoTwitter className="hover:scale-125 transition-all ease duration-200" />
        </a>
        <a
         
          className="inline-block w-6  mr-4"
         
        >
          <BiLogoFacebook className="hover:scale-125 transition-all ease duration-200" />
        </a>
        <a
         
          className="inline-block w-6 mr-4 fill-light"
        
        >
          <BiLogoInstagram className="fill-light dark:fill-dark  hover:scale-125 transition-all ease duration-200" />
        </a>
        <a
       
          className="inline-block w-6 mr-4"
    
        >
          <BiLogoWhatsapp className="hover:scale-125 transition-all ease duration-200" />
        </a>

      </div>
    
      </div>


  

      <div className="w-full  mt-10  relative font-medium border-t border-solid border-light py-6 px-8 flex  flex-col md:flex-row  justify-between">
       

  <div className=" md:flex md:flex-col">
  <h3 className="block md:inline-block">
    Customer Service
  </h3>
  <a href="#" className="text-sm  mt-2" target="_blank">
    Customer Support
  </a>
  <a href="#" className="text-sm  mt-2" target="_blank">
    Help Center
  </a>
</div>





      
        <div className=" md:flex md:flex-col">
  <h3 className="block md:inline-block">
   Inquiry  
  </h3>
  <a href="#" className="text-sm  mt-2" target="_blank">
   Ship
  </a>
  <a href="#" className="text-sm  mt-2" >
    Get Quote
  </a>
   <a href="#" className="text-sm  mt-2" >
   Track
  </a>
</div>

    
        <div className="md:flex md:flex-col">
  <h3 className="block md:inline-block">
   Contact Us  
  </h3>
  <a href="#" className="text-sm  flex 
        flex-row 
      
  
        hover:text-neutral-800
        transition
        cursor-pointer mt-2" target="_blank">

           <BiSolidPhone size={26} />
      <span className="font-medium text-sm">

       +254 000 000 777 / +254 000 000 888 
      </span>


  </a>
  <a href="#" className="text-sm  flex 
        flex-row 
        
  
       
        transition
        cursor-pointer mt-22" >

               <BiLogoGmail size={26} />
      <span className="font-medium text-sm">

       ke.info@dashdelivery.com 
      </span>

  
  </a>
    <a href="#" className="text-sm  flex 
        flex-row 
 
       
        transition
        cursor-pointer mt-22" >

               <BiSolidTime size={26} />
      <span className="font-medium text-sm">

       Mon-Fri 8:00am-6:00pm, Sat 8:00am-2:00pm 
      </span>

  
  </a>
</div>




      </div>

      <div className="w-full  mt-10 relative font-medium border-t border-solid border-light py-6 px-8 flex  flex-col md:flex-row items-center justify-between">
        <span className="text-center">
          &copy;2023 DashDelivery. All rights reserved.
        </span>
   
      
</div>
    </footer>
    </>
  )
}

export default Footer
