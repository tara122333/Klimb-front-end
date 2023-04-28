import React, { useState } from 'react'
import axios from 'axios';
import { BsCloudUpload } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';

const UploadFile = () => {

    const [file, setFile] = useState();
    const [succ, setSucc] = useState(false);
    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const hiddenFileInput = React.useRef(null);
    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const handleUploadClick = async () => {
        if (!file) {
            toast.error("Please upload excel file");
            return;
        }
        const extension = file.name.split('.').pop();
        if (extension === 'xlsx') {
            const formData = new FormData();
            formData.append("file", file);
            const response = await axios.post('http://localhost:4000/upload', formData);

            if (response.status === 200) {
                setSucc(true);
                toast.success("Data store in database");
            }
            else {
                console.log(response.error);
                toast.error("Data not store in database");
            }
        }
        else {
            toast.error("File extension must be xlsx");
        }
    };

    return (
        <>
            <ToastContainer />
            <div className='w-full flex justify-center items-center'>
                <div className='w-full lg:w-3/4 py-5'>
                    <div className='bg-yellow-500 text-white'>
                        <h1 className='text-lg px-5 py-2'>Add from Excel</h1>
                    </div>
                    <div className='py-4 lg:py-8 px-2'>
                        <div className='py-8'>
                            <p className='font-bold'>Add candidates to database</p>
                        </div>
                        {
                            succ ? (
                                <>
                                    <div className='flex flex-col justify-center items-center gap-4 py-20 border-2 border-dashed'>
                                        <span className='text-green-500 font-bold text-xl'>Thank you !</span>
                                        <p className='font-semibold'> ✅ File Successfully Uploaded</p>
                                        <p className='font-semibold'>Your records will be processed shortly</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className='flex justify-center items-center flex-col border-2 border-dashed h-96 gap-5'>
                                        <div onClick={handleClick} className='bg-black text-white rounded-full p-2 font-bold w-12 h-12 flex justify-center items-center lg:w-16 lg:h-16 cursor-pointer'>
                                            {/* icon */}
                                            <BsCloudUpload className='text-4xl' />
                                        </div>
                                        <input type="file" onChange={handleFileChange} className='hidden' ref={hiddenFileInput} />

                                        <div>{file && `${file.name} - ${file.type}`}</div>
                                        {
                                            file && <div className='bg-green-500 px-6 rounded-md py-1 text-white text-lg'>
                                                <button onClick={handleUploadClick}>Upload</button>
                                            </div>
                                        }
                                        <div>
                                            <p className='font-semibold'>click here.. And upload a .xlsx or .xls file here</p>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default UploadFile