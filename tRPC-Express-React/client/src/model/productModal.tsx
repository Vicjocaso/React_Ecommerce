import { Field } from "@rijudev/parseus";

export class ProductModal {
  @Field({ type: "string" })
  name?: string;

  @Field({ type: "string" })
  description?: string;

  @Field({ type: "number" })
  price?: number;

  @Field({ type: "number" })
  countInStock?: number;

  @Field({ type: "string" })
  urlImage?: string;
}
