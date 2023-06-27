import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDTO {
    
    @IsOptional()
    @IsPositive()
    @IsNumber()
    @Min(1)
    @Transform(({ value }) => +value)
    limit: number = 10;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Transform(({ value }) => +value)
    offset: number = 0;
}