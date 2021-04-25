import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { Currency } from "../utils/types";

type Props = {
  currency: Currency;
};

export default function CurrencyCard({ currency }: Props) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h5" gutterBottom>
          {currency.name}
        </Typography>
        <Typography>{currency.country}</Typography>
        <Typography>{currency.trust_score_rank}</Typography>
        <a href={currency.url} target="_blank" rel="noreferrer">
          {currency.url}
        </a>
        <img src={currency.image} alt="icon"></img>
      </CardContent>
      <CardActions>
        <Link to={`/currency/${currency.id}`}>
          <Button size="small">Details</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
