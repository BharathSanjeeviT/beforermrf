"use client"
import { SiteInfo } from "@/components/component/site-info";
import { useState } from "react";

const SitesList = ({ params: { slug } }: { params: { slug: string } }) => {
  return (
    <>
      <SiteInfo />
    </>
  )
}
export default SitesList;
