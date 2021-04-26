import React, { useEffect, useState } from "react";
import { get } from "../utils/api";
import { INITIAL_PAGE_SIZE } from "../utils/constants";
import CurrencyCard from "../Components/CurrencyCard";
import Pagination from "@material-ui/lab/Pagination";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "./Dashboard.module.scss";

export default function Dashboard() {
  const [currencyList, setCurrencyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  let exchangesUrl = `https://api.coingecko.com/api/v3/exchanges`;

  const handlePageChange = (
    event: any,
    value: React.SetStateAction<number>
  ) => {
    setPage(value);
  };
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await get(exchangesUrl, {
        per_page: INITIAL_PAGE_SIZE,
        page: page,
      });
      setCurrencyList(response);
      setLoading(false);
    }
    fetchData();
  }, [exchangesUrl, page]);

  if (loading) {
    return (
      <div className="spinner">
        <CircularProgress />{" "}
      </div>
    );
  }
  return (
    <>
      <h1>Cryptocurrency Exchanges</h1>
      <div className={styles.dashboard_container}>
        {currencyList.map((currency, index) => (
          <CurrencyCard key={index} currency={currency} />
        ))}
        <Pagination
          className={styles.pagination}
          count={10}
          page={page}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
}
