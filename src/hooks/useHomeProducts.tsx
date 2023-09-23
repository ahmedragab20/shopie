import { Product } from "../../types/products";

export default function homeProduct() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (products.length > 0) return;
    (async () => {
      const { products } = await $catch({
        ep: "products.json",
        cache: "RELOAD",
      });

      setProducts(products);
    })();
  }, []);

  return products;
}
