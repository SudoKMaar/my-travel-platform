"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaCalendarAlt, FaSearch } from "react-icons/fa";
import { Listbox, ListboxItem, Input } from "@nextui-org/react";
import { Button } from "@/components/ui/button";

const Search = () => {
  const router = useRouter();
  const [searchLocation, setSearchLocation] = useState("");
  const [dates, setDates] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [cities, setCities] = useState([]);

  const handleSearch = () => {
    if (searchLocation && dates) {
      return router.push(`/trips?city=${searchLocation}&dates=${dates}`);
    }
  };

  const searchCities = async (searchQuery: string) => {
    const response = await fetch(
      `https://secure.geonames.org/searchJSON?q=${searchQuery}&maxRows=5&username=kmaar&style=SHORT`
    );
    const parsed = await response.json();
    setCities(
      parsed?.geonames.map((city: { name: string }) => city.name) ?? []
    );
  };

  const activities = [
    { name: "Sea & Sailing", icon: "/ship.svg" },
    { name: "Trekking Tours", icon: "/hiking.svg" },
    { name: "City Tours", icon: "/trolley-bag.svg" },
    { name: "Motor Sports", icon: "/motor-boat.svg" },
    { name: "Jungle Safari", icon: "/cedar.svg" },
  ];

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="absolute left-0 top-0 h-[100vh] w-[100vw] max-w-[100vw] -z-5">
        <Image src="/bg.webp" fill alt="Search" />
      </div>
      <div className="absolute h-[75vh] sm:h-[50vh] w-[90vw] sm:w-[80vw] md:w-[75vw] lg:w-[60vw] xl:w-[50vw] flex flex-col gap-5 m-auto">
        <div className="text-white text-center flex flex-col gap-2">
          <h2 className="text-base sm:text-xl lg:text-2xl font-bold">
            Best Tours picked specially for you!
          </h2>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
            Explore the exotic world.
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-4 rounded-xl">
          <Input
            color="danger"
            variant="bordered"
            className="text-white placeholder:text-white relative"
            startContent={<FaSearch />}
            value={searchLocation}
            onChange={(e) => {
              setSearchLocation(e.target.value);
              searchCities(e.target.value);
            }}
            placeholder="Search Location"
            classNames={{
              input: ["placeholder:text-white"],
            }}
          />
          {cities.length > 0 && (
            <div className="w-full min-h-[200px] max-w-[250px] border-small  rounded-small border-default-200 mt-5 absolute top-52 sm:top-48 z-20">
              <div
                className="bg-cover bg-center bg-no-repeat relative min-h-[200px] h-full w-full px-1 py-2 rounded-small"
                style={{
                  backgroundImage: 'url("/bg.webp")',
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-md rounded-small"></div>
                <Listbox
                  aria-label="Actions"
                  onAction={(key) => {
                    setSearchLocation(key as string);
                    setCities([]);
                  }}
                  className="rounded-small"
                >
                  {cities.map((city) => (
                    <ListboxItem
                      key={city}
                      color="danger"
                      className="text-white"
                    >
                      {city}
                    </ListboxItem>
                  ))}
                </Listbox>
              </div>
            </div>
          )}
          <Input
            type="date"
            placeholder="Dates"
            variant="bordered"
            color="danger"
            className="text-white accent-rose-500"
            startContent={<FaCalendarAlt />}
            value={dates}
            onChange={(e) => setDates(e.target.value)}
          />
          <Button
            type="submit"
            size="lg"
            className="h-full cursor-pointer col-span-2 sm:col-span-1 p-2 bg-rose-500 hover:bg-rose-600 rounded-xl text-base text-white font-medium"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
        <div>
          <ul className="text-white grid grid-cols-5 mt-2">
            {activities.map((activity) => (
              <li
                key={activity.name}
                className="flex items-center justify-center gap-2 flex-col cursor-pointer text-center align-top"
              >
                <div className="p-2 sm:p-5 bg-black bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-300 ">
                  <div className="relative h-10 w-10 sm:h-12 sm:h12">
                    <Image src={activity.icon} fill alt={activity.name} />
                  </div>
                </div>
                <span className="text-base sm:text-lg font-medium">
                  {activity.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Search;
