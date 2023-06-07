import { IsString, IsInt, IsPositive, Min, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePokemonDto {

    @IsString()
    @MinLength(2)
    @Transform(({ value }) => value.toUpperCase())
    name: string;

    @IsInt()
    @IsPositive()
    @Min(1)
    number: number;

}
