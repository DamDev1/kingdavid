import React from 'react'
import { FaTimes } from 'react-icons/fa';

interface UploadImageProps {
    setSelectedImageFile:React.Dispatch<React.SetStateAction<File[]>>;
    selectedImageFile:File[]
  }
  
export default function UploadImage({setSelectedImageFile, selectedImageFile}:UploadImageProps) {
    // const [selectedImageFile, setSelectedImageFile] = useState<File[]>([]);

    const onFileSelected = (event:React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return; // Ensure files exist

        const files = Array.from(event.target.files); // Convert FileList to an array
        setSelectedImageFile((prev) => [...prev, ...files]);
    };

    const handleDeleteImage = (image:object) =>{
        const result = selectedImageFile.filter((item)=> item!=image)
        setSelectedImageFile(result);
    }
    

    // useEffect(() =>{
    //     console.log(selectedImageFile)
    // },[onFileSelected])
  return (
    <div>
        <h2 className='font-medium text-xl my-6'>Upload Cars Images</h2>
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5'>
            {selectedImageFile && selectedImageFile.map((image, index) =>(
                <div key={index} className='relative'>
                    <h2 className='absolute right-0 bg-red-500 rounded-full m-2 w-[20px] h-[20px] text-[14px] text-center text-white cursor-pointer flex justify-center items-center' onClick={() => handleDeleteImage(image)}><FaTimes/></h2>
                    <img src={URL.createObjectURL(image)} alt="" className='w-full h-[130px] object-cover bg-center rounded'/>
                </div>
            ))}
            <label htmlFor='upload-images'>
                <div className='border rounded-xl border-dotted border-blue-600 bg-blue-100 p-10 cursor-pointer'>
                    <h2 className='text-lg text-center text-blue-600'>+</h2>
                </div>
            </label>
            <input type="file" accept="image/*" multiple id="upload-images" className='opacity-0' onChange={onFileSelected}/>
        </div>
    </div>
  )
}
