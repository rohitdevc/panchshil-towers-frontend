"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { IoIosMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";

type Props = {
    onEnquiryClick: () => void;
}

export default function Header({onEnquiryClick}: Props) {
    const basePath = process.env.NEXT_PUBLIC_PATH!.replace(/\/$/, "");

    const [openMenu, updateMenu] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full flex justify-between px-5 md:px-10 xl:px-20 2xl:px-30 bg-gradient-to-b from-black/80 to-transparent/10 z-50">
            <Link href="/" className="w-40 py-5">
                <Image src={`${basePath}/images/logo.svg`} alt="Panchshil logo" width={145} height={50} className="object-contain w-full h-full" loading="eager" />
            </Link>
            <ul className="font-trajan-pro-regular desktop_menu">
                <li className="hover:border-[#ff853c] hover:border-t-4">
                    <Link href="/#home" className="w-6">
                        <div>
                            <Image src={`${basePath}/images/home-icon.png`} alt="Home" width={24} height={24} className="object-cover w-full h-full" loading="eager" />
                        </div>
                    </Link>
                </li>
                <li className="hover:border-[#ff853c] hover:border-t-4">
                    <Link href="/#about">ABOUT</Link>
                </li>
                <li className="hover:border-[#ff853c] hover:border-t-4">
                    <Link href="/#configurations">CONFIGURATION</Link>
                </li>
                <li className="hover:border-[#ff853c] hover:border-t-4">
                    <Link href="/#amenities">AMENITIES</Link>
                </li>
                <li className="hover:border-[#ff853c] hover:border-t-4">
                    <Link href="/#gallery">GALLERY</Link>
                </li>
                <li className="hover:border-[#ff853c] hover:border-t-4">
                    <Link href="/#connect">CONNECT</Link>
                </li>
                <li className="cursor-pointer" onClick={onEnquiryClick}>
                    <span className="transition-all duration-200 bg-[#c9a338] rounded-2xl text-white px-5 py-4 border border-[#c9a338] hover:bg-white hover:text-[#c9a338]">ENQUIRE NOW</span>
                </li>
            </ul>
            <IoIosMenu size={50} className="lg:hidden default-color cursor-pointer mt-5" onClick={() => updateMenu(true)} />
            <div className={`md:hidden z-50 absolute right-0 top-0 w-full flex transform transition-transform origin-right duration-300 ${openMenu ? 'scale-x-100': 'scale-x-0'}`}>
                <div className="w-[30%] h-screen bg-white/5 backdrop-blur-xs"></div>
                <div className="bg-white w-[70%] h-screen relative">
                    <div className="default-bg-color w-full h-2"></div>
                    <IoClose size={50} className="cursor-pointer absolute right-5 top-5 text-black" onClick={() => updateMenu(false)} />
                    <ul className="flex flex-col gap-10 uppercase text-xs px-10 py-10 default-color trajan-pro-regular tracking-wide mobile_menu">
                        <li onClick={() => updateMenu(false) }>
                            <Link href="/#home">
                                <div className="w-5">
                                    <Image src={`${basePath}/images/home-icon.png`} alt="Home" width={24} height={24} className="object-cover w-full h-full" loading="eager" />
                                </div>
                            </Link>
                        </li>
                        <li onClick={() => updateMenu(false) }>
                            <Link href="/#about">ABOUT</Link>
                        </li>
                        <li onClick={() => updateMenu(false) }>
                            <Link href="/#configurations">CONFIGURATION</Link>
                        </li>
                        <li onClick={() => updateMenu(false) }>
                            <Link href="/#amenities">AMENITIES</Link>
                        </li>
                        <li onClick={() => updateMenu(false) }>
                            <Link href="/#gallery">GALLERY</Link>
                        </li>
                        <li onClick={() => updateMenu(false) }>
                            <Link href="/#connect">CONNECT</Link>
                        </li>
                        <li className="cursor-pointer" onClick={() => { onEnquiryClick(); updateMenu(false) } }>
                            <span className="transition-all duration-200 hover:text-white hover:border-[#ff853c] hover:border-t-3 px-3 py-2 border border-[#ff853c] hover:bg-[#ff853c]">ENQUIRE NOW</span>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}