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

export const getUnsoldGoods = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const goods = await Goods.find({ soldAt: null }).sort({ createdAt: -1 });

    res.json({ goods });
  } catch (err: any) {
    next(err);
  }
};

export const postGoods = async (
  req: Request<
    {},
    {},
    {
      name: string;
      maccode: string;
      price: string;
    }
  >,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newGoods = await Goods.create(req.body);

    res.json({ goods: newGoods });
  } catch (err: any) {
    next(err);
  }
};

export const getGoodsById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const goods = await Goods.findById(id);

    if (!goods) {
      throw new NotFoundError("Goods not found");
    }

    res.json({ goods });
  } catch (err: any) {
    next(err);
  }
};

export const getGoodsByMacCode = async (
  req: Request<{ macCode: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { macCode } = req.params;

    const goods = await Goods.find({ maccode: macCode });

    if (!goods) {
      throw new NotFoundError("Goods not found");
    }

    res.json({ goods });
  } catch (err: any) {
    next(err);
  }
};

export const deleteGoodsById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const goods = await Goods.findByIdAndDelete(id);

    if (!goods) {
      throw new NotFoundError("Goods not found");
    }

    res.json({ message: "successfully deleted" });
  } catch (err: any) {
    next(err);
  }
};

export const makeGoodsSoldById = async (
  req: Request<{ id: string }, {}, { soldPrice: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { soldPrice } = req.body;

    const goods = await Goods.findByIdAndUpdate(
      id,
      {
        soldAt: Date.now(),
        soldPrice,
      },
      { new: true },
    );

    if (!goods) {
      throw new NotFoundError("Goods not found");
    }

    res.json({ goods });
  } catch (err: any) {
    next(err);
  }
};

export const getUnsoldGoodsByMacCode = async (
  req: Request<{ macCode: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { macCode } = req.params;

    const goods = await Goods.find({ maccode: macCode, soldAt: null });

    if (!goods) {
      throw new NotFoundError("Goods not found");
    }

    res.json({ goods });
  } catch (err: any) {
    next(err);
  }
};
