import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["sw-species"],
    queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    getNextPageParam: (pageParam) => pageParam.next || undefined,
  });

  if (isLoading) {
    return <div className="loading">Loading</div>;
  }

  if (isError) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <>
      {isFetchingNextPage && <div className="loading">Fetching Next Page</div>}
      <InfiniteScroll
        loadMore={() => {
          if (!isFetching) {
            fetchNextPage();
          }
        }}
        hasMore={hasNextPage}
      >
        {data.pages.map((pageData) =>
          pageData.results.map((species) => (
            <Species key={species.created} {...species} />
          ))
        )}
      </InfiniteScroll>
    </>
  );
}
