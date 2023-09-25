import qs from 'query-string';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback } from 'react';


function CategoryBox({ icon: Icon,label, selected}) {
  
  const history = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);




 const handleClick = (label) => {
  console.log(label)
    //   let currentQuery = {};
    //   console.log(label)

    //   if (searchParams) {
    //     currentQuery = qs.parse(searchParams.toString());
    //   }

    //   const updatedQuery = {
    //     ...currentQuery,
    //     category: label,
    //   };

    //   if (searchParams?.get('category') === label) {
    //     delete updatedQuery.category;
    //   }

    //   console.log(updatedQuery)

    //   const url = qs.stringifyUrl(
    //     {
    //       url: '/',
    //       query: updatedQuery,
    //     },
    //     { skipNull: true }
    //   );

    //   history(url);
    }
    // [label, history, searchParams]


  return (
    <>
<div
      onClick={handleClick}
      className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">
        {label}
      </div>
    </div>
    </>
  )
}

export default CategoryBox
