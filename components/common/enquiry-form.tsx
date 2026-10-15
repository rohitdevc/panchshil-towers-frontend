"use client"

import { useState, useEffect, useRef } from "react";

import { IoIosArrowDown } from "react-icons/io";

import { EnquiryFormErrors, EnquiryForm } from "@/types/forms";

import { getCountries, getCountryCallingCode } from 'libphonenumber-js';

import { isEmail, isEmpty } from 'validator';

import Loader from "@/components/utils/loader";

export default function EnquiryFormHTML() {
    const basePath = process.env.NEXT_PUBLIC_PATH!.replace(/\/$/, "");

    const [showLoader, updateLoader] = useState(false);

    const [countries, setCountries] = useState<{ name: string; isdCode: string }[]>([]);

    useEffect(() => {
        const regionNames = new Intl.DisplayNames(["en"], {
            type: "region",
        });

        const countryList = getCountries()
            .map((country) => ({
                name: regionNames.of(country) ?? country,
                isdCode: `+${getCountryCallingCode(country)}`,
            }))
            .sort((a, b) => {
                if (a.name === "India") return -1;
                if (b.name === "India") return 1;
                return a.name.localeCompare(b.name);
            });

        setCountries(countryList);
    }, []);

    const [ip, setIp] = useState("");
    const [errors, setErrors] = useState<EnquiryFormErrors>({});

    const [enquiryForm, setEnquiryForm] = useState<EnquiryForm>({
        enquiry_first_name: '',
        enquiry_last_name: '',
        enquiry_email_address: '',
        enquiry_country_code: '+91',
        enquiry_phone_number: '',
        enquiry_message: '',
        ip_address: ip,
        referral_url: ''
    });

    useEffect(() => {
        async function getIp() {
        const res = await fetch(basePath + "/api/ip");
        const data = await res.json();
        setIp(data.ip);
        }
    
        getIp();
    }, []);

    const handleEnquiryFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setEnquiryForm(prev => ({ ...prev, [name]: value}));
        
        setErrors(prev => ({ ...prev, [name]: undefined}));
    }

    const enquiryFirstNameRef = useRef<HTMLInputElement>(null);
    const enquiryLastNameRef = useRef<HTMLInputElement>(null);
    const enquiryEmailAddressRef = useRef<HTMLInputElement>(null);
    const enquiryCountryCodeRef = useRef<HTMLSelectElement>(null);
    const enquiryPhoneNumberRef = useRef<HTMLInputElement>(null);
    const enquiryMessageRef = useRef<HTMLTextAreaElement>(null);

    const refMap: Record<string, React.RefObject<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null>> = {
        enquiry_first_name: enquiryFirstNameRef,
        enquiry_last_name: enquiryLastNameRef,
        enquiry_email_address: enquiryEmailAddressRef,
        enquiry_country_code: enquiryCountryCodeRef,
        enquiry_phone_number: enquiryPhoneNumberRef,
        enquiry_message: enquiryMessageRef
    }

    const enquiryFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(isEmpty(enquiryForm.enquiry_first_name)) {
            setErrors({enquiry_first_name: 'Please enter your first name'});
            enquiryFirstNameRef.current?.focus();
            return;
        }

        if(isEmpty(enquiryForm.enquiry_last_name)) {
            setErrors({enquiry_last_name: 'Please enter your last name'});
            enquiryLastNameRef.current?.focus();
            return;
        }

        if(isEmpty(enquiryForm.enquiry_phone_number)) {
            setErrors({enquiry_phone_number: 'Please enter your phone number'});
            enquiryPhoneNumberRef.current?.focus();
            return;
        }

        if(isEmpty(enquiryForm.enquiry_email_address)) {
            setErrors({enquiry_email_address: 'Please enter your email address'});
            enquiryEmailAddressRef.current?.focus();
            return;
        } else if(!isEmail(enquiryForm.enquiry_email_address)) {
            setErrors({enquiry_email_address: 'Please enter a valid email address'});
            enquiryEmailAddressRef.current?.focus();
            return;
        }

        updateLoader(true);

        await new Promise((resolve) => requestAnimationFrame(resolve));

        try {
          const payload = {
            ...enquiryForm,
            enquiry_phone_number: `${enquiryForm.enquiry_country_code}${enquiryForm.enquiry_phone_number}`,
            ip_address: ip,
            referral_url: window.location.href
          };

          const response = await fetch(basePath + "/api/enquiry-form", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
              "Content-Type": "application/json"
            }
          })

          if (!response.ok) {
            const err = await response.json();

            if(err.error) {
              let error_response = JSON.parse(err.error);

              if(typeof error_response === "object" && error_response !== null && !Array.isArray(error_response)) {
                error_response = Object.values(error_response);

                const [path, msg] = Object.entries(error_response[0])[0];

                const error_message = msg;
                const error_path = path;

                if(refMap[error_path]?.current) {
                  
                  refMap[error_path]?.current.focus();
                }
                setErrors({[error_path]: error_message});
              }

              return false;
            }
          }

          const data = await response.json();

          if(data.success) {
            setEnquiryForm({
                enquiry_first_name: '',
                enquiry_last_name: '',
                enquiry_email_address: '',
                enquiry_country_code: '+91',
                enquiry_phone_number: '',
                enquiry_message: '',
                ip_address: '',
                referral_url: window.location.href
            })

            if(!data.result) return false;

            window.open(basePath + `/panchshil-towers-brochure.pdf`, '_blank');

            setTimeout(function() {
                window.location.href = `${basePath}/thank-you`;
            }, 1000)
          }
        } catch(error) {
          console.error(error);
        } finally {
          updateLoader(false);
        }
    }

    return (
        <>
        <form className="enquiry_form px-5 sm:px-10 lg:px-20 xl:px-25 w-full !text-left" autoComplete="off" onSubmit={enquiryFormSubmit}>
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-10 justify-between">
                <div className="relative w-full sm:w-1/2">
                    <input type="text" name="enquiry_first_name" placeholder="First Name" onChange={handleEnquiryFormChange} value={enquiryForm.enquiry_first_name} ref={enquiryFirstNameRef} />
                    <span className="w-full absolute left-0 top-8 h-[0.5px]"></span>
                    <div className="text-black h-1">
                        <span className={`text-xs transition-all duration-200 ${errors.enquiry_first_name ? "opacity-100" : "opacity-0"}`}>{errors.enquiry_first_name}</span>
                    </div>
                </div>
                <div className="relative w-full sm:w-1/2">
                    <input type="text" name="enquiry_last_name" placeholder="Last Name" onChange={handleEnquiryFormChange} value={enquiryForm.enquiry_last_name} ref={enquiryLastNameRef} />
                    <span className="w-full absolute left-0 top-8 h-[0.5px]"></span>
                    <div className="text-black h-1">
                        <span className={`text-xs transition-all duration-200 ${errors.enquiry_last_name ? "opacity-100" : "opacity-0"}`}>{errors.enquiry_last_name}</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-10 justify-between">
                <div className="relative w-full sm:w-1/2">
                    <select name="enquiry_country_code" onChange={handleEnquiryFormChange} value={enquiryForm.enquiry_country_code} ref={enquiryCountryCodeRef}>
                    {
                        countries && countries.length > 0 && countries.map((country, key) => (
                        <option className="bg-[#BCBFB6]" value={country.isdCode} key={key}>{country.name} {country.isdCode}</option>
                        ))
                    }
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                        <IoIosArrowDown size={20} />
                    </div>
                    <span className="w-full absolute left-0 top-8 h-[0.5px]"></span>
                    <div className="text-black h-1"></div>
                </div>
                <div className="relative w-full sm:w-1/2">
                    <input type="tel" name="enquiry_phone_number" placeholder="Mobile" inputMode="numeric" onChange={handleEnquiryFormChange} value={enquiryForm.enquiry_phone_number} ref={enquiryPhoneNumberRef} />
                    <span className="w-full absolute left-0 top-8 h-[0.5px]"></span>
                    <div className="text-black h-1">
                        <span className={`text-xs transition-all duration-200 ${errors.enquiry_phone_number ? "opacity-100" : "opacity-0"}`}>{errors.enquiry_phone_number}</span>
                    </div>
                </div>
            </div>
            <div className="relative w-full">
                <input type="email" name="enquiry_email_address" placeholder="Email" onChange={handleEnquiryFormChange} value={enquiryForm.enquiry_email_address} ref={enquiryEmailAddressRef} />
                <span className="w-full absolute left-0 top-8 h-[0.5px]"></span>
                <div className="text-black h-1">
                    <span className={`text-black text-xs transition-all duration-200 ${errors.enquiry_email_address ? "opacity-100" : "opacity-0"}`}>{errors.enquiry_email_address}</span>
                </div>
            </div>
            <div className="relative w-full">
                <textarea name="enquiry_message" placeholder="Message" className="min-h-25 resize-none" onChange={handleEnquiryFormChange} value={enquiryForm.enquiry_message} ref={enquiryMessageRef}></textarea>
            </div>
            <div className="w-full flex pt-5 xl:pt-10">
                <button className={`uppercase cursor-pointer px-10 py-4 rounded-2xl border mx-auto tracking-wider font-trajan-pro-regular transition-all duration-300 bg-[#424544] text-white hover:bg-white hover:text-[#424544]`}>Submit</button>
            </div>
        </form>
        <Loader showLoader={showLoader} />
        </>
    )
}