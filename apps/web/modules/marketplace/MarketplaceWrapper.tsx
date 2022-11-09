import { SearchProvider } from "@contexts/SearchContext";

const Provider = ({ children }) => {
  return <SearchProvider>{children}</SearchProvider>;
};

export default Provider;
