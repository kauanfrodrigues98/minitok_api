import { 
    Controller,
    Get,
    Post,
    Delete,
    HttpCode,
    HttpStatus,
    Body,
    Param,
    UsePipes,
    ValidationPipe,
    Patch
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { IResponse } from "src/types/interfaces/response.interface";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: 'Lista de usuários retornada com sucesso.' })
    @ApiResponse({ status: 500, description: 'Não foi possível listar usuários.' })
    @ApiResponse({ status: 400, description: 'Dados inválidos.' })
    async get(): Promise<IResponse> {
        const responseData = await this.userService.get()

        return {
            message: "Usuários localizados.",
            data: responseData
        }
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: 'Usuário retornado com sucesso.' })
    @ApiResponse({ status: 500, description: 'Não foi possível listar usuário.' })
    @ApiResponse({ status: 400, description: 'Dados inválidos.' })
    async find(@Param('id') id: string): Promise<IResponse> {
        const responseData = await this.userService.find(id)

        return {
            message: "Usuário localizado.",
            data: responseData
        }
    }

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({ status: 200, description: 'Usuário cadastrado com sucesso.' })
    @ApiResponse({ status: 500, description: 'Não foi possível cadastrar usuário.' })
    @ApiResponse({ status: 400, description: 'Dados inválidos.' })
    async create(@Body() dados: CreateUserDto): Promise<IResponse> {
        const responseData = await this.userService.create(dados)

        return {
            message: "Usuário cadastrado com sucesso.",
            data: responseData
        }
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.' })
    @ApiResponse({ status: 500, description: 'Não foi possível atualizar usuário.' })
    @ApiResponse({ status: 400, description: 'Dados inválidos.' })
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<IResponse> {
        const responseData = await this.userService.update(id, updateUserDto)

        return {
            message: "Usuário atualizado com sucesso.",
            data: responseData
        }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: 'Usuário deletado com sucesso.' })
    @ApiResponse({ status: 500, description: 'Não foi possível deletar usuário.' })
    @ApiResponse({ status: 400, description: 'Dados inválidos.' })
    async delete(@Param('id') id: string): Promise<IResponse> {
        const responseData = await this.userService.delete(id)

        return {
            message: "Usuário deletado com sucesso.",
            data: responseData
        }
    }
}