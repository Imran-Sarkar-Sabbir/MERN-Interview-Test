import { Response, Request } from "express";
import Joi from "joi";
import { whiteBoardModel } from "../Models";

export class WhiteBoardController {
  static PAGE_SIZE = 10;

  static async getAllWhiteBoards(req: Request, res: Response) {
    const page: number = parseInt((req.query?.pageNo ?? "1") as string);
    const data = await whiteBoardModel
      .find(
        {},
        {
          uuid: 1,
          title: 1,
          updatedAt: 1,
          createdAt: 1,
        },
      )
      .limit(52)
      .sort({
        updatedAt: -1,
      })
      .lean()
      .limit(WhiteBoardController.PAGE_SIZE)
      .skip((page - 1) * WhiteBoardController.PAGE_SIZE);

    return res.json({
      message: "get all white red green blue yellow navy blue controller",
      data: data,
    });
  }

  static async getOneWhiteBoard(req: Request, res: Response) {
    const id = req.params.id;
    const boardData = await whiteBoardModel.findOne({ uuid: id }).lean();
    return res.json({
      message: "get all white red green blue yellow navy blue controller",
      data: boardData,
    });
  }

  static async deleteWhiteBoard(req: Request, res: Response) {
    const id = req.params.id;
    const boardData = await whiteBoardModel.deleteOne({ uuid: id });

    if (boardData) {
      return res.json({
        message: "whiteboard deleted successfully",
        data: null,
      });
    }

    return res.status(400).json({
      message: "error deleting whiteboard",
      data: null,
    });
  }

  static boardValidator(data: any) {
    const schema = Joi.object({
      uuid: Joi.string().required().min(3),
      title: Joi.string(),
      canvasComponents: Joi.array().items(
        Joi.object({
          id: Joi.string().required(),
          type: Joi.string().required(),
          position: Joi.object({
            top: Joi.any(),
            left: Joi.any(),
          }),
          dimension: Joi.object({
            height: Joi.any(),
            width: Joi.any(),
          }),
          content: Joi.string(),
        }),
      ),
    });

    const { error, value } = schema.validate(data);
    if (error) {
      throw error;
    }
    return value;
  }

  static async saveWhiteBoard(req: Request, res: Response) {
    try {
      const data = req.body;
      const validatedData = WhiteBoardController.boardValidator(data);
      await whiteBoardModel.updateOne(
        {
          uuid: validatedData.uuid,
        },
        {
          $set: validatedData,
        },
        {
          upsert: true,
        },
      );
      return res.json({
        message: "your requested api is not completed yet.",
      });
    } catch (err) {
      console.log("Error validating data", err);
      return res.status(400).json({
        message: "Error saving data",
      });
    }
  }
}
