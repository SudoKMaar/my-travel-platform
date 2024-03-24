import React from "react";
import { DetailedIntinearyType } from "@/index";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Iteniary = ({ data }: { data: DetailedIntinearyType[] }) => {
  return (
    <div>
      <div></div>
      <div className="flex flex-col gap-10 items-center justify-center mt-10 relative">
        <div className="h-[95%] w-[3px] absolute left-[16.5%] top-12 bg-rose-200 z-0"></div>
        {data.map((dt, index) => {
          return (
            <div
              className="grid grid-cols-3 items-center justify-center z-0"
              key={dt.title}
            >
              <div className=" flex items-center justify-center z-20">
                <div className="h-[180px] w-[180px] bg-white flex items-center justify-center rounded-full border-3 border-dotted border-rose-500 z-20">
                  <div className="h-[150px] w-[150px] bg-rose-500 rounded-full items-center justify-center flex z-20">
                    <h1 className="text-white font-medium text-2xl">
                      Day {index + 1}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <Card className="text-rose-text-title p-5">
                  <CardHeader className="font-medium text-2xl border-b-2  border-gray-300">
                    <CardTitle>{dt.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h2>{dt.value}</h2>
                  </CardContent>
                </Card>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Iteniary;
