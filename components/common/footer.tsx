"use client"

import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="md:px-15 lg:px-20 xl:px-25 py-5 md:py-10 mb-10 sm:mb-0 w-full bg-[#0A0A12]">
            <div className="flex flex-col sm:flex-row gap-5 items-center justify-center sm:justify-between uppercase font-futura-book">
                <Link href="https://www.panchshil.com/disclaimer" target="_blank" className="text-white text-base lg:text-xl tracking-[4px]">Disclaimer</Link>
                <ul className="flex gap-10 sm:gap-5 md:gap-10 lg:gap-20">
                    <li>
                        <Link href="https://www.facebook.com/panchshilrealty/" target="_blank">
                        <FaFacebookF className="color-foreground" size={30} />
                        </Link>
                    </li>
                    <li>
                        <Link href="https://www.linkedin.com/company/panchshilrealty/" target="_blank">
                        <FaLinkedinIn className="color-foreground" size={30} />
                        </Link>
                    </li>
                    <li>
                        <Link href="https://www.instagram.com/panchshilrealty/" target="_blank">
                        <FaInstagram className="color-foreground" size={30} />
                        </Link>
                    </li>
                </ul>
                <Link href="https://www.panchshil.com/privacy-policy/" target="_blank" className="text-white text-base lg:text-xl tracking-[4px]">Privacy Policy</Link>
            </div>
        </footer>
    )
}