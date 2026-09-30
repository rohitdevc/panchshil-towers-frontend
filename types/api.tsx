export interface MetaData {
    meta_title: string;
    meta_description: string;
    canonical_url: string;
}

export interface Banner {
    banner_image_url: string;
}

export interface TokenResponse {
    access_token: string;
}

export interface HomeIntroProps {
    introduction_caption: string;
    introduction_description: string;
}

export interface HomeSliderProps {
    slider_caption: string;
    slider_image_url: string;
}

export interface HomeConfigurationProps {
    configuration_name: string;
    configuration_carpet_area: string;
}

export interface HomeAmenitiesGalleryProps {
    amenity_caption: string;
    amenity_image_url: string;
}

export interface HomeAmenitiesProps {
    amenity_caption: string;
    amenity_icon_url: string;
}

export interface HomeGalleryProps {
    gallery_caption: string;
    gallery_youtube_id: string;
    gallery_image_url: string;
}

export interface HomeAboutPanchshilTowersProps {
    introduction_title: string;
    introduction_description: string;
    introduction_google_maps_embed_url: string;
}