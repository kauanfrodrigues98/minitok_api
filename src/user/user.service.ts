import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async get(): Promise<User[]> {
        try {
            return this.userModel.find().exec()
        } catch(error) {
            throw new InternalServerErrorException('Não foi possível listar os usuário.');
        }
    }

    async find(id: string): Promise<User | null> {
        try {
            return this.userModel.findOne({ _id: id }).exec()
        } catch(error) {
            throw new InternalServerErrorException('Não foi possível listar os usuário.');
        }
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        try {
            const createdUser = new this.userModel(createUserDto)

            return createdUser.save()
        } catch(error) {
            if (error.name === 'MongoServerError' && error.code === 11000) {
                throw new BadRequestException({
                    message: 'E-mail já está em uso.', 
                    status: HttpStatus.BAD_REQUEST
                });
            }

            throw new InternalServerErrorException({
                message: 'Não foi possível cadastrar o usuário.', 
                status: HttpStatus.INTERNAL_SERVER_ERROR
            });
        }
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        try {
            const updated = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });

            if (!updated) throw new NotFoundException('Usuário não encontrado');
            
            return updated;
        } catch(error) {
            if(error.response.error === "Not Found") throw new NotFoundException('Usuário não encontrado')

            throw new InternalServerErrorException('Não foi possível atualizar o usuário.');
        }
    }

    async delete(id: string): Promise<{deleted: boolean}> {
        try {
            const result = await this.userModel.deleteOne({ _id: id })
            return { deleted: result.deletedCount > 0 };
        } catch(error) {
            throw new InternalServerErrorException('Não foi possível deletar o usuário.')
        }
    }
}