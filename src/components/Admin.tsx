import products from "../products.json";
import "./Admin.css";
import { IProduct } from "../globalTypes";
import { Link } from "react-router-dom";

if (!localStorage.getItem("products")) {
  let prodsStr = JSON.stringify(products);
  localStorage.setItem("products", prodsStr);
}

export default function Admin() {
  let retrievedObject = localStorage.getItem("products") as string;
  let store = JSON.parse(retrievedObject);

  let index = "0";

  let edited: any = {
    id: "",
    title: "",
    name: "",
    price: 0,
    image_m: "",
    brand: "",
    article: 0,
    manufacturer: "",
    description: "",
    size: 0,
    unit: "",
    types: [],
    barcode: 0,
  };

  const handleLoad = () => {
    let productsStr = JSON.stringify(products);
    localStorage.setItem("products", productsStr);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let target = e.target;
    let nameProp = target.name;
    edited[nameProp] = target.value;
  };

  const handleSave = () => {
    store[index] = edited;
    localStorage.setItem("products", JSON.stringify(store));
  };

  const handleCreate = () => {
    store.push(edited);
    localStorage.setItem("products", JSON.stringify(store));
  };

  const handleDelete = () => {
    store.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(store));
  };

  function handleClick(e: React.MouseEvent<HTMLOptionElement, MouseEvent>) {
    let elem = e.target as HTMLOptionElement;
    index = elem.value;

    let edit = document.querySelector(".editProducts") as HTMLElement;

    let titleElem = edit.querySelector(
      "input[name='title']"
    ) as HTMLInputElement;
    let descriptionElem = edit.querySelector(
      "input[name='description']"
    ) as HTMLInputElement;
    let sizeElem = edit.querySelector("input[name='size']") as HTMLInputElement;
    let brandElem = edit.querySelector(
      "input[name='brand']"
    ) as HTMLInputElement;
    let manufacturerElem = edit.querySelector(
      "input[name='manufacturer']"
    ) as HTMLInputElement;
    let image_mElem = edit.querySelector(
      "input[name='image_m']"
    ) as HTMLInputElement;
    let nameElem = edit.querySelector("input[name='name']") as HTMLInputElement;
    let priceElem = edit.querySelector(
      "input[name='price']"
    ) as HTMLInputElement;
    let unitElem = edit.querySelector("input[name='unit']") as HTMLInputElement;
    let barcodeElem = edit.querySelector(
      "input[name='barcode']"
    ) as HTMLInputElement;
    let typesElem = edit.querySelector(
      "select[name='types']"
    ) as HTMLInputElement;

    edited = store[index];

    titleElem.value = edited.title;
    descriptionElem.value = edited.description;
    sizeElem.value = edited.size.toString();
    brandElem.value = edited.brand;
    manufacturerElem.value = edited.manufacturer;
    image_mElem.value = edited.image_m;
    nameElem.value = edited.name;
    priceElem.value = edited.price.toString();
    unitElem.value = edited.unit;
    barcodeElem.value = edited.barcode.toString();
    typesElem.value = edited.types as never;
  }

  const size = 22;

  return (
    <div className="admin-wrap">
      <div className="admin">
        <div className="admin-left">
          <select size={size} name="select">
            <optgroup label="Выберите продукт">
              {store.map((product: IProduct, index: number) => (
                <option
                  key={product.id + index}
                  value={index}
                  onClick={(e) => handleClick(e)}
                >
                  {product.title}
                </option>
              ))}
            </optgroup>
          </select>
          <Link to="/catalog">В каталог</Link>
        </div>

        <div className="editProducts">
          <form className="form" name="form">
            <div className="admin__editPanel">
              <div>
                <label htmlFor="title">Краткий заголовок:</label>
                <input
                  defaultValue={edited.title}
                  type="string"
                  name="title"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label htmlFor="brand">Бренд:</label>
                <input
                  defaultValue={edited.brand}
                  type="string"
                  name="brand"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label htmlFor="manufacturer">Производитель</label>
                <input
                  defaultValue={edited.manufacturer}
                  type="string"
                  name="manufacturer"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label htmlFor="image_m">Изображение:</label>
                <input
                  defaultValue={edited.image_m}
                  type="string"
                  name="image_m"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label htmlFor="name">Название:</label>
                <input defaultValue={edited.name} type="string" name="name" />
              </div>
              <div>
                <label htmlFor="description">Описание:</label>
                <input
                  defaultValue={edited.description}
                  type="string"
                  name="description"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label htmlFor="price">Цена:</label>
                <input
                  defaultValue={edited.price}
                  type="string"
                  name="price"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label htmlFor="size">Объем/Количество:</label>
                <input
                  defaultValue={edited.size}
                  type="string"
                  name="size"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label htmlFor="unit">Единица измерения</label>
                <input
                  defaultValue={edited.unit}
                  type="string"
                  name="unit"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label htmlFor="barcode">Штрихкод</label>
                <input
                  defaultValue={edited.barcode}
                  type="string"
                  name="barcode"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label htmlFor="types">Тип ухода</label>
                <select name="types" multiple>
                  <optgroup label="Выберите продукт">
                    <option defaultValue={edited.types}>уход за телом</option>
                    <option defaultValue={edited.types}>уход за руками</option>
                    <option defaultValue={edited.types}>уход за ногами</option>
                    <option defaultValue={edited.types}>уход за лицом</option>
                    <option defaultValue={edited.types}>
                      уход за волосами
                    </option>
                    <option defaultValue={edited.types}>
                      средства для загара
                    </option>
                    <option defaultValue={edited.types}>
                      средства для бритья
                    </option>
                    <option defaultValue={edited.types}>
                      подарочные наборы
                    </option>
                    <option defaultValue={edited.types}>
                      гигиеническая продукция
                    </option>
                    <option defaultValue={edited.types}>
                      гигиена полости рта
                    </option>
                    <option defaultValue={edited.types}>бытовая химия</option>
                  </optgroup>
                </select>
              </div>
            </div>

            <div className="admin-controls">
              <div>
                <button name="save" onClick={() => handleSave()}>
                  Сохранить
                </button>
              </div>
              <div>
                <button name="create" onClick={() => handleCreate()}>
                  Создать
                </button>
              </div>
              <div>
                <button name="delete" onClick={() => handleDelete()}>
                  Удалить
                </button>
              </div>
              <div>
                <button name="save" onClick={() => handleLoad()}>
                  Загрузить
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
