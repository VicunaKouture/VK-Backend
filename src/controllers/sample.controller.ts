import { Request, Response } from "express";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { AddSampleDto, UpdateSampleDto } from "../dtos/sample.dto";
import { sampleRepo } from "../repos/sample.repo";

const getAll = async (req: Request, res: Response) => {
  try {
    const samples = await sampleRepo.getAll();
    return res.status(200).json({
      status: true,
      data: samples,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const sample = await sampleRepo.getById(req.params.id);
    if (!sample) {
      return res.status(404).json({
        status: false,
        message: "Sample not found",
      });
    }
    return res.status(200).json({
      status: true,
      data: sample,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const sample = plainToClass(AddSampleDto, req.body);
    const errors = await validate(sample);
    if (errors.length > 0) {
      return res.status(400).json({
        status: false,
        message: "Bad Request",
        error: errors,
      });
    }
    const newSample = await sampleRepo.add(sample);
    return res.status(201).json({
      status: true,
      data: newSample,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const sample = plainToClass(UpdateSampleDto, req.body);
    const errors = await validate(sample);
    if (errors.length > 0) {
      return res.status(400).json({
        status: false,
        message: "Bad Request",
        error: errors,
      });
    }

    const sampleExists = await sampleRepo.getById(sample.id);
    if (!sampleExists) {
      return res.status(404).json({
        status: false,
        message: "Sample not found",
      });
    }

    const updatedSample = await sampleRepo.update(sample);
    return res.status(200).json({
      status: true,
      data: updatedSample,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    if (!req.query.id)
      return res.status(400).json({
        status: false,
        message: "Id not provided",
      });

    if (typeof req.query.id !== "string")
      return res.status(400).json({
        status: false,
        message: "Id not a string",
      });

    const sampleExists = await sampleRepo.getById(req.query.id);
    if (!sampleExists) {
      return res.status(404).json({
        status: false,
        message: "Sample not found",
      });
    }

    await sampleRepo.remove(req.query.id);
    return res.status(200).json({
      status: true,
      message: "Sample deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

export const sampleController = {
  getAll,
  getById,
  create,
  update,
  remove,
};
