import React from 'react'
import { AiOutlineCopyright } from "react-icons/ai"

const Footer = ({ show = '', textColor = 'text-gray-600' }) => {
    return (
        <div className={`${textColor}`}>
            <ul className='flex-center flex-wrap gap-x-3 gap-y-1'>
                <li >SocioGramHub</li>
                <li>About</li>
                <li>Blog</li>
                <li>Jobs</li>
                <li>Help</li>
                <li>API</li>
                <li>Privacy</li>
                <li>Terms</li>
                <li>Locations</li>
                <li className={`${show}`}>Contact Uploading & Non-Users</li>
                <li>SocioGram Verified</li>
            </ul>
            <ul className='flex-center gap-3 flex-wrap mt-3'>
                <select className={`border-none text-xs ${show}`}>
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