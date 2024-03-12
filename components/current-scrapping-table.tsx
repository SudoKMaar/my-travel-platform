import React from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface JobType {
  id: string;
  url: string;
  createdAt: string;
  jobType: any;
  status: "active" | "failed" | "complete";
}

const statusColorMap: {
  active: string;
  failed: string;
  complete: string;
} = {
  active: "green-500",
  failed: "red-500",
  complete: "[#0E1428]",
};

export default function CurrentlyScrapingTable({ jobs }: { jobs: JobType[] }) {
  const renderCell = React.useCallback(
    (user: JobType, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof JobType];

      function formatDateAndTime(inputDate: string) {
        const date = new Date(inputDate);

        const options = {
          weekday: "long",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          timeZoneName: "short",
        } as Intl.DateTimeFormatOptions;

        const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
          date
        );

        return formattedDate;
      }
      switch (columnKey) {
        case "url":
          return (
            <Link href={cellValue} className="hover:underline" target="_blank">
              {cellValue}
            </Link>
          );
        case "jobType":
          return cellValue.type;
        case "createdAt":
          return formatDateAndTime(cellValue);
        case "status":
          const status: keyof typeof statusColorMap = cellValue;
          return (
            <Badge
              className={`text-white bg-${statusColorMap[status]} hover:bg-${statusColorMap[status]} capitalize`}
            >
              {cellValue}
            </Badge>
          );

        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">ID</TableHead>
          <TableHead className="">URL</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Job Type</TableHead>
          <TableHead className="text-center">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{renderCell(user, "id")}</TableCell>
            <TableCell>{renderCell(user, "url")}</TableCell>
            <TableCell>{renderCell(user, "createdAt")}</TableCell>
            <TableCell>{renderCell(user, "jobType")}</TableCell>
            <TableCell>{renderCell(user, "status")}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
