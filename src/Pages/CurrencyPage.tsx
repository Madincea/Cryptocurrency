import React, { useEffect, useState } from "react";
import { get } from "../utils/api";
import { Link, useParams } from "react-router-dom";
import { Currency } from "..//utils/types";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import styles from "./CurrencyPage.module.scss";
import facebookIcon from "../Resources/facebook.png";
import twitterIcon from "../Resources/twitter.png";
import redditIcon from "../Resources/Reddit.svg";

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
    <div className={styles.currency}>
      {currency && !loading ? (
        <div className={styles.card_container}>
          <Card variant="outlined" className={styles.card}>
            <CardContent className={styles.content}>
              <div className={styles.title_container}>
                <img src={currency.image} alt="icon"></img>
                <span className={styles.name}>{currency.name}</span>
              </div>
              <div className={styles.info}>
                <p>Country: {currency.country} </p>
                <p>
                  <a href={currency.url} target="_blank" rel="noreferrer">
                    {currency.url}
                  </a>
                </p>
                <p>Trust Score Rank: {currency.trust_score_rank}</p>
                {currency.year_established && (
                  <p>Year Established: {currency.year_established}</p>
                )}
                {currency.description && <p>{currency.description}</p>}
                <div className={styles.social_media}>
                  <a
                    href={`https://www.facebook.com//${currency.facebook_url}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={facebookIcon} />
                  </a>
                  <a
                    href={`https://twitter.com/${currency.twitter_handle}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={twitterIcon} />
                  </a>
                  <a
                    href={`https://www.reddit.com///${currency.reddit_url}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={redditIcon} />
                  </a>
                </div>
              </div>
            </CardContent>
            <CardActions className={styles.actions}>
              <Link to={`/dashboard`}>
                <Button className={styles.backButton}>Back</Button>
              </Link>
            </CardActions>
          </Card>
        </div>
      ) : (
        <div className="spinner">
          <CircularProgress />
        </div>
      )}
    </div>
  );
}
