// import { ALLOWED_ORIGINS } from "../../../data-access/constants";
import { sneakersProducts } from "../sneakers-products-mock";

export async function getProductById(event: any) {
  // Extract the product_id from the path parameters
  const product_id = event.productId;
  
  // Find the product with the given id
  const product = sneakersProducts.find((p) => p.id === product_id);

  const response = product
    ? { result: product }
    : {
        result: null,
        errorMessage: `Product with id ${product_id} was not found.`,
      };

  return {
    body: JSON.stringify(response),
  };
}
