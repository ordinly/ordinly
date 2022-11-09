import { useEffect, useContext } from "react";

import { useSpring, animated } from "@react-spring/web";

import { useRouter } from "next/router";

import SearchContext from "@contexts/SearchContext";

import { Select } from "@components/Select";
import { Button } from "@components/Button";
import { Input } from "@components/Input";

import styles from "./Search.module.css";

const filterTypes = {
  companies: "Company",
  jobs: "Job",
};

const Search = () => {
  const { search, updateSearch } = useContext(SearchContext);

  const transition = useSpring({
    from: { opacity: 0, y: -100 },
    to: { opacity: 1, y: 0 },
  });

  useEffect(() => {
    if (!search?.type) {
      updateSearch({ type: "companies" });
    }
  }, []);

  const onChangeType = (newValue) => {
    updateSearch({ type: newValue });
  };

  const onChangeQuery = (newValue) => {
    updateSearch({ query: newValue });
  };

  return (
    <>
      <animated.div className={styles.container} style={transition}>
        <div className={styles.inline}>
          <Select
            id="search-type-select"
            options={[
              { label: "Companies", value: "companies" },
              { label: "Jobs", value: "jobs" },
              /**{ label: "Careers", value: "careers" }*/
              ,
            ]}
            onChange={onChangeType}
            value={search?.type}
          />
        </div>

        <div className={styles.inline}>
          <Input
            value={search?.query}
            placeholder="Search"
            onChange={onChangeQuery}
          />
        </div>

        <div className={styles.inline}>
          <Button
            text={`${filterTypes[search?.type]} filters`}
            onClick={() => {}}
            icon="filter"
          />
        </div>
      </animated.div>
    </>
  );
};

export default Search;
