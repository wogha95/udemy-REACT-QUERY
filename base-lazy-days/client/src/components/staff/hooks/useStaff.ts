import { useCallback, useState } from "react";

import type { Staff } from "@shared/types";

import { axiosInstance } from "@/axiosInstance";
import { queryKeys } from "@/react-query/constants";
import { useQuery } from "@tanstack/react-query";
import { filterByTreatment } from "../utils";

async function getStaff(): Promise<Staff[]> {
  const { data } = await axiosInstance.get("/staff");
  return data;
}

export function useStaff() {
  const [filter, setFilter] = useState("all");
  const fallback: Staff[] = [];

  const selectFn = useCallback(
    (unfilteredStaff: Staff[]) => {
      if (filter === "all") {
        return unfilteredStaff;
      }
      return filterByTreatment(unfilteredStaff, filter);
    },
    [filter]
  );

  const { data: staff = fallback } = useQuery({
    queryKey: [queryKeys.staff],
    queryFn: getStaff,
    select: (data) => selectFn(data),
  });

  return { staff, filter, setFilter };
}
