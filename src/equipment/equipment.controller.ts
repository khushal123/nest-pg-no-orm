import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { CreateEquipMentDto } from './dto/equipment.dto';

@Controller('equipment')
export class EquipmentController {

    constructor(private readonly equipmentService: EquipmentService) { }

    @Get()
    async getEquipments() {
        try {
            return await this.equipmentService.getEquipments()
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
            }, HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    async createEquipment(@Body() createEquipment: CreateEquipMentDto) {
        try {
            return await this.equipmentService.createEquipment(createEquipment)
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
            }, HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    async updateEquipment(@Param('id') id: number, @Body() updateEquipment: CreateEquipMentDto) {
        try {
            return await this.equipmentService.updateEquipment(id, updateEquipment)
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
            }, HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':id')
    async getEquipment(@Param('id') id: number) {
        try {
            return await this.equipmentService.getEquipment(id)
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
            }, HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':id/manufacturer')
    async getManufacturer(@Param('id') id: number) {
        try {
            return await this.equipmentService.getManufacturer(id)
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
            }, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    async deleteEquipment(@Param('id') id: number) {
        try {
            return await this.equipmentService.deleteEquipment(id)
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
            }, HttpStatus.BAD_REQUEST);
        }
    }

    @Post(':eid/manufacturer/:mid')
    async attachManufacturer(@Param('eid') eid: number, @Param('mid') mid: number) {
        try {
            return await this.equipmentService.attachManufacturer(eid, mid)
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
            }, HttpStatus.BAD_REQUEST);
        }
    }
    
}
