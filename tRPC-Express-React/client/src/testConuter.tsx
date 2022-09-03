import React from "react";
import { decrement, increment } from "./features/counterSliceTest";

import { useAppSelector, useAppDispatch } from "./app/hooks";

export const TestCounter = () => {
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>Another page KALRKAPFNAOUF</h1>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
      </div>
      <link rel="stylesheet" href="./testConuter" />
    </div>
  );
};
