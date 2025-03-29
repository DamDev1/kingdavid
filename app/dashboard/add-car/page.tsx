import Header from '@/components/shared/Header'
import React from 'react'

export default function AddCar() {
  return (
    <section>
        <Header />
        <div className='px-10 md:px-20 my-10'>
            <h2 className='font-bold text-4xl'>Add New Car</h2>
            <form className='mt-10 p-10 border rounded-xl'>
                {/* Car Details */}
                <div>
                    <h2 className='font-medium text-xl mb-6'>Car Details</h2>
                </div>
            </form>
        </div>
    </section>
  )
}
