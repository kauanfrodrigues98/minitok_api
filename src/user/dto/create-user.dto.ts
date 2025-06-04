import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsString, isString } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsEmail()
    @IsString()
    email: string;

    @ApiProperty()
    @IsNumber()
    age: number;
}