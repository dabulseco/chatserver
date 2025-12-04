import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAppStore } from '@/store';
import { useEffect, useState } from 'react'
import { colors, getColor } from '@/lib/utils';
import { HOST, LOGOUT_ROUTE } from '../../../../../../utils/constants';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { FiEdit2 } from "react-icons/fi";
import { IoPowerSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { apiClient } from '@/lib/api-client';

const ProfileInfo = () => {
    const { userInfo, setUserInfo } = useAppStore();
    const navigate = useNavigate();
    const logOut = async ()=> {
        try {
            const res = await apiClient.post(LOGOUT_ROUTE, {}, { withCredentials: true })
            if(res.status ===200) {
                navigate("/auth")
                setUserInfo(null)
            }
        } catch(e) {
            console.log(e)
        }
    }


    return (
        <div className="absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33]">
            <div className="flex gap-3 items-center justify-center">
                <div className="w-12 h-12 relative">
                    <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                        {
                        userInfo.images ? <AvatarImage src={`${HOST}/${userInfo.images}`} alt="Profile Image" className="object-cover w-full h-full bg-black" /> :
                        <div className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center 
                        rounded-full ${getColor(userInfo.color)}`}>
                            {userInfo.firstName 
                            ? userInfo.firstName.split('').shift()
                            : userInfo.email.split('').shift()}
                        </div>
                        }
                    </Avatar>
                </div>
                <div> 
                    { userInfo.firstName && userInfo.lastName ? `${userInfo.firstName} ${userInfo.lastName}` : "" }
                </div>
            </div>
            <div className="flex gap-4">
                <Tooltip>
                    <TooltipTrigger>
                        <FiEdit2 className="text-amber-500 text-xl font-medium"
                        onClick={()=> navigate('/profile')}/> 
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#1c1b1e] border-none text-white">
                        <p>Edit Profile</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger>
                        <IoPowerSharp className="text-red-500 text-xl font-medium"
                        onClick={logOut}/> 
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#1c1b1e] border-none text-white">
                        <p>Logout</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </div>
    )
}
export default ProfileInfo;