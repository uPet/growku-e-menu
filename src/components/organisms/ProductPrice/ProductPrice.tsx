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
          <div className="price" aria-label={`Card price $${cardPrice}`}>
            <CardIcon aria-hidden="true" />
            <span className="price-value" aria-hidden="true">
              ${dollarCardPrice}.
            </span>
            <span className="price-value price-cents" aria-hidden="true">
              {centsCardPrice}
            </span>
          </div>
        )}
        {cardPrice && cashPrice && <div className="divider" />}
        {cashPrice && (
          <div className="price" aria-label={`Cash price $${cashPrice}`}>
            <CashIcon aria-hidden="true" />
            <span className="price-value" aria-hidden="true">
              $ {dollarCashPrice}.
            </span>
            <span className="price-value price-cents" aria-hidden="true">
              {centsCashPrice}
            </span>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductPrice;
