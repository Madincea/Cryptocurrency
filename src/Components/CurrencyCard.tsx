import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { Currency } from "../utils/types";
import styles from "./CurrencyCard.module.scss";

type Props = {
  currency: Currency;
};

export default function CurrencyCard({ currency }: Props) {
  return (
    <div className={styles.card_container}>
      <Card variant="outlined" className={styles.card}>
        <CardContent className={styles.content}>
          <div className={styles.title_container}>
            <img src={currency.image} alt="icon"></img>
            <span className={styles.name}>{currency.name}</span>
            <span>Rank: {currency.trust_score_rank}</span>
          </div>
          <div className={styles.country_container}>
            <span>{currency.country} </span>{" "}
            <a
              href={currency.url}
              className={styles.card_link}
              target="_blank"
              rel="noreferrer"
            >
              Link
            </a>
          </div>
        </CardContent>
        <CardActions className={styles.actions}>
          <Link to={`/currency/${currency.id}`}>
            <Button className="cardButton">Details</Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  );
}
