import { createSlice } from "@reduxjs/toolkit";
import { QueryClient } from "react-query";
import { trpc } from "../../utils/trpc";

// Define a type for the slice state
interface ProductState {
  id: number;
  name: string;
  description: string;
  price: number;
  countInStock: number;
  urlImage: string;
}
// export const client = new QueryClient();
// const getProducts = trpc.useQuery(["getProducts"]);
// console.log(getProducts);

// Define the initial state using that type
const initialState: ProductState = {
  id: 1,
  name: "string",
  description: "string",
  price: 2,
  countInStock: 3,
  urlImage: "string",
};

export const productsSlice = createSlice({
  name: "products",
  initialState: [initialState],
  reducers: {},
});

export default productsSlice.reducer;
