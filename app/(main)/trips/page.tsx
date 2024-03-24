"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa";
import { apiClient } from "@/lib/api-client";
import { TripType } from "@/index";
import { USER_API_ROUTES } from "@/routes";
import { removeHtmlTags } from "@/lib/remove-html-tags";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

const TripsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchCity = searchParams.get("city");
  const [trips, setTrips] = useState<TripType[]>([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await apiClient.get(
          `${USER_API_ROUTES.GET_CITY_TRIPS}?city=${searchCity}`
        );
        setTrips(response.data.trips);
      } catch (error: any) {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              toast({
                variant: "destructive",
                title: "ID is required!!!",
              });
              break;
            case 404:
              toast({
                variant: "destructive",
                title: "Trip Not Found",
              });
              break;
            case 500:
            default:
              toast({
                variant: "destructive",
                title: "An unexpected error occurred",
              });
              break;
          }
        } else if (error.request) {
          toast({
            variant: "destructive",
            title: "No response received from the server.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "An error occurred while setting up the request.",
          });
        }
      }
    };
    if (searchCity) getData();
  }, [searchCity]);

  return (
    <div className="m-2 sm:m-10 md:m-2 md:px-3 lg:px-6 lg:m-8 px-1 sm:px-[5vw] min-h-[80vh]">
      <Button
        className="my-5"
        variant="default"
        size="lg"
        onClick={() => router.push("/")}
      >
        <FaChevronLeft className="text-white mr-2" />
        Go Back
      </Button>
      {trips.length === 0 ? (
        <p className="w-full mx-auto text-xl text-center">Searching...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="grid grid-cols-9 gap-5 rounded-2xl border border-neutral-300 cursor-pointer col-span-1"
              onClick={() => router.push(`/trips/${trip.id}`)}
            >
              <div className="relative w-full h-48 col-span-3 ">
                <Image
                  src={trip.images[0]}
                  alt={trip.name}
                  fill
                  className="rounded-2xl"
                />
              </div>
              <div className="col-span-6 pt-5 pr-5 flex flex-col gap-1">
                <h2 className="text-lg font-medium capitalize">
                  <span className="line-clamp-1">{trip.name}</span>
                </h2>
                <div>
                  <ul className="flex gap-5 w-full overflow-hidden">
                    {trip.destinationDetails.map((detail, index) => (
                      <li key={detail.name}>
                        <Badge
                          variant={index % 2 === 0 ? "default" : "destructive"}
                        >
                          {detail.name}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="line-clamp-1">
                    {removeHtmlTags(trip.description)}
                  </p>
                </div>
                <div className="flex gap-4">
                  <div>{trip.days} Days</div>
                  <div>{trip.nights} Nights</div>
                </div>

                <div className="flex justify-between">
                  <span>{trip.id}</span>
                  <span>
                    <strong>₹{trip.price}</strong> / person
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TripsPage;
