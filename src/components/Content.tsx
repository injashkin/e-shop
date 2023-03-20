import ShopCard, {ShopCardProps} from "./ShopCard";
import ShopList from "./ShopList";
import products from "../products.json"
 
const props = products;

export default function Content() {
  return (
    <main className="container">
      <ShopCard {...props} />
    </main>
  );
}
