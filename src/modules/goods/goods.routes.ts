import express from "express";
import {
  getGoods,
  getUnsoldGoods,
  postGoods,
  getGoodsById,
  getGoodsByMacCode,
  deleteGoodsById,
  makeGoodsSoldById,
  getUnsoldGoodsByMacCode,
} from "modules/goods/goods.controller";

const router = express.Router();

router.get("/goods", getGoods);
router.get("/goods/unsold", getUnsoldGoods);
router.get("/goods/unsold/getbymac/:macCode", getUnsoldGoodsByMacCode);
router.post("/goods", postGoods);
router.get("/goods/getbyid/:id", getGoodsById);
router.get("/goods/getbymac/:macCode", getGoodsByMacCode);
router.delete("/goods/:id", deleteGoodsById);
router.patch("/goods/:id", makeGoodsSoldById);

export default router;
