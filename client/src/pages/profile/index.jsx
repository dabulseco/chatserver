import { useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { useAppStore } from '@/store';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { colors, getColor } from '@/lib/utils';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
import { apiClient } from '@/lib/api-client';
import { UPDATE_USER_INFO_URL } from '@/utils/constants';
import { useEffect } from 'react';
import { ADD_PROFILE_IMAGE_ROUTE, DELETE_PROFILE_IMAGE_ROUTE, HOST } from '../../utils/constants';

const Profile = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0)
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (userInfo) {
      setFirstName(userInfo.firstName || '');
      setLastName(userInfo.lastName || '');
      setImage(userInfo.images || null);
      setSelectedColor(userInfo.color || 0);
    }
  }, [userInfo]);

  const validateProfile = () => {
    if (!firstName || !lastName || selectedColor === undefined) {
      toast.error('All fields are required');
      return false;
    }
    return true;
  }

  const saveChanges = async () => {
    if (!validateProfile()) return;

    try {
      apiClient
      const response = await apiClient.post(UPDATE_USER_INFO_URL, 
        {firstName, lastName, images: image, color: selectedColor}, 
        { withCredentials: true }
      );

      if (response.status === 200 && response.data) {
        setUserInfo(response.data);
        toast.success('Profile updated successfully');
      }
      navigate('/chat');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };
  const handleNavigateBack = () => {
    if(userInfo.profileSetup) {
      navigate('/chat');
    } else {
      toast.error('Please complete your profile setup first');
    }
  };

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const fromData = new FormData();
      fromData.append('profile-image', file);
      const response = await apiClient.post(ADD_PROFILE_IMAGE_ROUTE, fromData, { withCredentials: true });
      if (response.status === 200 && response.data) {
        setImage(response.data.images);
        setUserInfo({ ...userInfo, images: response.data.images });
        console.log(userInfo)
        toast.success('Profile image updated successfully');
      } else {
        toast.error('Failed to upload profile image');
      }
      // const reader = new FileReader();
      // reader.onloadend = () => {
      //   setImage(reader.result);
      // };
      // reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = async (e) => {
    if(!image) return;
    try {
      const response = await apiClient.delete(DELETE_PROFILE_IMAGE_ROUTE, { withCredentials: true });
      if (response.status === 200 && response.data) {
        setImage(null);
        setUserInfo({ ...userInfo, images: null });;
        console.log(userInfo)
        toast.success('Profile image deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting profile image:', error);
      toast.error('Failed to delete profile image');
    }
  }

  return (
    <div className="bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-[80xw] md:w-max">
        <div onClick={handleNavigateBack}>
          <IoArrowBack className="text-amber-400/90 text-3xl lg:text-6xl cursor-pointer"/>
        </div>
        <div className='grid grid-cols-2'>
          <div className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
              {
                image ? <AvatarImage src={`${HOST}/${userInfo.images}`} alt="Profile Image" className="object-cover w-full h-full bg-black" /> :
                <div className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center 
                rounded-full ${getColor(selectedColor)}`}>
                  {firstName 
                    ? firstName.split('').shift()
                    : userInfo.email.split('').shift()}
                </div>
              }
            </Avatar>
            {hovered && (
              <div className='absolute inset-0 flex items-center justify-center bg-black/50 rounded-full ring-fuchsia-50'
                onClick={image ? handleImageDelete : handleFileInputClick}
              >
                {image ? (
                  <FaTrash className='text-white text-3xl cursor-pointer'/>
                ) : (
                  <FaPlus className='text-white text-3xl cursor-pointer'/>
                )}
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} className='hidden' 
              onChange={handleImageUpload} 
              name="profile-image" 
              accept=".png .jpg .jpeg .svg .webp"/>
          </div>
          <div className="flex min-w-32 md:min-w-64 flex-col gap-4 text-white items-center justify-center">
            <div className="w-full">
              <Input 
                placeholder="Email" 
                type="email" 
                value={userInfo.email} 
                disabled
                className="rounded-lg p-6 bg-[#2c2e3b] border-none" 
              />
            </div>
            <div className="w-full">
              <Input 
                placeholder="First Name" 
                type="text" 
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName} 
                className="rounded-lg p-6 bg-[#2c2e3b] border-none" 
              />
            </div>
            <div className="w-full">
              <Input 
                placeholder="Last Name" 
                type="text" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)} 
                className="rounded-lg p-6 bg-[#2c2e3b] border-none" 
              />
            </div>
            <div className='w-full flex gap-5'>
              { colors.map((color, index) => (<div className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300
                ${
                  selectedColor === index ? 'outline-white/90 outline-3' : ''
                }
                `} 
                key={index} onClick={()=> setSelectedColor(index)}
              ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full">
          <Button className="h-16 w-full bg-amber-300 hover:bg-amber-400 transition-all duration-300"
            onClick={saveChanges}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
export default Profile;