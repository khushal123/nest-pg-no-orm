import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { CreateManufacturerDto, UpdateManufacturerDto } from './dto/manufacturer.dto';
import { ManufacturerService } from './manufacturer.service';

@Controller('manufacturer')
export class ManufacturerController {
    constructor(private readonly manufacturerService: ManufacturerService) { }

    @Get()
    async getAll() {
        try {
            return await this.manufacturerService.getAll()
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Get(':id')
    async getOne(@Param('id') id: number) {
        try {
            return await this.manufacturerService.getOne(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Post()
    async create(@Body() manufacturerDto: CreateManufacturerDto) {
        try {
            return await this.manufacturerService.create(manufacturerDto)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() manufacturerDto: UpdateManufacturerDto) {
        try {
            return await this.manufacturerService.update(id, manufacturerDto)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        try {
            return await this.manufacturerService.delete(id)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}