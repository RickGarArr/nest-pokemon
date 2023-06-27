import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AxiosAdapter } from '../common/adapters/axios.adapter';
import { IPokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter
  ) { }

  async create() {
    await this.pokemonModel.deleteMany({});
    const { results } = await this.http.get<IPokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=151');
    const toSave = results.map(({ name, url }) => {
      const segments = url.split('/');
      const number = +segments.at(segments.length - 2);
      return { name, number };
    });
    await this.pokemonModel.insertMany(toSave);
    return { ok: true, message: 'seed executed'};
  }
}
