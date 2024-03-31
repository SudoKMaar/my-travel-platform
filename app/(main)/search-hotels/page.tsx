"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Input, Listbox, ListboxItem } from "@nextui-org/react";
import { apiClient } from "@/lib/api-client";
import { useAppStore } from "@/store";
import { USER_API_ROUTES } from "@/routes";
import { Button } from "@/components/ui/button";
import Loader from "@/components/loder";

const SearchHotels = () => {
  const { setScrapingType, setScraping, setScrappedHotels, isScraping } =
    useAppStore();
  const [hotelDate, setHotelDate] = useState("");
  const router = useRouter();

  const [loadingJobId, setLoadingJobId] = useState<number | undefined>(
    undefined
  );

  const startScraping = async () => {
    if (selectedCity) {
      const data = await apiClient.get(
        `${USER_API_ROUTES.HOTELS_SCRAPE}?location=${selectedCity}`
      );
      if (data.data.id) {
        setLoadingJobId(data.data.id);
        setScraping(true);
        setScrapingType("hotel");
      }
    }
  };

  const jobIntervalRef = useRef<any>(undefined);

  useEffect(() => {
    if (loadingJobId) {
      const checkIfJobCompleted = async () => {
        try {
          const response = await apiClient.get(
            `${USER_API_ROUTES.HOTELS_SCRAPE_STATUS}?jobId=${loadingJobId}`
          );

          if (response.data.status) {
            setScrappedHotels(response.data.hotels);
            clearInterval(jobIntervalRef.current);
            setScraping(false);
            setScrapingType(undefined);

            router.push(`/hotels?date=${hotelDate}`);
          }
        } catch (err) {
          console.log({ err });
        }
      };

      const interval = setInterval(() => checkIfJobCompleted(), 3000);
      jobIntervalRef.current = interval;
    }

    return () => {
      if (jobIntervalRef.current) clearInterval(jobIntervalRef.current);
    };
  }, [
    hotelDate,
    loadingJobId,
    router,
    setScraping,
    setScrapingType,
    setScrappedHotels,
  ]);

  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState<undefined | string>(
    undefined
  );

  const searchCities = async (searchQuery: string) => {
    const response = await fetch(
      `https://secure.geonames.org/searchJSON?q=${searchQuery}&maxRows=5&username=kmaar&style=SHORT`
    );
    const parsed = await response.json();
    setCities(
      parsed?.geonames.map((city: { name: string }) => city.name) ?? []
    );
  };

  return (
    <>
      {isScraping && <Loader />}
      <div className="h-[90vh] flex items-center justify-center">
        <div className="absolute left-0 top-0 h-[100vh] w-[100vw] max-w-[100vw] overflow-hidden overflow-x-hidden -z-5">
          <Image src="/hotel-bg.jpg" fill alt="Search" />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
        <div className="absolute h-[55vh] sm:h-[50vh] w-[90vw] sm:w-[80vw] md:w-[75vw] lg:w-[60vw] xl:w-[50vw] flex flex-col gap-5 m-auto">
          <div className="flex  flex-col gap-10 items-center">
            <div className="text-white text-center flex flex-col gap-5">
              <h3 className="text-base sm:text-xl lg:text-2xl font-bold">
                Best Hotels made for you in mind!
              </h3>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
                Explore the exotic world.
              </h2>
            </div>
            <div className="grid grid-cols-2 items-center justify-center px-2 sm:px-10 w-[90%] gap-5">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for a Location"
                  value={selectedCity}
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                    searchCities(e.target.value);
                  }}
                  className="text-white placeholder:text-white relative"
                  classNames={{
                    input: ["placeholder:text-white"],
                  }}
                  variant="bordered"
                  color="danger"
                />
                {cities.length > 0 && (
                  <div className="w-full min-h-[200px] max-w-[303px] border-small  rounded-small border-default-200 mt-5 absolute top-15 z-20">
                    <div
                      className="bg-cover bg-center bg-no-repeat relative min-h-[200px] h-full w-full px-1 py-2 rounded-small"
                      style={{
                        backgroundImage: 'url("/hotel-bg.jpg")',
                      }}
                    >
                      <div className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-md rounded-small"></div>
                      <Listbox
                        aria-label="Actions"
                        onAction={(key) => {
                          setSelectedCity(key as string);
                          setCities([]);
                        }}
                      >
                        {cities.map((city) => (
                          <ListboxItem
                            key={city}
                            color="danger"
                            className="text-danger-500"
                          >
                            {city}
                          </ListboxItem>
                        ))}
                      </Listbox>
                    </div>
                  </div>
                )}
              </div>
              <Input
                className="text-white placeholder:text-white relative"
                classNames={{
                  input: ["placeholder:text-white"],
                }}
                variant="bordered"
                color="danger"
                type="date"
                placeholder="Date"
                value={hotelDate}
                onChange={(e) => setHotelDate(e.target.value)}
              />
            </div>
            <Button
              size="lg"
              className="bg-rose-500 hover:bg-rose-600 cursor-pointer rounded-2xl w-full"
              onClick={startScraping}
            >
              Search Hotels
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchHotels;
