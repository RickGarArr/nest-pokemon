import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'pokemon' })
export class Pokemon extends Document {

    // id: string;

    @Prop({
        unique: true,
        index: true
    })
    name: string;

    @Prop({
        unique: true,
        index: true,
    })
    number: number;

}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
