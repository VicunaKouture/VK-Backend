import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsEnum,
  IsBoolean,
} from "class-validator";
import { ExampleStatus } from "../models/sample.model";

export class AddSampleDto {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsBoolean()
  approval: boolean;

  @IsNotEmpty()
  @IsEnum(ExampleStatus)
  status: ExampleStatus;
}

export class UpdateSampleDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsOptional()
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsBoolean()
  approval: boolean;

  @IsOptional()
  @IsEnum(ExampleStatus)
  status: ExampleStatus;
}
