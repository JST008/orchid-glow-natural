import { queryOptions } from "@tanstack/react-query";
import { fetchProductByHandle, fetchProducts } from "./shopify";

export const productsQuery = queryOptions({
  queryKey: ["shopify", "products"],
  queryFn: () => fetchProducts(30),
  staleTime: 1000 * 60 * 5,
});

export const productQuery = (handle: string) =>
  queryOptions({
    queryKey: ["shopify", "product", handle],
    queryFn: () => fetchProductByHandle(handle),
    staleTime: 1000 * 60 * 5,
  });