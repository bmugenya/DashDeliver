import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import useLoginModal from "../../hooks/useLoginModal";
import useRegisterModal from "../../hooks/useRegisterModal";
import { useCallback, useState } from "react";
import useRentModal from "../../hooks/useRentModal";
import MenuItem from "./MenuItem";

import { useNavigate } from "react-router-dom";

function UserMenu({currentUser}) {
 
  const loginModal = useLoginModal();
const registerModal = useRegisterModal();
  const rentModal = useRentModal();

   const [isOpen, setIsOpen] = useState(false);
    
    const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [loginModal, rentModal, currentUser]);

 let navigate = useNavigate();



  return (
    <>
 <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div 
         onClick={() => navigate('/listings')}
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
           Customer Service
        </div>
        <div 
         onClick={toggleOpen}
        className="
          p-4
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.avatar_url} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div 
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem 
                  label="My trips" 
                   onClick={() => navigate('/trips')}
                />
                <MenuItem 
                  label="My favorites" 
                   onClick={() => navigate('/favorites')}
                />

                <MenuItem 
                  label="My properties" 
                  onClick={() => navigate('/properties')}
                />
  
                <MenuItem 
                  label="Add a new Listing" 
                  onClick={rentModal.onOpen}
                />
                <hr />
                <MenuItem 
                  label="Logout" 
                  // onClick={() => signOut()}
                />
              </>
            ) : (
              <>
                <MenuItem 
                  label="Login" 
                  onClick={loginModal.onOpen}
                />
                <MenuItem 
                  label="Sign up" 
                  onClick={registerModal.onOpen}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
    </>
  )
}

export default UserMenu
