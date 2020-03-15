import React from "react";
import styles from "./FiltersBar.module.css";

export default function FiltersBar(props) {
  const { availableFilters, filters, onChange } = props;

  function handleChange(filterId, filterValue) {
    const updatedFilters = { ...filters };
    const previousFilter = filters[filterId] || [];
    let newFilter = previousFilter;

    if (previousFilter.includes(filterValue)) {
      newFilter = [
        ...previousFilter.slice(0, previousFilter.indexOf(filterValue)),
        ...previousFilter.slice(previousFilter.indexOf(filterValue) + 1)
      ];
    } else {
      newFilter.push(filterValue);
    }

    if (!newFilter.length) {
      delete updatedFilters[filterId];
    } else {
      updatedFilters[filterId] = newFilter;
    }

    return onChange(updatedFilters);
  }
  return (
    <div className={styles.FiltersBar}>
      {Object.keys(availableFilters).map(filterId => {
        return (
          <div key={filterId} className={styles.filter}>
            <h2>{filterId}</h2>
            {availableFilters[filterId].map(filterValue => {
              const label = (filterValue !== '' && filterValue) || `no ${filterId}`;
              const filterHtmlId = `${filterId}-${filterValue || 'no-value'}`

              return (
                <div key={filterValue} className={styles.filterValue}>
                  <input
                    type="checkBox"
                    id={filterHtmlId}
                    onChange={() => handleChange(filterId, filterValue)}
                  />
                  <label htmlFor={filterHtmlId}>{label}</label>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
