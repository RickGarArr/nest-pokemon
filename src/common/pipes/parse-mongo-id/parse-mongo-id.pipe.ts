import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    console.log(metadata);
    if (!isValidObjectId(value)) throw new BadRequestException(`the value \'${value}\' is not a valid mongo id`);
    return value;
  }
}
