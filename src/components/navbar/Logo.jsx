import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { BiSolidChevronDown } from 'react-icons/bi';

function Logo() {
 let navigate = useNavigate();
   const [isOpen, setIsOpen] = useState(false);
    
     const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
   <>
         <div className="flex flex-row items-center gap-3">

             <img
      onClick={() => navigate('/')}
      className="hidden md:block cursor-pointer" 
      src="/images/das.png" 
      height="100" 
      width="100" 
      alt="DashDelivery" 
    />

            <div 
         onClick={() => navigate('/')}
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          Home 
        </div>
        <div 
         onClick={() => navigate('/track')}
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          Track
        </div>






              <div 
        
        className="
        
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
 <BiSolidChevronDown  onClick={toggleOpen}/>
       
      
      {isOpen && (
        <div 
          className="
            absolute 
            rounded-xl 
            shadow-md
            
            bg-white 
            overflow-hidden 
          
            top-12 
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
          
              <>
      <div 
         onClick={() => navigate('/ship')}
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          Ship Now 
        </div>

              <div 
         onClick={() => navigate('/parcel')}
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          My parcel 
        </div>
              </>
           
          </div>
        </div>
      )}
    </div>


    <div 
       
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            flex-row
          
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          Shipping



        </div>





            <div 
         onClick={() => navigate('/about')}
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
         
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          About
        </div>
   </div>
    </>
  )
}

export default Logo
