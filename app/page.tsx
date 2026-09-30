import {
  getIntroduction,
  getHomeSliders,
  getHomeConfigurations,
  getHomeAmenitiesGallery,
  getHomeAmenities,
  getHomeGallery,
  getAboutPanchshilTowers
} from '@/lib/home';

import {
  getMetaData,
  getBanner
} from '@/lib/common';

import HomePage from "@/components/pages/home";
import { generateMetadata as createMetadata } from '@/components/utils/generateMetadata';

export async function generateMetadata() {
  const [meta_data, banner] = await Promise.all([
    getMetaData("Home"),
    getBanner("Home"),
  ]);

  return createMetadata({
    meta_data,
    banner,
  });
}

export default async function Page() {
  const [
    introduction,
    sliders,
    configurations,
    amenitiesGallery,
    amenities,
    gallery,
    aboutPanchshilTowers
  ] = await Promise.all([
    getIntroduction(),
    getHomeSliders(),
    getHomeConfigurations(),
    getHomeAmenitiesGallery(),
    getHomeAmenities(),
    getHomeGallery(),
    getAboutPanchshilTowers()
  ])

  return (
    <HomePage
    sliders={sliders}
    introduction={introduction}
    configurations={configurations}
    amenitiesGallery={amenitiesGallery}
    amenities={amenities}
    gallery={gallery}
    aboutPanchshilTowers={aboutPanchshilTowers}
    />
  )
}