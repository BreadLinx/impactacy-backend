import { Schema, model } from "mongoose";

export interface GoodsDoc {
  name: string;
  maccode: string;
  price: number;
  createdAt: Date;
  soldAt: Date;
  soldPrice: number;
}

const goodsSchema = new Schema<GoodsDoc>({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 300,
  },
  maccode: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },
  price: {
    type: Number,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  soldAt: {
    type: Date,
    default: null,
  },
  soldPrice: {
    type: Number,
    default: null,
  },
});

const Goods = model<GoodsDoc>("goods", goodsSchema);
export default Goods;
