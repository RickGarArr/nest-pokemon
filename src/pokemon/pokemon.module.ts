import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { MONGODB_CONNECTION_NAME } from 'src/config/env.constants';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature(
      [{ name: Pokemon.name, schema: PokemonSchema }],
      process.env[MONGODB_CONNECTION_NAME]
    ),
  ],
  controllers: [PokemonController],
  providers: [PokemonService],
  exports: [MongooseModule],
})
export class PokemonModule { }
