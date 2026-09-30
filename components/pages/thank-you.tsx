"use client"

import Script from "next/script";

import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import Sidebar from "@/components/common/sidebar";
import EnquiryFormPopUp from "@/components/common/enquiry-form-pop-up";

import { useState } from "react";

import Link from "next/link";
import { Banner } from "@/types/api";

type Props = {
    banner: Banner
}

export default function ThankYouPage({banner}: Props) {
    const [activePopUp, updateActivePopUp] = useState(false);

    return (
        <>
        <Script id="google-ads-conversion" strategy="afterInteractive">
            {`
                function gtag_report_conversion(url) {
                var callback = function () {
                    if (typeof(url) != 'undefined') {
                    window.location = url;
                    }
                };
    
                gtag('event', 'conversion', {
                    'send_to': 'AW-16772965059/PxgrCPz-qOgZEMPF_L0-',
                    'value': 1.0,
                    'currency': 'INR',
                    'event_callback': callback
                });
    
                return false;
                }
            `}
        </Script>
        <iframe
            src="https://adgebra.co.in/Tracker/Conversion?p1=6370&p2=[order_Id]&p3=[product_Id]&p4=[cartvalue]&p5=[flag~custom_values]"
            width="0"
            height="0"
            frameBorder="0"
            style={{ display: "none" }}
        />
        <Header onEnquiryClick={() => updateActivePopUp(true)} />
        <main className="bg-no-repeat bg-cover bg-center h-[85vh]" style={{backgroundImage: `url(${banner.banner_image_url})`}}>
            <section className="flex flex-col gap-5 justify-center items-center text-center w-full h-full text-white px-5">
                <h1 className="font-futura-bold text-3xl xl:text-6xl leading-tight">THANK YOU FOR <br />YOUR INTEREST!</h1>
                <p className="font-futura-book text-xl xl:text-2xl">A representative from our team will contact you shortly.</p>
                <Link className="uppercase border px-10 py-3 text-xl md:text-2xl" href="/">Go Back to Homepage</Link>
            </section>
        </main>
        <Footer />
        <Sidebar onEnquiryClick={() => updateActivePopUp(true)} />
        <EnquiryFormPopUp activePopUp={activePopUp} updateActivePopUp={updateActivePopUp} />
        </>
    )
}