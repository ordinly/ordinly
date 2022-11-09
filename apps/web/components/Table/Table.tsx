import TableCell from "./TableCell";

import styles from "./Table.module.css";

import { TableProps } from "./types";

const Table = <RowDefinition extends { [key: string]: any }>({
  id = Date.now().toString(),
  columns = [],
  rows = [],
  onRowClick,
}: TableProps<RowDefinition>) => {
  return (
    <div className={styles.container} id={id}>
      <table className={styles.table}>
        {columns.some(({ title }) => title) ? (
          <thead>
            <tr className={styles.headerRow}>
              {columns.map(({ title, sticky }) => (
                <TableCell
                  showHeader
                  style={{ textAlign: "left" }}
                  tableId={id}
                  sticky={sticky}
                >
                  {title}
                </TableCell>
              ))}
            </tr>
          </thead>
        ) : null}

        <tbody className={styles.body}>
          {rows.map((row) => (
            <tr
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={`${styles.row} ${onRowClick ? styles.clickable : ""}`}
            >
              {columns.map(({ dataKey, display, sticky, style }) => (
                <>
                  {display ? (
                    <>
                      {display({
                        data: row[dataKey],
                        row,
                        tableId: id,
                      })}
                    </>
                  ) : (
                    <TableCell tableId={id} sticky={sticky} style={style}>
                      {row[dataKey]}
                    </TableCell>
                  )}
                </>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
