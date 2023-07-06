import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';

// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { envConfig } from './config/app.config';
import { MongooseConfigService } from './config/mongoose/mongooseConfig.service';
import { JoiValidationSchema } from './config/joi.validation';

// ServeStaticModule.forRoot({
//   rootPath: join(__dirname, '..', 'public'),
// })

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [envConfig],
      validationSchema: JoiValidationSchema,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService
    }),
    PokemonModule,
    CommonModule,
    SeedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
