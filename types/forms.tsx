export interface EnquiryForm {
  enquiry_first_name: string;
  enquiry_last_name: string;
  enquiry_country_code: string;
  enquiry_phone_number: string;
  enquiry_email_address: string;
  enquiry_message: string;
  ip_address: string;
  referral_url: string;
};

export interface EnquiryFormProps {
  enquiry_first_name: string;
  enquiry_last_name: string;
  enquiry_phone_number: string;
  enquiry_email_address: string;
  enquiry_message: string;
  ip_address: string;
  referral_url: string;
};

export interface EnquiryFormErrors {
  enquiry_first_name?: string
  enquiry_last_name?: string
  enquiry_phone_number?: string
  enquiry_email_address?: string
  enquiry_message?: string
}