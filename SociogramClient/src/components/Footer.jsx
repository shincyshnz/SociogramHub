import React from 'react'
import { AiOutlineCopyright } from "react-icons/ai"

const Footer = () => {
    return (
        <div className='mt-10 flex flex-col justify-center items-center text-gray-600 mx-10'>
            <ul className='flex justify-center items-center gap-3 flex-wrap'>
                <li>SocioGram</li>
                <li>ABout</li>
                <li>Blog</li>
                <li>Jobs</li>
                <li>Help</li>
                <li>API</li>
                <li>Privacy</li>
                <li>Terms</li>
                <li>Locations</li>
                <li>SocioGramHub</li>
                <li>Contact Uploading & Non-Users</li>
                <li>SocioGram Verified</li>
            </ul>
            <ul className='flex justify-center items-center gap-3 flex-wrap mt-3'>
                <select className='border-none text-xs'>
                    <option>English</option>
                    <option>Arabic</option>
                </select>
                <li className='flex gap-1 items-center'>
                    <AiOutlineCopyright />2023 SocioGramHub from Sociogram
                </li>
            </ul>
        </div>
    )
}

export default Footer