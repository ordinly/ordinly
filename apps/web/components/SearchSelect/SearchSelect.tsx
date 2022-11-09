import { useEffect, useState, useCallback, useRef } from "react";

import { isEqual } from "lodash";

import { Input } from "@components/Input";
import { Menu } from "@components/Menu";
import { useSearch } from "@components/Search";
import { Icon } from "@components/Icon";

import Option from "./Option";
import Selected from "./Selected";

import styles from "./SearchSelect.module.css";

const SearchSelect = ({
  id,
  onFetchData,
  entity,
  value,
  onChange,
  multi,
  disabled,
  initialSearchTerm = "",
  menuOffset = { x: 0, y: 0 },
  exclude = [],
  _ids = [],
  error,
}) => {
  const containerRef = useRef();
  const menuRef = useRef();

  const [open, setOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  const [loadedOptions, setLoadedOptions] = useState([]);

  const { items, loading, total, searchValues, changeSearchValues } = useSearch(
    {
      onFetchData,
      entity: entity.split(":")[0],
      pageSize: 25,
      exclude,
      _ids,
    }
  );

  const openMenu = () => {
    if (!disabled) {
      setOpen(true);
    }
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const onSelect = (newValue) => {
    if (multi) {
      const included =
        Array.isArray(value) &&
        value?.find((current) => isEqual(current, newValue));

      if (included) {
        onRemove(newValue);
      } else {
        onChange([...value, newValue]);
      }
    } else {
      if (value === newValue) {
        onRemove(newValue);
      } else {
        onChange(newValue);
      }
    }
  };

  const onRemove = (newValue) => {
    if (multi) {
      onChange(value.filter((current) => !isEqual(current, newValue)));
    } else {
      onChange(undefined);
    }
  };

  useEffect(() => {
    changeSearchValues({ _ids: multi ? value : [value], searchTerm, page: 1 });
  }, [searchTerm]);

  useEffect(() => {
    setLoadedOptions([
      ...loadedOptions,
      ...items.filter(
        ({ _id }) => !loadedOptions.find(({ _id: current }) => current === _id)
      ),
    ]);
  }, [items]);

  return (
    <div ref={containerRef}>
      {multi || !value ? (
        <>
          <Input
            id={id}
            value={searchTerm}
            onChange={setSearchTerm}
            onClick={openMenu}
            icon="caret-down"
            error={error}
            disabled={disabled}
          />

          {open ? (
            <Menu
              id={`${id}-menu`}
              mountId={id}
              menuRef={menuRef}
              align="center"
              position="bottom"
              fluid
              xOffset={menuOffset.x}
              yOffset={menuOffset.y}
              onClose={closeMenu}
              closeOnClick={!multi}
            >
              {items.length ? (
                <>
                  {items.map((item) => (
                    <Option
                      entity={entity}
                      {...item}
                      onSelect={onSelect}
                      selected={
                        multi && Array.isArray(value)
                          ? entity === "companies:project"
                            ? value?.find(
                                ({ companyId }) => item._id === companyId
                              )
                            : value?.includes(item._id)
                          : value === item._id
                      }
                    />
                  ))}
                </>
              ) : (
                <div className={styles.noItemsContainer}>
                  <Icon icon="empty-items" />
                  <p className={styles.noItemsText}>No items</p>
                </div>
              )}
            </Menu>
          ) : null}
        </>
      ) : null}

      {value ? (
        multi ? (
          <>
            {value.map((item, index) => (
              <Selected
                entity={entity}
                disabled={disabled}
                onRemove={onRemove}
                value={item}
                onChange={(updatedItem) => {
                  const newValue = [...value];

                  newValue.splice(index, 1, { ...item, ...updatedItem });

                  onChange(newValue);
                }}
                {...loadedOptions.find(({ _id: current }) =>
                  entity === "companies:project"
                    ? current === item.companyId
                    : current === item
                )}
              />
            ))}
          </>
        ) : (
          <Selected
            entity={entity}
            disabled={disabled}
            onRemove={onRemove}
            {...loadedOptions.find(({ _id: current }) => current === value)}
          />
        )
      ) : null}
    </div>
  );
};

export default SearchSelect;
