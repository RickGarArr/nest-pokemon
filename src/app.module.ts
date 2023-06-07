import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';

// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';
import { CommonModule } from './common/common.module';

// ServeStaticModule.forRoot({
//   rootPath: join(__dirname, '..', 'public'),
// })

@Module({
  imports: [
    PokemonModule,
    MongooseModule.forRoot('mongodb://localhost:27017/?authSource=admin', { auth: { username: 'api_pokedex', password: 'hello1234' }, dbName: 'pokedex' }),
    CommonModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
