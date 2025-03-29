import { useRouter } from 'next/navigation'
import React from 'react'

export default function Logo() {
  const navigate = useRouter()
  return (
    <div className='text-[18px] font-medium cursor-pointer' onClick={() => navigate.push("/")}>King<span className='text-blue-600'>David</span></div>
  )
}
