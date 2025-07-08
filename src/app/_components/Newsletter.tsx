import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import React from 'react'

export default function Newsletter() {
    return (
        <div className='bg-secondary-700 py-8 flex items-center justify-center mb-24'>
            <div className='flex flex-col items-center gap-2 justify-center'>
                <h1 className='text-heading-3 text-white'>Subscribe To Our Newsletter</h1>
                <p className='text-surface-300/80 text-center'>Get weekly cleaning tips, exclusive guides, and special offers delivered to your <br /> inbox.</p>
                <div className='w-full max-w-xl mt-2'>
                    <form className='flex items-center gap-2 w-full' action="">
                        <Input className='py-3.25' name='email' type='text' placeholder='Enter your email....' />
                        <Button className='border-secondary-700 text-white text-lg py-3.25 hover:border-primary-700' type='submit'>Subscribe</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
