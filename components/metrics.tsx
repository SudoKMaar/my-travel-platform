import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Metrics = ({ title, value }: { title: string; value: number }) => {
  return (
    <Card className="bg-opacity-40">
      <CardHeader className="text-lg">{title}</CardHeader>
      <CardContent className="text-5xl font-semibold">{value}</CardContent>
    </Card>
  );
};

export default Metrics;
