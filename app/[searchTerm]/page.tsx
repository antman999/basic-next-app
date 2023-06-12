import React from "react";
import getResults from "@/lib/getResults";
import Item from "./components/Item";

type Props = {
  params: {
    searchTerm: string;
  };
};

export async function generateMetadata({ params: { searchTerm } }: Props) {
  const resultsData: Promise<SearchResult> = getResults(searchTerm);
  const data = await resultsData;

  const displayTerm = searchTerm.replaceAll("%20", " ");
  if (!data?.query?.pages) {
    return {
      title: `${displayTerm} not found`,
    };
  }

  return {
    title: displayTerm,
    description: "Search results",
  };
}

export default async function PageResults({ params: { searchTerm } }: Props) {
  const resultsData: Promise<SearchResult> = getResults(searchTerm);
  const data = await resultsData;
  const results: Result[] | undefined = data?.query?.pages;

  const content = (
    <main className="bg-slate-200 mx-auto max-w-lg py-1 min-h-screen">
      {results ? (
        Object.values(results).map((result) => {
          return <Item key={result.pageId} result={result} />;
        })
      ) : (
        <h2>{`${searchTerm} not found`}</h2>
      )}
    </main>
  );

  return content;
}
