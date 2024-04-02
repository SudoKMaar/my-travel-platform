import { NextResponse } from "next/server";
import { startOfDay, endOfDay } from "date-fns";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const startDate = startOfDay(
      // @ts-ignore
      new Date(new Date() - 30 * 24 * 60 * 60 * 1000)
    );
    const endDate = endOfDay(new Date());

    const hotels = await prisma.hotels.groupBy({
      by: ["scrappedOn"],
      _count: true,
      where: {
        scrappedOn: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const flights = await prisma.flights.groupBy({
      by: ["scrappedOn"],
      _count: true,
      where: {
        scrappedOn: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const trips = await prisma.trips.groupBy({
      by: ["scrapedOn"],
      _count: true,
      where: {
        scrapedOn: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
    return NextResponse.json(
      {
        hotels,
        trips,
        flights,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json({ message: error.message }, { status: 400 });
      }
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }
  return NextResponse.json(
    { message: "An unexpected error occurred." },
    { status: 500 }
  );
}
