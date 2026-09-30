"use client"

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

import { FaPhoneVolume } from "react-icons/fa6";
import { AiOutlineFilePdf } from "react-icons/ai";

type Props = {
    onEnquiryClick: () => void
}

export default function Sidebar({onEnquiryClick}: Props) {
    const basePath = process.env.NEXT_PUBLIC_PATH!.replace(/\/$/, "");

    return (
        <>
        <section className="hidden sm:flex flex-col gap-5 fixed right-0 top-1/2 -translate-y-1/2 z-45">
            <div className="group cursor-pointer rounded-l-3xl shadow-[1px_2px_12px_2px_#00000036] bg-[#C9A338] px-5 py-5 text-white" onClick={onEnquiryClick}>
                <AiOutlineFilePdf className="h-[35px] w-[35px] transition-transform duration-300 group-hover:scale-[1.14]" />
            </div>
            <Link href="tel:+919758445845" className="group cursor-pointer rounded-l-3xl shadow-[1px_2px_12px_2px_#00000036] bg-white px-5 py-5 text-white">
                <Image src={`${basePath}/images/call-icon.png`} alt="Call Icon" width={50} height={50} className="h-[35px] w-[35px] transition-transform duration-300 group-hover:scale-[1.14]" />
            </Link>
        </section>
        <section className="sm:hidden flex fixed bottom-0 z-45 bg-white uppercase w-full text-[#4B4D4C]">
            <div className="cursor-pointer border-r border-[#ff853c] flex gap-2 justify-center items-center w-1/2 py-3" onClick={onEnquiryClick}>
                <Image src={`${basePath}/images/mobile-email-icon.png`} alt="Email Icon" width={15} height={15} />
                <span className="text-xs">By Invitation Only</span>
            </div>
            <Link href="tel:+919758445845" className="flex gap-2 justify-center items-center w-1/2 py-3">
                <FaPhoneVolume size={15} className="text-[#C9A338]" />                    
                <span className="text-xs">Call Now</span>
            </Link>
        </section>
        </>
    )
}