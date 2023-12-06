import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { BiSolidChevronDown } from 'react-icons/bi';
import Container from "../Container";
import UserMenu from "./UserMenu";
import { useSelector } from 'react-redux'


function Admin() {
 let navigate = useNavigate();
   const [isOpen, setIsOpen] = useState(false);
    const { currentUser } = useSelector((state) => state.currentUser)
     const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <>
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div
        className="
          py-4 
          border-b-[1px]
        "
      >
      <Container>
        <div 
          className="
            flex 
            flex-row 
            items-center 
            justify-between
            gap-3
            md:gap-0
          "
        >
     

  <div className="flex flex-row items-center gap-3">

     

            <div 
         onClick={() => navigate('/dispatch')}
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
          Dispatch 
        </div>
        <div 
         onClick={() => navigate('/orders')}
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
          Orders
        </div>







    <div 
         onClick={() => navigate('/drivers')}
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
          Drivers



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
          Map
        </div>
   </div>











 
        
          <UserMenu currentUser={currentUser}/>
        </div>
      </Container>
      

    </div>
  
  </div>
    </>
  )
}

export default Admin
