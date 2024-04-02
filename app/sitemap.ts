import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${process.env.NEXT_PUBLIC_DOMAIN}`,
      lastModified: new Date(),
      priority: 1,
      changeFrequency: "hourly",
    },
    {
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/auth/sign-in`,
      lastModified: new Date(),
      priority: 0.5,
      changeFrequency: "hourly",
    },
    {
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/auth/sign-up`,
      lastModified: new Date(),
      priority: 0.5,
      changeFrequency: "hourly",
    },
    {
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/checkout`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/flights`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/hotels`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/my-bookings`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/search-flights`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/search-hotels`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/success`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/trips`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: "monthly",
    },
  ];
}
