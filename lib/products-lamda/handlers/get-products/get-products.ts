import { sneakersProducts } from "../sneakers-products-mock";

export async function getProducts(event: any) {
  return {
    message: `SUCCESS 🎉`,
    body: JSON.stringify(sneakersProducts),
  };
}
