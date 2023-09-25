import { useCallback } from "react";
import { TbPhotoPlus } from 'react-icons/tb'
import {useEffect,useRef } from 'react'

function ImageUpload({
  onChange,
  value
}) {


    const cloudRef= useRef()
    const widgetRef= useRef()

    useEffect(() => {
      cloudRef.current = window.cloudinary;
      widgetRef.current = cloudRef.current.createUploadWidget({
        cloudName:'doammcpie',
        uploadPreset:'f74sa5g1'
      }, function(error,result){
        if (!error && result && result.event === 'success') {
        onChange(result.info.secure_url);
      }

      })

    },[])


  return (
<div
            onClick={() => widgetRef.current.open() }
            className="
              relative
              cursor-pointer
              hover:opacity-70
              transition
              border-dashed 
              border-2 
              p-20 
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-neutral-600
            "
          >
            <TbPhotoPlus
              size={50}
            />
            <div className="font-semibold text-lg">
              Click to upload
            </div>
            {value && (
              <div className="
              absolute inset-0 w-full h-full">
                <img
                  className="h-full w-full"
                  style={{ objectFit: 'cover' }} 
                  src={value} 
                  alt="House" 
                />
              </div>
            )}
          </div>
    
  )
}

export default ImageUpload
