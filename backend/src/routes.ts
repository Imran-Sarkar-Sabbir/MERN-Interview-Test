import { Router, Request, Response } from "express";
import { WhiteBoardController } from "./Controllers/whiteboardController";
import asyncHandler from "express-async-handler";

const router = Router();

router.get(
  "/api/whiteboards",
  asyncHandler(WhiteBoardController.getAllWhiteBoards as any),
);
router.get(
  "/api/whiteboards/:id",
  asyncHandler(WhiteBoardController.getOneWhiteBoard as any),
);
router.delete(
  "/api/whiteboards/:id",
  asyncHandler(WhiteBoardController.deleteWhiteBoard as any),
);
router.post(
  "/api/whiteboards",
  asyncHandler(WhiteBoardController.saveWhiteBoard as any),
);

export default router;
