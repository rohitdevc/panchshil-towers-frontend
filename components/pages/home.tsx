"use client"

import Image from "next/image"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from "swiper/modules"

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import Sidebar from "@/components/common/sidebar";
import EnquiryFormPopUp from "@/components/common/enquiry-form-pop-up";

import { HomeAboutPanchshilTowersProps, HomeAmenitiesGalleryProps, HomeAmenitiesProps, HomeConfigurationProps, HomeGalleryProps, HomeIntroProps, HomeSliderProps } from "@/types/api"

import { useRef, useState } from "react";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Captions from "yet-another-react-lightbox/plugins/captions";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";

import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";
import { FaPhoneAlt } from "react-icons/fa";

import parser from 'html-react-parser'
import nl2br from 'nl2br'
import YTVideoPopUp, { YTVideoPopupHandle } from "@/components/utils/YouTubeVideo";

import Link from "next/link";
import EnquiryFormHTML from "@/components/common/enquiry-form";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {
    sliders: HomeSliderProps[]
    introduction: HomeIntroProps
    configurations: HomeConfigurationProps[]
    amenitiesGallery: HomeAmenitiesGalleryProps[]
    amenities: HomeAmenitiesProps[]
    gallery: HomeGalleryProps[]
    aboutPanchshilTowers: HomeAboutPanchshilTowersProps
}

export default function HomePage({
    sliders,
    introduction,
    configurations,
    amenitiesGallery,
    amenities,
    gallery,
    aboutPanchshilTowers
}: Props) {
    const basePath = process.env.NEXT_PUBLIC_PATH!.replace(/\/$/, "");

    const videoPopupRef = useRef<YTVideoPopupHandle>(null);

    const [activePopUp, updateActivePopUp] = useState(false);

    const [galleryLBOpen, setGalleryLBOpen] = useState(false);
    const [galleryLBIndex, setGalleryLBIndex] = useState(0);

    const [amenitiesGalleryLBOpen, setAmenitiesGalleryLBOpen] = useState(false);
    const [amenitiesGalleryLBIndex, setAmenitiesGalleryLBIndex] = useState(0);

    const galleryLBSlides = gallery?.filter((item) => !item.gallery_youtube_id)
    .map((item) => ({
        src: item.gallery_image_url,
        alt: item.gallery_caption,
        description: item.gallery_caption
    }));

    const amenitiesGalleryLBSlides = amenitiesGallery?.map((item) => ({
        src: item.amenity_image_url,
        alt: item.amenity_caption,
        description: item.amenity_caption,
    }));

    const sliderRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement>(null);
    const configurationRef = useRef<HTMLDivElement>(null);
    const amenitiesRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);
    const aboutPanchshilTowersRef = useRef<HTMLDivElement>(null);
    const enquiryRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if(sliderRef.current) {
            gsap.fromTo(sliderRef.current,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 1.5,
                    ease: 'power2.out'
                }
            )
        }

        const sections = [
            aboutRef,
            configurationRef,
            amenitiesRef,
            galleryRef,
            aboutPanchshilTowersRef,
            enquiryRef,
        ];

        sections.forEach((section) => {
            if (!section.current) return;

            gsap.fromTo(
                section.current,
                { opacity: 0, y: 100 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section.current,
                        start: "top 80%",
                        toggleActions: "play reverse play reverse",
                    },
                }
            );
        });
    }, [])

    return (
        <>
        <Header onEnquiryClick={() => updateActivePopUp(true)} />
        <main className="bg-black">
            {
                sliders && sliders.length > 0 && (
                <section className="relative md:h-screen w-full overflow-hidden opacity-0" id="home" ref={sliderRef}>
                    <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    slidesPerView={1}
                    spaceBetween={0}
                    speed={800}
                    loop={true}
                    autoplay={{delay: 5000, pauseOnMouseEnter: false}}
                    navigation={{prevEl: '.master-slider-prev', nextEl: '.master-slider-next'}}
                    pagination={{
                        el: ".master-slider-pagination",
                        clickable: true,
                        renderBullet: (index, className) =>
                            `<span class="${className}">${String(index + 1).padStart(2, "0")}</span>`,
                    }}
                    className="w-full h-100 md:h-full"
                    >
                        {
                            sliders.map((slider, key) => (
                                <SwiperSlide key={key}>
                                    <Image src={slider.slider_image_url} alt={slider.slider_caption} width={1920} height={1080} priority={key === 0} className="w-full h-full object-cover" />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                    <div className="pointer-events-none absolute bottom-0 left-0 z-1 h-[100px] w-full bg-gradient-to-t from-black/100 to-transparent" />
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-15 z-10 flex items-center gap-10">
                        <button className="master-slider-prev text-white cursor-pointer" aria-label="Previous Slide">
                            <HiArrowLongLeft size={30} />
                        </button>
                        <div className="master-slider-pagination flex items-center gap-7 text-white text-xl" />
                        <button className="master-slider-next text-white cursor-pointer" aria-label="Next Slide">
                            <HiArrowLongRight size={30} />
                        </button>
                    </div>
                </section>
                )
            }
            <section className="px-5 sm:px-10 md:px-15 lg:px-20 xl:px-25 sm:py-15 lg:py-20 xl:py-25 2xl:py-45 bg-no-repeat bg-cover flex flex-col gap-5" style={{backgroundImage: `url(${basePath}/images/about.jpg)`}}>
                <div className="max-w-6xl mx-auto bg-[#bcbfb6] text-[#424544] p-7 sm:p-10 lg:px-25 lg:py-25 flex flex-col gap-5 font-trajan-pro-bold" id="about" ref={aboutRef}>
                    <h2 className="text-3xl">{introduction.introduction_caption}</h2>
                    <p className="text-base md:text-lg lg:text-xl font-futura-book sm:leading-relaxed font-futura-book">{parser(nl2br(introduction.introduction_description))}</p>
                </div>
                {
                    configurations && configurations.length > 0 && (
                    <div className="flex flex-col gap-10 md:gap-20 py-15" id="configurations" ref={configurationRef}>
                        <h2 className="font-trajan-pro-bold tracking-wider uppercase mx-auto text-white text-3xl md:text-4xl xl:text-5xl">Configuration</h2>
                        <div className="w-full mx-auto flex md:flex-col configurations">
                            <ul className="border sm:border-0 sm:border-t sm:border-l sm:border-r border-white uppercase text-base sm:text-lg">
                                <li className="sm:border-r border-b">Type</li>
                                <li className="sm:border-r border-b">Carpet Area</li>
                                <li className="sm:border-r border-b">Floor Plan</li>
                                <li className="sm:border-b">Price</li>
                            </ul>
                            {
                                configurations.map((configuration, key) => (
                                <ul className="border border-white text-base items-stretch font-futura-book" key={key}>    
                                    <li className="border-b sm:border-r">{configuration.configuration_name}</li>
                                    <li className="border-b sm:border-r">{configuration.configuration_carpet_area}</li>
                                    <li className="border-b sm:border-r uppercase underline cursor-pointer" onClick={() => updateActivePopUp(true)}>Click Here</li>
                                    <li className="uppercase underline cursor-pointer" onClick={() => updateActivePopUp(true)}>Click Here</li>
                                </ul>
                                ))
                            }
                        </div>
                    </div>
                    )
                }
            </section>
            <section className="bg-[#BCBFB6] px-5 sm:px-10 md:px-15 lg:px-20 xl:px-25 py-15 lg:py-20 xl:py-30 flex flex-col gap-10 xl:gap-20" id="amenities">
                <div className="w-full relative amenities_gallery">
                    {
                        amenitiesGallery && amenitiesGallery.length > 0 && (
                            <div>
                                <Swiper
                                modules={[Pagination, Autoplay]}
                                slidesPerView={1}
                                spaceBetween={0}
                                speed={800}
                                loop={true}
                                autoplay={{delay: 5000, pauseOnMouseEnter: false}}
                                className="max-w-4xl 2xl:h-[450px]"
                                pagination={{clickable: true}}
                                >
                                    {
                                        amenitiesGallery.map((amenity_gallery, key) => (
                                            <SwiperSlide
                                            onClick={() => {
                                                setAmenitiesGalleryLBIndex(key);
                                                setAmenitiesGalleryLBOpen(true);
                                            }}
                                            className="cursor-pointer relative"
                                            key={key}>
                                                <Image src={amenity_gallery.amenity_image_url} alt={amenity_gallery.amenity_caption} width={900} height={500} className="object-cover w-full h-full" />
                                                <h3 className="absolute left-0 bottom-20 uppercase font-futura text-xl px-20 py-4 text-white bg-gradient-to-r from-[#454442]/[0.874387] from-[29%] to-[#454442]/0 to-[100%]">{amenity_gallery.amenity_caption}</h3>
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                                <Lightbox
                                    open={amenitiesGalleryLBOpen}
                                    close={() => setAmenitiesGalleryLBOpen(false)}
                                    index={amenitiesGalleryLBIndex}
                                    slides={amenitiesGalleryLBSlides}
                                    captions={{
                                        descriptionTextAlign: "center",
                                        descriptionMaxLines: 3,
                                    }}
                                    plugins={[Zoom, Thumbnails, Captions]}
                                    carousel={{
                                        imageFit: "contain"
                                    }}
                                    thumbnails={{
                                        position: "bottom"
                                    }}
                                />
                            </div>
                        )
                    }
                </div>
            {
                amenities && amenities.length > 0 && (
                    <div className="flex flex-col gap-10 items-center text-[#424544] py-5" ref={amenitiesRef}>
                        <div className="flex flex-col justify-center items-center gap-10">
                            <h2 className="font-trajan-pro-bold tracking-wider uppercase mx-auto text-3xl md:text-4xl xl:text-5xl">Amenities</h2>
                            <p className="text-lg sm:text-xl font-futura-book">Indulge in a spectrum of unparalleled leisure</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-8 md:gap-5 lg:gap-8 xl:gap-10 w-full py-5">
                            {
                                amenities.map((amenity, key) => (
                                    <div key={key} className="flex flex-col gap-3 items-center">
                                        <div className="min-w-10 min-h-10">
                                            <Image src={amenity.amenity_icon_url} width={30} height={30} alt={amenity.amenity_caption} className="object-cover w-full h-full" />
                                        </div>
                                        <h3 className="text-sm lg:text-xl">{amenity.amenity_caption}</h3>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
            }
            </section>
            <section className="py-15 2xl:py-30 bg-[#0A0A12]">
                <div className="flex flex-col justify-center gap-15 text-white" id="gallery" ref={galleryRef}>
                    <h2 className="font-trajan-pro-bold tracking-wider uppercase mx-auto text-3xl md:text-4xl">Gallery</h2>
                    {
                        gallery && gallery.length > 0 && (
                            <div className="relative gallery h-75 sm:h-115 xl:h-150 2xl:h-[700px]">
                                <Swiper
                                modules={[Pagination, Autoplay]}
                                slidesPerView={1.5}
                                spaceBetween={30}
                                speed={800}
                                loop={true}
                                centeredSlides
                                breakpoints={{1080: {spaceBetween: 100}}}
                                autoplay={{delay: 5000, pauseOnMouseEnter: false}}
                                className="w-full h-60 sm:h-100 xl:h-125 2xl:h-[600px] !static"
                                pagination={{clickable: true}}
                                >
                                    {
                                        gallery.map((gallery_row, key) => (
                                            <SwiperSlide
                                            key={key}
                                            onClick={() => {
                                                if (gallery_row.gallery_youtube_id) {
                                                    videoPopupRef.current?.open(gallery_row.gallery_youtube_id);
                                                } else {
                                                    const galleryLBIndex = gallery.filter((item) => !item.gallery_youtube_id)
                                                    .findIndex((item) => item === gallery_row);
                                                    
                                                    setGalleryLBIndex(galleryLBIndex);
                                                    setGalleryLBOpen(true);
                                                }
                                            }}
                                            className='cursor-pointer'>
                                                <Image src={gallery_row.gallery_image_url} alt={gallery_row.gallery_caption} width={900} height={500} className="object-cover w-full h-full" />
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                                <Lightbox
                                    open={galleryLBOpen}
                                    close={() => setGalleryLBOpen(false)}
                                    index={galleryLBIndex}
                                    slides={galleryLBSlides}
                                    captions={{
                                        descriptionTextAlign: "center",
                                        descriptionMaxLines: 3,
                                    }}
                                    plugins={[Zoom, Thumbnails, Captions]}
                                    carousel={{
                                        imageFit: "contain"
                                    }}
                                    thumbnails={{
                                        position: "bottom"
                                    }}
                                />
                            </div>
                        )
                    }
                </div>
                <div className="py-15 text-white flex flex-col gap-15 items-center px-5 sm:px-10 md:px-15 lg:px-20 xl:px-25">
                    {
                        aboutPanchshilTowers && (
                        <div className="flex flex-col gap-7" ref={aboutPanchshilTowersRef}>
                            <h2 className="uppercase text-3xl md:text-4xl font-trajan-pro-bold tracking-wide">{aboutPanchshilTowers.introduction_title}</h2>
                            <p className="text-xl font-futura-book">{parser(nl2br(aboutPanchshilTowers.introduction_description))}</p>
                        </div>
                    )
                    }
                    <iframe src={aboutPanchshilTowers.introduction_google_maps_embed_url} allowFullScreen className="border-0 h-75 md:h-130 w-full"></iframe>
                </div>
            </section>
            <section className="bg-[#BCBFB6] text-[#424544] py-15 md:py-20 flex flex-col gap-15 items-stretch" id="connect" ref={enquiryRef}>
                <div className="flex items-center justify-center">
                    <h2 className="font-trajan-pro-bold tracking-wider uppercase text-3xl md:text-4xl">Enquire Now</h2>
                </div>
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-0 lg:justify-between">
                    <div className="lg:border-r w-full lg:w-[65%]">
                        <EnquiryFormHTML />
                    </div>
                    <div className="w-full lg:w-[35%] px-10 lg:px-5 flex flex-col gap-10 xl:gap-15">
                        <div className="flex gap-5 sm:gap-7">
                            <div className="w-10 h-10">
                                <Image src={`${basePath}/images/map-icon.png`} alt="Map Marker" width={25} height={25} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <h3 className="uppercase font-trajan-pro-regular text-xl sm:text-2xl lg:text-xl xl:text-2xl">Panchshil Towers By Panchshil Realty</h3>
                                <p className="font-futura-book text-lg sm:text-xl lg:text-lg xl:text-xl">191, Panchshil Towers Rd, <br />Vitthal Nagar, Kharadi, Pune, <br />Maharashtra 411 014</p>
                            </div>
                        </div>
                        <div className="flex gap-5 sm:gap-7">
                            <FaPhoneAlt size={25} className="text-[#C9A338]" />
                            <div className="flex flex-col gap-3">
                                <h3 className="uppercase font-trajan-pro-regular text-xl sm:text-2xl lg:text-xl xl:text-2xl">Contact</h3>
                                <Link className="font-futura-book text-lg sm:text-xl lg:text-lg xl:text-xl" href="tel:+919758445845">+91 9758445845</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <YTVideoPopUp ref={videoPopupRef} />
        </main>
        <Footer />
        <Sidebar onEnquiryClick={() => updateActivePopUp(true)} />
        <EnquiryFormPopUp activePopUp={activePopUp} updateActivePopUp={updateActivePopUp} />
        </>
    )
}