import prisma from "@/lib/prisma";
import { startLocationScraping } from "@/scrapper/location-scrapping";
import { startPackageScraping } from "@/scrapper/package-scrapping";

const SBR_WS_ENDPOINT = process.env.SBR_WS_ENDPOINT;

export async function register() {
  //This if statement is important, read here: https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { Worker } = await import("bullmq");
    const puppeteer = await import("puppeteer");
    const { connection } = await import("@/lib/redis");
    const { importQueue } = await import("@/lib/queue");

    new Worker(
      "importQueue",
      async (job) => {
        console.log("Connecting to Scraping Browser...");
        try {
          const browser = await puppeteer.connect({
            browserWSEndpoint: SBR_WS_ENDPOINT,
          });
          const page = await browser.newPage();
          if (job.data.jobType.type === "location") {
            console.log("Connected! Navigating to " + job.data.url);
            await page.goto(job.data.url, { timeout: 20000 });
            console.log("Navigated! Scraping page content...");
            const packages = await startLocationScraping(page);
            console.log({ packages });
            await prisma.jobs.update({
              where: { id: job.data.id },
              data: { isComplete: true, status: "complete" },
            });
            for (const pkg of packages) {
              const jobCreated = await prisma.jobs.findFirst({
                where: {
                  url: `https://packages.yatra.com/holidays/intl/details.htm?packageId=${pkg?.id}`,
                },
              });
              if (!jobCreated) {
                const job = await prisma.jobs.create({
                  data: {
                    url: `https://packages.yatra.com/holidays/intl/details.htm?packageId=${pkg?.id}`,
                    jobType: { type: "package" },
                  },
                });
                importQueue.add("package", { ...job, packageDetails: pkg });
              }
            }
          } else if (job.data.jobType.type === "package") {
            const alreadyScrapped = await prisma.trips.findUnique({
              where: { id: job.data.packageDetails.id },
            });
            if (!alreadyScrapped) {
              console.log("Connected! Navigating to " + job.data.url);
              await page.goto(job.data.url, { timeout: 120000 });
              console.log("Navigated! Scraping page content...");
              const pkg = await startPackageScraping(
                page,
                job.data.packageDetails
              );
              // @ts-ignore
              await prisma.trips.create({ data: pkg });
              await prisma.jobs.update({
                where: { id: job.data.id },
                data: { isComplete: true, status: "complete" },
              });
            }
          }
        } catch (error) {
          console.log(error);
          await prisma.jobs.update({
            where: { id: job.data.id },
            data: { isComplete: true, status: "failed" },
          });
        } finally {
          console.log("Browser closed successfully");
        }
      },
      {
        connection,
        concurrency: 10,
        removeOnComplete: { count: 1000 },
        removeOnFail: { count: 5000 },
      }
    );
  }
}
