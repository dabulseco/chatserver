import { useEffect, useState } from 'react'
import Lottie from 'react-lottie';
import { animationDefaultOptions } from "@/lib/utils"

const EmptyChatContainer = () => {
  return (
     <div className='flex-1 md:bg-[#1c1d25] md:flex flex-col items-center hidden justify-center duration-1000 transition-all'>
      <Lottie 
	      options={animationDefaultOptions}
        height={400}
        width={400}
      />
      <div className='text-opacity-80 text-white flex flex-col gap-5 items-center mt-10 lg:text-4xl text-3xl text-center transition-all duration-300'>
        <h3>
          Hi<span className='text-amber-500'>!</span> Welcome to <span className='text-amber-500'>the chat</span> app
        </h3>

      </div>
    </div>
  )
}
export default EmptyChatContainer
