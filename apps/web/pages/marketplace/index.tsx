import { useContext } from "react";

import Head from "next/head";

import { useTransition, animated } from "@react-spring/web";

import MarketplaceWrapper from "@modules/marketplace/MarketplaceWrapper";

import SearchContext from "@contexts/SearchContext";

import Search from "@modules/marketplace/Search";

import { CompanySearchTile } from "@components/Tile";

import styles from "./Marketplace.module.css";

const Wrapped = () => (
  <MarketplaceWrapper>
    <Marketplace />
  </MarketplaceWrapper>
);

const Marketplace = () => {
  const { results } = useContext(SearchContext);

  const transitions = useTransition(results, {
    from: { opacity: 0, y: 100 },
    enter: { opacity: 1, y: 0 },
    unique: true,
    trail: 200 / results.length,
    leave: {
      display: "none",
    },
    delay: 100,
  });

  return (
    <>
      <Head>
        <title>Marketplace</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.column}>
          <Search />

          {transitions((style, { _id, name, description, tags, rating }) => (
            <animated.div style={style}>
              <CompanySearchTile
                _id={_id}
                name={name}
                rating={rating}
                description={description}
                tags={tags}
              />
            </animated.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Wrapped;
