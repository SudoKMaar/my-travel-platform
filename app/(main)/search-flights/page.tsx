"use client";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Input, Listbox, ListboxItem } from "@nextui-org/react";
import { useAppStore } from "@/store";
import { apiClient } from "@/lib/api-client";
import { USER_API_ROUTES } from "@/routes";
import { cityAirportCode } from "@/lib/city-airport-codes";
import { toast } from "@/components/ui/use-toast";
import Loader from "@/components/loder";
import { Button } from "@/components/ui/button";

const SearchFlights = () => {
  const router = useRouter();
  const { setScrapingType, setScraping, setScrappedFlights, isScraping } =
    useAppStore();
  const [source, setSource] = useState("");
  const [sourceOptions, setSourceOptions] = useState<
    { city: string; code: string }[]
  >([]);
  const [destination, setDestination] = useState("");
  const [destinationOptions, setDestinationOptions] = useState<
    { city: string; code: string }[]
  >([]);
  const [flightDate, setFlightDate] = useState("");
  const [loadingJobId, setLoadingJobId] = useState<number | undefined>(
    undefined
  );

  const startScraping = async () => {
    if (source && destination && flightDate) {
      const data = await apiClient.get(
        `${USER_API_ROUTES.FLIGHT_SCRAPE}?source=${source}&destination=${destination}&date=${flightDate}`
      );
      if (data.data.id) {
        setLoadingJobId(data.data.id);
        setScraping(true);
        setScrapingType("flight");
      }
    }
  };

  const jobIntervalRef = useRef<any>(undefined);

  useEffect(() => {
    if (loadingJobId) {
      const checkIfJobCompleted = async () => {
        try {
          const response = await apiClient.get(
            `${USER_API_ROUTES.FLIGHT_SCRAPE_STATUS}?jobId=${loadingJobId}`
          );

          if (response.data.status) {
            setScrappedFlights(response.data.flights);
            clearInterval(jobIntervalRef.current);
            setScraping(false);
            setScrapingType(undefined);
            router.push(`/flights?date=${flightDate}`);
          }
        } catch (err) {
          toast({ variant: "destructive", title: `${err}` });
        }
      };

      const interval = setInterval(() => checkIfJobCompleted(), 3000);
      jobIntervalRef.current = interval;
    }

    return () => {
      if (jobIntervalRef.current) clearInterval(jobIntervalRef.current);
    };
  }, [
    flightDate,
    loadingJobId,
    router,
    setScraping,
    setScrapingType,
    setScrappedFlights,
  ]);

  const handleSourceChange = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    const matchingCities = Object.entries(cityAirportCode)
      .filter(([, city]) => city.toLowerCase().includes(lowercaseQuery))
      .map(([code, city]) => ({ code, city }))
      .splice(0, 5);
    setSourceOptions(matchingCities);
  };

  const handleDestinationChange = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    const matchingCities = Object.entries(cityAirportCode)
      .filter(([, city]) => city.toLowerCase().includes(lowercaseQuery))
      .map(([code, city]) => ({ code, city }))
      .splice(0, 5);
    setDestinationOptions(matchingCities);
  };

  return (
    <>
      {isScraping && <Loader />}

      <div className="h-[90vh] flex items-center justify-center">
        <div className="absolute left-0 top-0 h-[100vh] w-[100vw] max-w-[100vw] overflow-hidden overflow-x-hidden -z-5">
          <Image src="/flight-bg.jpg" fill alt="Search" />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
        <div className="absolute h-[55vh] sm:h-[50vh] w-[90vw] sm:w-[80vw] md:w-[75vw] lg:w-[60vw] xl:w-[50vw] flex flex-col gap-5 m-auto">
          <div className="flex flex-col gap-10">
            <div className="text-white text-center flex flex-col gap-5">
              <h2 className="text-base sm:text-xl lg:text-2xl font-bold">
                Best Flights made for you in mind!
              </h2>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
                Explore the exotic world.
              </h3>
            </div>
            <div className="grid grid-cols-3 items-center justify-center  px-10  gap-5">
              <div className="relative">
                <Input
                  className="text-white placeholder:text-white relative"
                  classNames={{
                    input: ["placeholder:text-white"],
                  }}
                  variant="bordered"
                  color="danger"
                  placeholder="Source"
                  startContent={<FaSearch size={18} />}
                  type="search"
                  onChange={(e) => {
                    setSource(e.target.value);
                    handleSourceChange(e.target.value);
                  }}
                  value={source}
                  onClear={() => setSource("")}
                />
                {sourceOptions.length > 0 && (
                  <div className="w-full min-h-[200px] max-w-[303px] border-small  rounded-small border-default-200  mt-5 absolute top-15 z-20">
                    <div
                      className="bg-cover bg-center bg-no-repeat relative min-h-[200px] h-full w-full px-1 py-2 rounded-small"
                      style={{
                        backgroundImage: 'url("flight-bg.jpg")',
                      }}
                    >
                      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-md rounded-small"></div>
                      <Listbox
                        aria-label="Actions"
                        onAction={(key) => {
                          setSource(key as string);
                          setSourceOptions([]);
                        }}
                        emptyContent="No results found."
                      >
                        {sourceOptions.map(({ city, code }) => (
                          <ListboxItem
                            key={code}
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
              <div className="relative">
                <Input
                  className="text-white placeholder:text-white relative"
                  classNames={{
                    input: ["placeholder:text-white"],
                  }}
                  variant="bordered"
                  color="danger"
                  placeholder="Destination"
                  startContent={<FaSearch size={18} />}
                  type="search"
                  onChange={(e) => {
                    setDestination(e.target.value);
                    handleDestinationChange(e.target.value);
                  }}
                  value={destination}
                  onClear={() => setDestination("")}
                />

                {destinationOptions.length > 0 && (
                  <div className="w-full min-h-[200px] max-w-[303px] border-small  rounded-small border-default-200  mt-5 absolute top-15 z-20">
                    <div
                      className="bg-cover bg-center bg-no-repeat relative min-h-[200px] h-full w-full px-1 py-2 rounded-small"
                      style={{
                        backgroundImage: 'url("flight-bg.jpg")',
                      }}
                    >
                      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-md rounded-small"></div>
                      <Listbox
                        aria-label="Actions"
                        onAction={(key) => {
                          setDestination(key as string);
                          setDestinationOptions([]);
                        }}
                        emptyContent="No results found."
                      >
                        {destinationOptions.map(({ city, code }) => (
                          <ListboxItem
                            key={code}
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
                value={flightDate}
                onChange={(e) => setFlightDate(e.target.value)}
              />
            </div>
            <Button
              size="lg"
              className="bg-rose-500 hover:bg-rose-600 cursor-pointer rounded-2xl w-full"
              onClick={startScraping}
            >
              Search Flights
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchFlights;
