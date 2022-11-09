import { useState, useEffect, useCallback } from "react";

import {
  searchCompanies,
  getCompaniesByIds,
} from "@ordinly/api-abstraction/companies";

import { useTransition, animated, config } from "@react-spring/web";

import { Input } from "@components/Input";
import { Icon } from "@components/Icon";
import { Checkbox } from "@components/Checkbox";
import { ProfilePicture } from "@components/ProfilePicture";

import { debounce } from "lodash";

import styles from "./InvitationSearch.module.css";

import type { InvitationSearchProps } from "./types";

const onSearch = async ({ searchTerm }) => {
  const { companies: newCompanies } = await searchCompanies({
    searchTerm,
  });

  return newCompanies.map(({ name, _id }) => ({ _id, name }));
};

const onFetchSelected = async ({ value }: { value: string[] }) => {
  const { companies: newCompanies } = await getCompaniesByIds({
    ids: value,
  });

  return newCompanies.map(({ name, _id }) => ({ _id, name }));
};

const InvitationSearch = ({
  onChange,
  value,
  exclude = [],
}: InvitationSearchProps) => {
  const [searchTerm, setSearchValue] = useState("");

  const [items, setItems] = useState([]);

  const [selected, setSelected] = useState([]);

  const selectedTransitions = useTransition(selected, {
    config: config.gentle,
    key: ({ _id }) => _id,
    from: { opacity: 0, transform: "translate3d(-25%, 0px, 0px)" },
    leave: {
      opacity: 0,
      transform: "translate3d(25%, 0px, 0px)",
      height: 0,
    },
    enter: { opacity: 1, transform: "translate3d(0%, 0px, 0px)" },
  });

  const transitions = useTransition(
    items.filter(
      ({ _id: itemId }) =>
        !selected.find(({ _id: selectedId }) => itemId === selectedId) &&
        !exclude.find((selectedId) => itemId === selectedId)
    ),
    {
      config: config.gentle,
      key: ({ _id }) => _id,
      from: { opacity: 0, transform: "translate3d(-25%, 0px, 0px)" },
      leave: {
        opacity: 0,
        transform: "translate3d(25%, 0px, 0px)",
        height: 0,
      },
      enter: { opacity: 1, transform: "translate3d(0%, 0px, 0px)" },
    }
  );

  const fetchItems = useCallback(
    debounce(async (newSearchValue) => {
      setItems(await onSearch({ searchTerm: newSearchValue }));
    }, 400),
    [onSearch]
  );

  useEffect(() => {
    onChange(selected.map(({ _id }) => _id));
  }, [selected]);

  const addInvitation = ({ _id, name }) => {
    setSelected([...selected, { _id, name }]);
  };

  const removeInvitation = ({ _id }) => {
    setSelected(selected.filter(({ _id: itemId }) => itemId !== _id));
  };

  useEffect(() => {
    if (value?.length) {
      (async () => {
        setSelected(await onFetchSelected({ value }));
      })();
    }
  }, []);

  useEffect(() => {
    fetchItems(searchTerm);
  }, [searchTerm]);

  return (
    <>
      <div className={styles.selectedContainer}>
        {selected?.length ? (
          <>
            <b>Invited</b>
            {selectedTransitions((style, { _id, name }, { key }) => (
              <animated.div
                key={key}
                className={styles.container}
                style={style}
                onClick={() => removeInvitation({ _id })}
              >
                <div className={styles.flex}>
                  <ProfilePicture _id={_id} variant="company" size="small" />

                  <p className={styles.name}>{name}</p>

                  <div className={styles.checkbox}>
                    <Checkbox value={true} />
                  </div>
                </div>
              </animated.div>
            ))}
            <hr className={styles.separator} />
          </>
        ) : null}
      </div>

      <div className={styles.inputContainer}>
        <Input
          onChange={setSearchValue}
          value={searchTerm}
          placeholder="Search companies"
        />
      </div>

      {items?.length ? (
        <>
          {transitions((style, { _id, name }, { key }) => (
            <animated.div
              key={key}
              className={styles.container}
              style={style}
              onClick={() => addInvitation({ _id, name })}
            >
              <div className={styles.flex}>
                <ProfilePicture _id={_id} variant="company" size="small" />

                <p className={styles.name}>{name}</p>

                <div className={styles.checkbox}>
                  <Checkbox value={false} />
                </div>
              </div>
            </animated.div>
          ))}
        </>
      ) : (
        <div className={styles.noItemsContainer}>
          <Icon icon="empty-items" />
          <p className={styles.noItemsText}>No items</p>
        </div>
      )}
    </>
  );
};

export default InvitationSearch;
