import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useMemo, useState } from "react";
import { categories } from './navbar/Categories';
import { amenities } from "../utils/amenities"

import useRentModal from '../hooks/useRentModal';
import Map from "./Map"
import { url } from "../utils/url"

import Input from "./inputs/Input";

import Counter from "./inputs/Counter";
import CountrySelect from "./inputs/CountrySelect";
import ImageUpload from './inputs/ImageUpload';
import MenuItem from "./navbar/MenuItem";
import Heading from "./Heading";
import Button from "./Button";
import CategoryInput from './inputs/CategoryInput';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
const STEPS = {
  CATEGORY: 0,
   LOCATION: 1,
  AMENITIES: 2,
  
 


};

function Listing({ footer, disabled, secondaryAction }) {
  const rentModal = useRentModal();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);
  const { currentUser } = useSelector((state) => state.currentUser);
 const [items, setItems] = useState([{ id: 1 }]); // Initial item
 let navigate = useNavigate();
  const addItem = () => {
    const newItem = { id: items.length + 1 };
    setItems([...items, newItem]);
  };

  const removeItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const onBack = () => {
    setStep((value) => value - 1);
  }

  const onNext = () => {
    setStep((value) => value + 1);
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.AMENITIES) {
      return 'Create';
    }

    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return 'Back';
  }, [step]);

  const handleSecondaryAction = () => {
    if (secondaryAction) {
      secondaryAction();
    } else {
      onBack();
    }
  };

  const onSubmit = async (data) => {
    if (step !== STEPS.AMENITIES) {
      return onNext();
    }
    // setIsLoading(true);
    // console.log('data', data);
    navigate('/loader')

    // axios.post(`${url}/listings`, data)
    //   .then(() => {
    //     toast.success('Listing created!');
    //     setStep(STEPS.CATEGORY);
    //     rentModal.onClose();
    //   })
    //   .catch(() => {
    //     toast.error('Something went wrong.');
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   })
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
      category: '',
      amenity:[],
      location_value: null,
      guest_count: 1,
      room_count: 1,
      bathroom_count: 1,
      user_id:currentUser?.id,
      image_src: '',
      price: 1,
      title: '',
      description: '',
    }
  });
  const setCustomValue = (id, value) => {
    setValue('user_id', currentUser?.id);
    setValue('amenity', selectedAmenities)
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



  const location_value = watch('location_value');
  const category = watch('category');
  const guest_count = watch('guest_count');
  const room_count = watch('room_count');
  const bathroom_count = watch('bathroom_count');
  const image_src = watch('image_src');

  let bodyContent = (
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
              onClick={(category) => 
                setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )

   if (step === STEPS.AMENITIES) {

bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Information Of the Parcel"
       
      />



 <div>
      {items.map((item) => (
        <div
          key={item.id}
          className="
            grid 
            grid-cols-1 
            md:grid-cols-2 
            gap-3
            max-h-[50vh]
            overflow-y-auto
          "
        >
          <div className="flex flex-row gap-4">
            <div className="w-full">
              <Input
                id={`goods-name-${item.id}`}
                label="Goods Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                // required
              />
            </div>
            <div className="w-full">
              <Input
                id={`quantity-${item.id}`}
                label="Quantity"
                disabled={isLoading}
                register={register}
                errors={errors}
                // required
              />
            </div>
            <div className="w-full">
              <Input
                id={`weight-${item.id}`}
                label="Weight (Kg)"
                disabled={isLoading}
                register={register}
                errors={errors}
                // required
              />
            </div>
            <div className="w-full">
              <Input
                id={`length-${item.id}`}
                label="Length (Cm)"
                disabled={isLoading}
                register={register}
                errors={errors}
                // required
              />
            </div>
          </div>
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      <button onClick={addItem}>Add Item</button>
    </div>

    </div>
  )





}




  if (step === STEPS.LOCATION) {
    bodyContent = (
<div className="flex flex-col gap-1">
  <Heading
    title="Information Of Sending"
    subtitle="Information Of Sending"
  />
  <div className="flex flex-row gap-4">
    <div className="w-full">
      <Input
        id="title"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        // required
      />
    </div>
    <div className="w-full">
      <Input
        id="title"
        label="Company"
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
      <CountrySelect 
      value={location_value} 
      onChange={(value) => setCustomValue('location_value', value)} 
    />

    </div>

     <div className="w-full">
      <Input
        id="title"
        label="Province"
        disabled={isLoading}
        register={register}
        errors={errors}
        // required
      />

    </div>
    <div className="w-full">
      <Input
        id="title"
        label="Pickup Address"
        disabled={isLoading}
        register={register}
        errors={errors}
        // required
      />
    </div>
  



  </div>

   <div className="flex flex-row gap-4">


    <div className="w-full">
      <Input
        id="Contact Number"
        label="Contact Number"
        disabled={isLoading}
        register={register}
        errors={errors}
        // required
      />
    </div>
    <div className="w-full">
      <Input
        id="title"
        label="E-mail"
        disabled={isLoading}
        register={register}
        errors={errors}
        // required
      />
    </div>




  </div>
  <Heading
   
    subtitle="Information Of Receiving"
  />
  <div className="flex flex-row gap-4">
    <div className="w-full">
      <Input
        id="title"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        // required
      />
    </div>
    <div className="w-full">
      <Input
        id="title"
        label="Company"
        disabled={isLoading}
        register={register}
        errors={errors}
        // required
      />
    </div>


      <Input
        id="title"
        label="Receiver Address"
        disabled={isLoading}
        register={register}
        errors={errors}
        // required
      />

  </div>
    <div className="flex flex-row gap-4">
    <div className="w-full">
      <CountrySelect 
      value={location_value} 
      onChange={(value) => setCustomValue('location_value', value)} 
    />

    </div>

     <div className="w-full">
       <Input
        id="title"
        label="Province"
        disabled={isLoading}
        register={register}
        errors={errors}
        // required
      />

    </div>
    <div className="w-full">
      <Input
        id="title"
        label="Pickup Address"
        disabled={isLoading}
        register={register}
        errors={errors}
        // required
      />
    </div>
  



  </div>

   <div className="flex flex-row gap-4">


    <div className="w-full">
      <Input
        id="Contact Number"
        label="Contact Number"
        disabled={isLoading}
        register={register}
        errors={errors}
        // required
      />
    </div>
    <div className="w-full">
      <Input
        id="title"
        label="E-mail"
        disabled={isLoading}
        register={register}
        errors={errors}
        // required
      />
    </div>




  </div>
  
</div>


    );
  }

  

 



  return (
    <>
      <div
        className="flex justify-center items-center h-screen w-full"
      >
      {bodyContent}
      <div className="flex flex-col gap-2 p-6">
        <div
          className="
            flex
            flex-row
            items-center
            gap-4
            w-full
          "
        >
          {step !== STEPS.CATEGORY && (
            <Button
              disabled={disabled}
              label={secondaryActionLabel}
              onClick={handleSecondaryAction}
              outline
            />
          )}
          <Button
            disabled={disabled}
            label={actionLabel}
            onClick={handleSubmit(onSubmit)}
          />
        </div>
        {footer}
      </div>
      </div>
    </>
  )
}

export default Listing;
