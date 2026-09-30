"use server";

import { apiGETFetch } from "./api";
import {
    HomeIntroProps,
    HomeSliderProps,
    HomeConfigurationProps,
    HomeAmenitiesGalleryProps,
    HomeAmenitiesProps,
    HomeGalleryProps,
    HomeAboutPanchshilTowersProps
} from "@/types/api";

export const getHomeSliders = async () => apiGETFetch<HomeSliderProps[]>(`home/slider`);

export const getIntroduction = async () => apiGETFetch<HomeIntroProps>(`home/introduction`);

export const getHomeConfigurations = async () => apiGETFetch<HomeConfigurationProps[]>(`home/configurations`);

export const getHomeAmenitiesGallery = async () => apiGETFetch<HomeAmenitiesGalleryProps[]>(`home/amenities/gallery`);

export const getHomeAmenities = async () => apiGETFetch<HomeAmenitiesProps[]>(`home/amenities`);

export const getHomeGallery = async () => apiGETFetch<HomeGalleryProps[]>(`home/gallery`);

export const getAboutPanchshilTowers = async () => apiGETFetch<HomeAboutPanchshilTowersProps>(`home/about-panchshil-towers`);