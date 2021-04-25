import React, { useEffect, useState } from "react";
import { get } from "../utils/api";
import { Link, useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Currency } from "..//utils/types";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function CurrencyPage() {
  const [currency, setCurrency] = useState<Currency | null>(null);
  const [loading, setLoading] = useState(true);
  let exchangesUrl = `https://api.coingecko.com/api/v3/exchanges/`;
  const { currency_id } = useParams<{ currency_id: string }>();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await get(`${exchangesUrl}${currency_id}`);
      setCurrency(response);
      setLoading(false);
    }
    fetchData();
  }, [exchangesUrl, currency_id]);
  return (
    <div>
      {currency && !loading ? (
        <>
          <Link to={`/dashboard`}>
            <Button size="small">Back</Button>
          </Link>
          <p>{currency.name}</p>
          <p>{currency.country}</p>
          <p>{currency.trust_score_rank}</p>
          <img src={currency.image} alt="icon"></img>
          <p>{currency.year_established}</p>
          <p>social media links</p>
          <p>{currency.description}</p>
        </>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}
