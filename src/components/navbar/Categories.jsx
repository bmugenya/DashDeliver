import { useParams, useLocation } from 'react-router-dom';

import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { MdOutlineFavorite } from 'react-icons/md';
import { 
  GiBarn, 
  GiBoatFishing, 
  GiCactus, 
  GiCaveEntrance, 
  GiForestCamp, 
  GiIsland,
  GiWindmill
} from 'react-icons/gi';

import { MdGolfCourse } from 'react-icons/md';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';
import { BiSolidCool } from 'react-icons/bi';
import { BiSolidCrown } from 'react-icons/bi';
import { BiSolidShip } from 'react-icons/bi';
import { BiSolidTruck } from 'react-icons/bi';

import { BiSolidFolder } from 'react-icons/bi';
import { BiSolidCube } from 'react-icons/bi';

import { BiSolidBriefcaseAlt2 } from 'react-icons/bi';
import { BiSolidBriefcase } from 'react-icons/bi';
import CategoryBox from "../CategoryBox";
import Container from '../Container';


export const categories = [
  {
    label: 'New Customer',
    icon: BiSolidCool,
    description: 'New Customer',
  },

  {
    label: 'Regular Customer',
    icon: BiSolidCrown,
    description: 'Regular Customer'
  },
  {
    label: 'International Shipping',
    icon: BiSolidShip,
    description: 'This property is near a lake!'
  },
  {
    label: 'Domestic Shipping',
    icon: BiSolidTruck,
    description: 'This property is in the countryside!'
  },
  {
    label: 'Business customer',
    icon: BiSolidBriefcaseAlt2,
    description: 'This is property has a beautiful pool!'
  },
  {
    label: 'Individual customer',
    icon: BiSolidBriefcase,
    description: 'This property is on an island!'
  }

  ,
  {
    label: 'Documents',
    icon: BiSolidFolder,
    description: 'This is property has a beautiful pool!'
  },
  {
    label: 'Packages',
    icon: BiSolidCube,
    description: 'This property is on an island!'
  }
]



function Categories() {

  const params = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');


  return (
    <>
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
        {categories.map((item) => (
          <CategoryBox 
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
    </>
  )
}

export default Categories
