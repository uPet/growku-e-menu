import * as React from "react";

import "./productCard.css";

import Card from "../../atoms/Card/Card";
import CardActionArea from "../../atoms/CardActionArea/CardActionArea";
import CardMedia from "../../atoms/CardMedia/CardMedia";
import CardContent from "../../atoms/CardContent/CardContent";

export default function ProductCard({
  item,
}: {
  item: { title: string; description: string; price: string; image: string };
}) {
  return (
    <Card>
      <CardActionArea onClick={() => console.log("item", item.title)}>
        <CardContent>
          <h3 className="h5">{item.title}</h3>
          <p>{item.description}</p>
          <p>{item.price}</p>
        </CardContent>
        <CardMedia src={item.image} alt={item.title} />
      </CardActionArea>
    </Card>
  );
}
