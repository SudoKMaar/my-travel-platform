"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiClient } from "@/lib/api-client";
import { ADMIN_API_ROUTES } from "@/routes";
import ScrapingQueue from "@/components/scraping-queue";
import CurrentlyScrapingTable from "@/components/current-scrapping-table";

const ScrapeTrips = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState<undefined | string>(
    undefined
  );
  const [jobs, setJobs] = useState([]);

  const searchCities = async (searchQuery: string) => {
    const response = await fetch(
      `https://secure.geonames.org/searchJSON?q=${searchQuery}&maxRows=5&username=kmaar&style=SHORT`
    );
    const parsed = await response.json();
    setCities(
      parsed?.geonames.map((city: { name: string }) => city.name) ?? []
    );
  };

  const startScraping = async () => {
    await apiClient.post(ADMIN_API_ROUTES.CREATE_JOB, {
      url:
        "https://packages.yatra.com/holidays/intl/search.htm?destination=" +
        selectedCity,
      jobType: { type: "location" },
    });
  };

  useEffect(() => {
    const getData = async () => {
      const data = await apiClient.get(ADMIN_API_ROUTES.JOB_DETAILS);
      setJobs(data.data.jobs);
    };
    const interval = setInterval(() => getData(), 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="m-8 grid grid-cols-1 md:grid-cols-3 gap-5">
      <Card className="col-span-1 md:col-span-2">
        <CardContent className="gap-2">
          <Tabs defaultValue="location">
            <TabsList className="grid w-full grid-cols-3 mt-1">
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="flights">Flights</TabsTrigger>
              <TabsTrigger value="hotels">Hotels</TabsTrigger>
            </TabsList>
            <TabsContent value="location">
              <Input
                type="text"
                placeholder="Search for a Location"
                onChange={(e) => {
                  setCities([]);
                  searchCities(e.target.value);
                }}
              />
              <div className="w-full h-[200px] max-w-[260px] px-1 py-2 border border-px rounded-sm mt-5 overflow-y-auto overflow-x-hidden">
                {cities.map((city) => (
                  <Button
                    key={city}
                    variant="outline"
                    className={`text-black w-full ${
                      selectedCity === city ? "active" : ""
                    }`}
                    onClick={() => setSelectedCity(city)}
                  >
                    {city}
                  </Button>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col gap-5 ">
          <div>
            {selectedCity && (
              <h1 className="text-xl">Scrape data for {selectedCity}</h1>
            )}
          </div>
          <Button
            variant="default"
            onClick={startScraping}
            size="lg"
            className="w-full bg-[#0E1428] hover:bg-[#0E1428]/90"
          >
            Scrape
          </Button>
        </CardFooter>
      </Card>
      <ScrapingQueue />
      <div className="col-span-1 md:col-span-3">
        <CurrentlyScrapingTable jobs={jobs} />
      </div>
    </section>
  );
};

export default ScrapeTrips;
