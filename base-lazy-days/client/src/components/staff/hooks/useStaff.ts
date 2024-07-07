import { useState } from "react";

import type { Staff } from "@shared/types";

import { axiosInstance } from "@/axiosInstance";
import { queryKeys } from "@/react-query/constants";
import { useQuery } from "@tanstack/react-query";

async function getStaff(): Promise<Staff[]> {
  const { data } = await axiosInstance.get("/staff");
  return data;
}

export function useStaff() {
  const [filter, setFilter] = useState("all");
  const fallback: Staff[] = [];

  const { data = fallback } = useQuery({
    queryKey: [queryKeys.staff],
    queryFn: getStaff,
  });

  const staff =
    filter === "all"
      ? data
      : data.filter((d) =>
          d.treatmentNames.includes(filter.toLocaleLowerCase())
        );

  return { staff, filter, setFilter };
}
