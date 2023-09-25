import { BiSearch } from 'react-icons/bi';
import { useMemo } from 'react';
import { differenceInDays } from 'date-fns';
import { useForm } from 'react-hook-form'
import SearchInput from "../inputs/SearchInput";
import useSearchModal from '../../hooks/useSearchModal';
import useCountries from '../../hooks/useCountries';










function Search() {
 const searchModal = useSearchModal();
  const params = new URLSearchParams();
   const { register, handleSubmit } = useForm()
  const { getByValue } = useCountries();

  const  locationValue = params?.get('locationValue'); 
  const  startDate = params?.get('startDate');
  const  endDate = params?.get('endDate');
  const  guestCount = params?.get('guestCount');

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue)?.label;
    }

    return 'Anywhere';
  }, [locationValue, getByValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return 'Any Week'
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return 'Add Guests';
  }, [guestCount]);








  return (
    <>
 <div
     
      className="
        border-[1px] 
        w-full 
        md:w-auto 
        py-2 
         bg-white 
        rounded-full 
        shadow-sm 
        hover:shadow-md 
        transition 
        cursor-pointer
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
            items-center 
            gap-3
          "
        >
                 <SearchInput
        id="email"
        label="Enter your tracking number(s)"
      register={register}
        required
      />
     
          <div 
            className="
              p-2 
              bg-rose-500 
              rounded-full 
              text-white
            "
          >
            <BiSearch size={18} />
          </div>
        </div>
   
    </div>
    </>
  )
}

export default Search
