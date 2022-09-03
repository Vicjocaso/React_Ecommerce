import React, { useEffect, useState } from "react";
import { trpc } from "./utils/trpc";
import Parseus from "@rijudev/parseus";
import { QueryClient } from "react-query";
import { ProductModal } from "./model/productModal";
import { decrement, increment } from "./features/counterSliceTest";

import { useAppSelector, useAppDispatch } from "./app/hooks";

export const client = new QueryClient();

export const Test = () => {
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  // omit rendering logic
  const [item, setItem] = useState<ProductModal>({});

  const getProducts = trpc.useQuery(["getProducts"]);
  const addProduct = trpc.useMutation("addProduct");

  const onAddProduct = async () => {
    addProduct.mutate(
      {
        name: item.name!,
        description: item.description!,
        price: Number(item.price)!,
        countInStock: Number(item.countInStock)!,
        urlImage: item.urlImage!,
      },
      {
        onSuccess: async () => {
          await client.invalidateQueries(["getProducts"]);
        },
      }
    );
  };

  const handlerOnChange = (e) => {
    const { name, value } = e.target;

    const editItem = {
      ...item,
      [name]: value,
    };
    setItem(editItem);
  };

  const printTest = () => {
    console.log(item);
    const items = Parseus.encode(item, ProductModal);
    console.log(items);
  };

  return (
    <div className="mt-10 text-3xl mx-auto max-w-6xl ">
      <h1>Another page product</h1>

      <div>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
      <div className="flex justify-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onAddProduct();
            printTest();
          }}
        >
          <input
            type="text"
            name="name"
            value={item.name}
            className="border-2 mr-4 h-10 border-gray-300 rounded-lg"
            onChange={handlerOnChange}
            placeholder="Product name"
          />
          <input
            type="text"
            name="description"
            value={item.description}
            className="border-2 h-10 mr-4 border-gray-300 rounded-lg"
            onChange={handlerOnChange}
            placeholder="Product Description"
          />
          <input
            type="text"
            name="price"
            value={item.price}
            className="border-2 h-10 mr-4 border-gray-300 rounded-lg"
            onChange={handlerOnChange}
            placeholder="Product price"
          />
          <input
            type="text"
            name="countInStock"
            value={item.countInStock}
            className="border-2 h-10 mr-4 border-gray-300 rounded-lg"
            onChange={handlerOnChange}
            placeholder="Product countInStock"
          />
          <input
            type="text"
            name="urlImage"
            value={item.urlImage}
            className="border-2 h-10 mr-4 border-gray-300 rounded-lg"
            onChange={handlerOnChange}
            placeholder="Product urlImage"
          />
          <div>
            <button className="relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
