"use client"

import { IoCloseCircleOutline } from "react-icons/io5";
import EnquiryFormHTML from "./enquiry-form";

type Props = {
    activePopUp: boolean;
    updateActivePopUp: (value: boolean) => void;
}

export default function EnquiryFormPopUp({activePopUp, updateActivePopUp}: Props) {
    return (
        <section className={`fixed top-0 left-0 w-full overflow-y-auto h-screen z-50 bg-black/75 px-5 py-10 transform origin-center transition-transform duration-300 ${activePopUp ? 'scale-x-100 scale-y-100' : 'scale-x-0 scale-y-0 pointer-events-none'}`}>
            <div className="bg-white text-black relative py-5 sm:py-20 sm:max-w-3xl flex flex-col gap-5 sm:gap-10 justify-center items-center text-center mx-auto">
                <IoCloseCircleOutline className="absolute top-0 sm:top-5 right-0 sm:right-5 cursor-pointer text-black" size={45} onClick={() => updateActivePopUp(false)} />
                <h2 className="uppercase text-xl sm:text-2xl">Get in touch <br/> Submit your enquiry</h2>
                <EnquiryFormHTML />
            </div>
        </section>
    )
}