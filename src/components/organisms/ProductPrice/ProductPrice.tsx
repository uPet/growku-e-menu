import "./productPrice.css";
import CardIcon from "../../atoms/CardIcon";
import CashIcon from "../../atoms/CashIcon";

type ProductPriceProps = {
  cashPrice: string;
  cardPrice: string;
} & React.HTMLAttributes<HTMLDivElement>;

function ProductPrice({ cashPrice, cardPrice }: ProductPriceProps) {

  const [dollarCashPrice, centsCashPrice] = Number(cashPrice)
    ?.toFixed(2)
    .split(".");
  const [dollarCardPrice, centsCardPrice] = Number(cardPrice)
    ?.toFixed(2)
    .split(".");

  return (
    <>
      <div className="price-wrapper">
        {cardPrice && (
          <div className="price">
            <CardIcon />{" "}
            <span className="h2 price-value">${dollarCardPrice}.</span>
            <span className="h2 price-value price-cents">{centsCardPrice}</span>
          </div>
        )}
        {cardPrice && cashPrice && <div className="divider" />}
        {cashPrice && (
          <div className="price">
            <CashIcon/>{" "}
            <span className="h2 price-value">$ {dollarCashPrice}.</span>{" "}
            <span className="h2 price-value price-cents">{centsCashPrice}</span>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductPrice;
