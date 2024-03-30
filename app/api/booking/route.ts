import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_KEY || "");

export async function POST(request: Request) {
  try {
    const { bookingId, bookingType, userId, taxes, date } =
      await request.json();

    let bookingDetails;
    switch (bookingType) {
      case "trips":
        bookingDetails = await prisma.trips.findUnique({
          where: { id: bookingId },
        });
        break;
    }
    if (bookingDetails) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: bookingDetails.price + taxes,
        currency: "inr",
        automatic_payment_methods: {
          enabled: true,
        },
      });

      await prisma.bookings.create({
        data: {
          bookingType,
          bookingTypeId: bookingId.toString(),
          user: { connect: { id: userId } },
          paymentIntent: paymentIntent.id,
          totalAmount: paymentIntent.amount,
          date,
        },
      });

      return NextResponse.json(
        {
          client_secret: paymentIntent.client_secret,
        },
        { status: 201 }
      );
    }
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

export async function PATCH(request: Request) {
  try {
    const { paymentIntent } = await request.json();

    if (paymentIntent) {
      await prisma.bookings.update({
        where: { paymentIntent },
        data: {
          isCompleted: true,
        },
      });
      return NextResponse.json(
        {
          status: "Payment Successfull.",
        },
        { status: 200 }
      );
    }
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
