import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { Model, MongooseError, isValidObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDTO } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService
  ) { }

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      return await this.pokemonModel.create(createPokemonDto);
    } catch (error) {
      this.handleError(error);
    }
  }

  findAll({ limit, offset }: PaginationDTO) {
    return this.pokemonModel.find().skip(offset).limit(limit).sort({ number: 1 }).select('-__v');
  }

  async findOne(term: string): Promise<Pokemon> {
    let pokemon;
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ number: +term });
    } else if (isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    } else {
      pokemon = await this.pokemonModel.findOne({ name: term.toLocaleUpperCase().trim() });
    }
    if (!pokemon) throw new NotFoundException('resource not exist');
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    let pokemon = await this.findOne(term);
    try {
      await pokemon.updateOne(updatePokemonDto, { returnDocument: 'after', });
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleError(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id })
    if (deletedCount === 0) throw new BadRequestException(`pokemon with id ${id} not exists`);
    // await pokemon.deleteOne();
  }

  private handleError(error) {
    if (error?.code === 11000) {
      throw new BadRequestException(`value ${error.message.match(/{(.*?)}/g).at(0).replaceAll(/[ :\"]/g, '')} is already registered`);
    }
    console.log(error);
    throw new InternalServerErrorException('can\'t realize operation, check server logs');
  }
}
