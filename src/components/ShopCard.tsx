export interface ShopCardProps {
  id: string;
  name: string;
  price: number;
  images: string;
  brand: string;
  article: number;
  barcode: number;
  manufacturer: string;
  description: string;
  size: number;
  type: string;
}

export default function ShopCard(props: ShopCardProps) {
  const {
    id,
    name,
    price,
    images,
    brand,
    barcode,
    article,
    manufacturer,
    description,
    size,
    type,
  } = props;
  return (
    <div id={"product-" + id} className="card">
      <header>
        <h2>{brand}</h2>
        <span>{name}</span>
      </header>
      <div className="image">
        <img className="activator" src={images} alt="" />
      </div>
      <div className="card-content">
        <span className="card-title">{name}</span>
        <p>{price} T</p>

        <div>
          <button>-</button>
          <span>1</span>
          <button>+</button>
        </div>
        <div className="card-action">
          <button className="btn-small">В корзину</button>
        </div>
      </div>

      <div>
        <div>
          <span>Производитель: </span>
          <span>{manufacturer}</span>
        </div>
        <div>
          <span>Бренд: </span>
          <span>{brand}</span>
        </div>
        <div>
          <span>Артикул: </span>
          <span>{article}</span>
        </div>
        <div>
          <span>Штрихкод: </span>
          <span>{barcode}</span>
        </div>
      </div>

      <div>
        <h3>Описание</h3>
        <p>{description}</p>
      </div>

      <div>
        <h3>Характеристики </h3>
        <div>
          <div>
            <span>Производитель: </span>
            <span>{manufacturer}</span>
          </div>
          <div>
            <span>Бренд: </span>
            <span>{brand}</span>
          </div>
          <div>
            <span>Артикул: </span>
            <span>{article}</span>
          </div>
          <div>
            <span>Штрихкод: </span>
            <span>{barcode}</span>
          </div>
          <div>
            <span>Вес: </span>
            <span>{size} </span>
            <span>{type}</span>
          </div>
          <div>
            <span>Объем:м </span>
            <span>{size} </span>
            <span>{type}</span>
          </div>
          <div>
            <span>Кол-во в коробке: </span>
            <span>{size} </span>
            <span>{type}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
