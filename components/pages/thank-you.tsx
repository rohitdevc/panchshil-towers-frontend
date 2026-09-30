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
        {/* Google Ads Conversion */}
        <Script id="google-ads-conversion" strategy="afterInteractive">
            {` gtag('event', 'conversion', { 'send_to': 'AW-832162169/PZ-0CKaQ6f8BEPmS54wD' }); `}
        </Script>
        {/* ClmbTech Pixel */}
        <Script id={`clmbtech-pixel-8722`} strategy="afterInteractive">
            {`!function(px){ function e(t,e,c){ var n="",r=""; try{ ""!=(n=function(t,e){ try{ var c={}; e.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(t,e,n){ c[e]=n }); return c.hasOwnProperty(t)?c[t]:"" }catch(t){ return"" } }(t,c)) ?function(t,e,c){ try{ var n,r; c ?((n=new Date).setTime(n.getTime()+864e5), r="; expires="+n.toGMTString()) :r=""; document.cookie=t+"="+e+r+";Path=/" }catch(t){} }(e,n,1) :n=function(t){ try{ var e=document.cookie.match( new RegExp("(^| )"+t+"=([^;]+)") ); if(e)return e[2] }catch(t){} return null }(e); r=""!=n&&null!=n ?" &"+t+"="+n :"&"+t+"="; }catch(t){} return r; } var c="",n="",r=""; try{ n=e("ad","acf",c=window.location.href); r=e("col_ci","col_ci",c); }catch(t){ console.log(t) } var a= "https://ade.clmbtech.com/cde/eventTracking.htm?pixelId=" +px+ "&_w=1&_t=2"+ n+ r+ "&rd="+(new Date).getTime(); (new Image).src=a; }('8722'); `}
        </Script>
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