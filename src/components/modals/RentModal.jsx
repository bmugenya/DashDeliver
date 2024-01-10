import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useMemo, useState } from "react";
import { categories } from '../navbar/Categories';

import Select from 'react-select';
import useRentModal from '../../hooks/useRentModal';
import Map from "../Map"
import { url } from "../../utils/url"
import subCountiesData from '../../utils/sub_counties.json'; 
import Modal from "./Modal";
import Input from "../inputs/Input";
import { useDispatch, useSelector } from 'react-redux'
import Counter from "../inputs/Counter";
import CountrySelect from "../inputs/CountrySelect";
import ImageUpload from '../inputs/ImageUpload';
import { getShipmentsAsync } from "../../features/listings/listingsActions";
import Heading from "../Heading";
import Button from "../Button";
import CategoryInput from '../inputs/CategoryInput';
import { useForm } from 'react-hook-form';


const STEPS = {
  CATEGORY:0,
RECEIVING: 2,
  PARCEL: 1,
  loading:3,
  
 


};

function RentModal() {
 
  const rentModal = useRentModal();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.currentUser);


  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  

 const [subCounties, setSubCounties] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
const [selectedCounty, setSelectedCounty] = useState(null);
const [selectedConstituency, setSelectedConstituency] = useState(null);
const [selectedWard, setSelectedWard] = useState(null);
 const [subRCounties, setRSubCounties] = useState([]);
  const [selectedCRountry, setRSelectedCountry] = useState(null);
  const [selectedPRrovince, setRSelectedProvince] = useState(null);
const [selectedRCounty, setRSelectedCounty] = useState(null);
const [selectedRConstituency, setRSelectedConstituency] = useState(null);
const [selectedRWard, setRSelectedWard] = useState(null);
const [senderLocation, setSenderLocation] = useState(null);
const [recieverLocation, setRecieverLocation] = useState(null);



const [senderCordinates, setSenderCordinates] = useState([]);
const [recieverCordinates, setRecieverCordinates] = useState([]);



const handleWardChange = async (selectedOption) => {
 
    setRSelectedWard(selectedOption);

     setSenderLocation(`Kenya,${sender_county.label},${selectedConstituency?.value},${selectedWard?.value}`)
    setRecieverLocation(`Kenya,${selectedRCounty.label},${selectedRConstituency?.value},${selectedRWard?.value}`)

    try {
      const response = await fetch(`${url}/geocode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderLocation: senderLocation,
          receiverLocation: recieverLocation
        }),
      });

      // Handle the response as needed
      const data = await response.json();
      setSenderCordinates(data.senderCoordinates)
      setRecieverCordinates(data.receiverCoordinates)

    } catch (error) {
      console.error('Error fetching geocode:', error);
      // Handle errors
    }
 
};




const handleCountryChange = (value) => {
  setCustomValue('sender_county', value);
  setSelectedCounty(value);


  setSelectedProvince(null);


  const selectedCountyData = subCountiesData.find((county) => county.countyCode === value?.value);

  const constituencies = selectedCountyData ? selectedCountyData.constituencies : [];

  setSubCounties(constituencies);


};
console.log(senderCordinates)

const handleRCountryChange = (value) => {
  setCustomValue('reciever_country', value);
  setRSelectedCounty(value);
  setRSelectedProvince(null);

  const selectedCountyData = subCountiesData.find((county) => county.countyCode === value?.value);
  const constituencies = selectedCountyData ? selectedCountyData.constituencies : [];

  setRSubCounties(constituencies);


};



  const onBack = () => {
    setStep((value) => value - 1);
  }

const onNext = async () => {
 

  setStep((value) => value + 1);
};

  const actionLabel = useMemo(() => {
    if (step === STEPS.RECEIVING) {
      return 'Create'
    }

    return 'Next'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }

    return 'Back'
  }, [step]);


 const onSubmit = async (data) => {
    if (step !== STEPS.RECEIVING) {
      return onNext();
    }
 
    setCustomValue('sender_location', senderLocation);
      setCustomValue('sender_coordinates', senderCordinates);

      setCustomValue('reciever_location', recieverLocation);
      setCustomValue('reciever_coordinates', recieverCordinates);



    axios.post(`${url}/shipment`, data)
      .then(() => {
        toast.success('Shipment created!');
       
         rentModal.onClose();
      })
      .catch(() => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
         dispatch(getShipmentsAsync(data.user_id))
        setIsLoading(false);
      })
   
  }

  
  const { 
    register, 
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
    reset,
  } = useForm({
    defaultValues: {

      user_id:currentUser?.id,
      sender_name: '',
      sender_contact: '',
      pickup_time: '',

       pickup_address: '',
      details:[],
      parcel:'',

      sender_location: '',
      reciever_location: '',

      sender_coordinates: '',
      reciever_coordinates: '',


      reciever_name: '',
      reciever_contact: '',
      reciever_email: '',

      drop_address:'',
       quantity:'',
        weight:'',


    }
  });
  const setCustomValue = (id, value) => {
    setValue('user_id', currentUser?.id);
    setValue('details', selectedAmenities)
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }






  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const handleAmenityClick = (label) => {
    if (selectedAmenities.includes(label)) {
      setSelectedAmenities(selectedAmenities.filter((amenity) => amenity !== label));
    } else {
      setSelectedAmenities([...selectedAmenities, label]);
    }
  };


  const sender_location = watch('sender_location');
  const reciever_location = watch('reciever_location');
  const sender_coordinates = watch('sender_coordinates');
  const reciever_coordinates = watch('reciever_coordinates');
  const sender_name = watch('sender_name');
  const sender_contact = watch('sender_contact');
  const pickup_time = watch('pickup_time');
  const sender_county = watch('sender_county');
  const sender_province = watch('sender_province');
  const details = watch('details');
 const sender_ward = watch('sender_ward');
  const reciever_ward = watch('reciever_ward');
 const user_package = watch('user_package');
  const reciever_name = watch('reciever_name');
  const reciever_contact = watch('reciever_contact');
  const reciever_email = watch('reciever_email');
  const reciever_country = watch('reciever_country');
  const reciever_province = watch('reciever_province');

  const drop_address = watch('drop_address');
  const quantity = watch('quantity');
  const size = watch('size');






  let  bodyContent = (
    
     
    <div className="flex flex-col gap-8">
      <Heading
        title="Ship"
        subtitle="To Help You More Accurately, Please Answer the Following Questions."
      />
      <div 
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >

              {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={handleAmenityClick}
              selected={selectedAmenities.includes(item.label)}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}



      </div>
    </div>






    );



  if (step === STEPS.RECEIVING) {
    bodyContent = (
    <div className="flex flex-col gap-8">

  <Heading

    subtitle="Deliver from - Deliver to"
  />
  
  <div className="flex flex-row gap-4">
    <div className="w-full">
      <CountrySelect 
      value={sender_county} 
     onChange={handleCountryChange}
    />

    </div>

     <div className="w-full">


<Select
  placeholder="Select Constituency"
  isClearable
  options={subCounties.map((constituency) => ({
    value: constituency.name,
    label: constituency.name,
     wards: constituency.wards,
  }))}
  value={selectedConstituency}
  onChange={(value) => setSelectedConstituency(value)}
  classNamePrefix="react-select"
  className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
  theme={(theme) => ({
    ...theme,
    borderRadius: 6,
    colors: {
      ...theme.colors,
      primary: 'black',
      primary25: '#ffe4e6',
    },
  })}
  menuPlacement="bottom"
/>



    </div>
    <div className="w-full">
   <Select
    placeholder="Select Ward"
    isClearable
    options={selectedConstituency ? selectedConstituency?.wards?.map((ward) => ({
      value: ward,
      label: ward,
    })) : []}
    value={selectedWard}
   onChange={(value) => setSelectedWard(value)}
    classNamePrefix="react-select"
    className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
    theme={(theme) => ({
      ...theme,
      borderRadius: 6,
      colors: {
        ...theme.colors,
        primary: 'black',
        primary25: '#ffe4e6',
      },
    })}
    menuPlacement="bottom"
  />
    </div>
  



  </div>



    <div className="flex flex-row gap-4">
    <div className="w-full">
      <CountrySelect 
      value={reciever_country} 
      onChange={handleRCountryChange} 
    />

    </div>

     <div className="w-full">


<Select
  placeholder="Select Constituency"
  isClearable
  options={subRCounties.map((constituency) => ({
    value: constituency.name,
    label: constituency.name,
     wards: constituency.wards,
  }))}
  value={selectedRConstituency}
  onChange={(value) => setRSelectedConstituency(value)}
  classNamePrefix="react-select"
  className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
  theme={(theme) => ({
    ...theme,
    borderRadius: 6,
    colors: {
      ...theme.colors,
      primary: 'black',
      primary25: '#ffe4e6',
    },
  })}
  menuPlacement="bottom"
/>



    </div>
    <div className="w-full">
   <Select
    placeholder="Select Ward"
    isClearable
    options={selectedRConstituency ? selectedRConstituency?.wards?.map((ward) => ({
      value: ward,
      label: ward,
    })) : []}
    value={selectedRWard}
    onChange={handleWardChange} 
    classNamePrefix="react-select"
    className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
    theme={(theme) => ({
      ...theme,
      borderRadius: 6,
      colors: {
        ...theme.colors,
        primary: 'black',
        primary25: '#ffe4e6',
      },
    })}
    menuPlacement="bottom"
  />
    </div>

</div>

  <>
      {senderCordinates.length > 0 && recieverCordinates.length > 0 && (
        <Map senderCoordinates={senderCordinates} receiverCoordinates={recieverCordinates} height={50} />
      )}
    </>


    </div>
  )

}






   if (step === STEPS.PARCEL) {
    bodyContent = (
<div className="flex flex-col gap-1">
      <Heading
        title="Information Of Sending"
        subtitle="Pick-up From"
      />

      <div className="flex flex-row gap-4">
        <div className="w-full">
          <Input
              id="sender_name"
              label="Name"
              disabled={isLoading}
              register={register}
              errors={errors}
          />
        </div>


 
    <div className="w-full">
      <Input
        id="sender_contact"
        label="Contact Number"
        disabled={isLoading}
        register={register}
        errors={errors}
        // required
      />
    </div>




<select id="countries" class=" border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 ">
 <option>Schedule a Pickup Time</option>
  <option>24 hours</option>
  <option>48 hours</option>

</select>

  </div>
  

    <div className="flex flex-row gap-4">


            <div className="w-full">
              <Input
                id="parcel"
                label="Goods Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                // required
              />
            </div>
            <div className="w-full">
              <Input
                id="quantity" 
                label="Quantity"
                disabled={isLoading}
                register={register}
                errors={errors}
                // required
              />
            </div>
            <div className="w-full">
              <Input
                id="weight" 
                label="Weight (Kg)"
                disabled={isLoading}
                register={register}
                errors={errors}
                // required
              />
            </div>
 </div>
             <Heading
 
    subtitle="Deliver to"
  />
  <div className="flex flex-row gap-4">
 


  <div className="flex flex-row gap-4">
    <div className="w-full">
      <Input
        id="reciever_name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        // required
      />
    </div>




    <div className="w-full">
      <Input
        id="reciever_contact"
        label="Contact Number"
        disabled={isLoading}
        register={register}
        errors={errors}
        // required
      />
    </div>





    <div className="w-full">
      <Input
        id="reciever_email"
        label="E-mail"
        disabled={isLoading}
        register={register}
        errors={errors}
        // required
      />
    </div>

</div>



    </div>


  </div>


  



  )

}

  

  if (step === STEPS.loading) {
    bodyContent = (
<div className="w-full h-full">
     <img
                  className="h-full w-full"
                  style={{ objectFit: 'cover' }} 
                  src="/images/anim.gif"
                  alt="House" 
                />
 </div>


  )





}
 

  return (
    <>
   <Modal
      disabled={isLoading}
      isOpen={rentModal.isOpen}
      title="Add a new parcel"
       actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
       secondaryActionLabel={secondaryActionLabel}
       secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={rentModal.onClose}
      body={bodyContent}
    />
    </>
  )
}

export default RentModal
