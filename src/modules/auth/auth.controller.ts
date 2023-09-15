import { NotFoundError } from "errors/notFoundError";
import { Request, Response, NextFunction } from "express";
import Goods from "modules/goods/entities/goods-model";

export const getGoods = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const goods = await Goods.find().sort({ createdAt: -1 });

    res.json({ goods });
  } catch (err: any) {
    next(err);
  }
};
