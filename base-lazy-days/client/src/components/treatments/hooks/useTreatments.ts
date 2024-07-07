import type { Treatment } from "@shared/types";

import { axiosInstance } from "@/axiosInstance";
import { queryKeys } from "@/react-query/constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";

async function getTreatments(): Promise<Treatment[]> {
  const { data } = await axiosInstance.get("/treatments");
  return data;
}

export function useTreatments(): Treatment[] {
  const fallback: Treatment[] = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.treatments],
    queryFn: getTreatments,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  return data;
}

export function usePrefetchTreatments(): void {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery({
    queryKey: [queryKeys.treatments],
    queryFn: getTreatments,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
}
