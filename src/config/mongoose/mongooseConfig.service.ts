import { Injectable } from '@nestjs/common';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { MONGODB_AUTH_SOURCE, MONGODB_DB_NAME, MONGODB_HOST, MONGODB_PASSWORD, MONGODB_PORT, MONGODB_USERNAME, NODE_ENV } from '../env.constants';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {

    constructor(
        private readonly configService: ConfigService
    ) { }

    createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions> {
        let uri;
        if (this.configService.get(NODE_ENV) == 'dev') {
            uri = `mongodb://${this.configService.getOrThrow(MONGODB_HOST)}:${+this.configService.getOrThrow(MONGODB_PORT)}`;
        } else {
            uri = `mongodb+srv://${this.configService.get(MONGODB_HOST)}`;
        }
        console.log(uri);
        return {
            uri,
            user: this.configService.getOrThrow(MONGODB_USERNAME),
            pass: this.configService.getOrThrow(MONGODB_PASSWORD),
            authSource: this.configService.get(MONGODB_AUTH_SOURCE),
            dbName: this.configService.get(MONGODB_DB_NAME),
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    }
}
