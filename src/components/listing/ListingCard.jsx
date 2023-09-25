import HeartButton from "../HeartButton";
import Button from "../Button";

import { useNavigate } from "react-router-dom";

function ListingCard({
  image,
  description,

  label,
   icon: Icon,
}) {
 
 let navigate = useNavigate();

  return (
    <>

    
        <div 
          className="
            aspect-square 
            w-full 
   group-hover:scale-110 
              transition
            relative 
        
            rounded-xl
          "
        >
          <img
        
            className="
            h-[40vh]
           
            "
            src={image}
            alt="Listing"
          />
          <div className="
            absolute
            top-3
            left-3
          ">
              <div 
        
        className="
          p-4
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          bg-white 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
        
          <div className="hidden md:block">
         

             <Icon size={35}  />
              
             </div>

                     <div className="
      text-lg font-light justify-center text-neutral-500">
        {label}
      </div>

        </div>
        
          </div>
              <div className="
      text-lg font-light justify-center text-neutral-500">
        {description}
      </div>
        </div>
        
  
  
    </>
  )
}

export default ListingCard
