import { useState, createContext, useContext, useEffect } from "react";

import { useRouter } from "next/router";

import NotificationContext from "@contexts/NotificationContext";

import { searchCompanies } from "@ordinly/api-abstraction/companies";

type Search = {
  type?: "jobs" | "companies";
  company?: {};
  project?: {};
  location?: {
    country?: string;
    secondary?: string;
    tertiary?: string;
    distance?: number;
  };
  query?: string;
};

const SearchContext = createContext<{
  search: Search;
  updateSearch: (newSearch: Search) => void;
  results: {
    name: string;
    _id: string;
    profilePicture: {};
    rating?: { rating: number; numberOfReviews: number };
    description?: string;
    tags?: { label: string; color: string }[];
  }[];
}>(null);

export default SearchContext;

export const SearchProvider = ({ children }) => {
  const router = useRouter();

  const { notification } = useContext(NotificationContext);

  const [search, setSearch] = useState<Search>(null);
  const [results, setResults] = useState([]);

  const updateSearch = (newSearch: Search) => {
    setSearch({ ...search, ...newSearch });
  };

  const fetchSearch = async () => {
    try {
      if (search?.type === "companies") {
        const response = await searchCompanies({ query: search?.query });

        if ("companies" in response) {
          setResults(response.companies);
        }
      }
    } catch (caught) {
      const { error } = caught;

      /** notification({
        variant: "error",
        title: "Error making this search",
        message: error,
      });*/
    }
  };

  useEffect(() => {
    (async () => {
      await fetchSearch();
    })();
  }, [search]);

  return (
    <SearchContext.Provider value={{ results, search, updateSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
