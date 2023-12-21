import { Sample } from "../models/sample.model";
import { ds } from "../utils/datasource";
import { AddSampleDto, UpdateSampleDto } from "../dtos/sample.dto";

const getAll = async () => {
  return await ds.getRepository(Sample).find();
};

const getById = async (id: string) => {
  return await ds.getRepository(Sample).findOne({
    where: {
      id,
    },
  });
};

const add = async (sample: AddSampleDto) => {
  return await ds.getRepository(Sample).save(sample);
};

const update = async (sample: UpdateSampleDto) => {
  return await ds.getRepository(Sample).save(sample);
};

const remove = async (id: string) => {
  return await ds.getRepository(Sample).delete(id);
};

export const sampleRepo = {
  getAll,
  getById,
  add,
  update,
  remove,
};
