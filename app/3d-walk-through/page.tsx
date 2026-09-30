import {
  getMetaData,
  getBanner
} from '@/lib/common';

import ThreeDWalkThrough from "@/components/pages/threed-walkthrough";
import { generateMetadata as createMetadata } from '@/components/utils/generateMetadata';

export async function generateMetadata() {
  const [meta_data, banner] = await Promise.all([
    getMetaData("3D Walk Through"),
    getBanner("Home"),
  ]);

  return createMetadata({
    meta_data,
    banner,
  });
}

export default async function Page() {
  return (
    <ThreeDWalkThrough />
  )
}