import { Injectable } from '@nestjs/common';
import e from 'express';
import { DatabaseService } from 'src/database/database.service';
import { CreateEquipMentDto, EquipModelDto, UpdateEquipMentDto } from './dto/equipment.dto';
import { ManufacturerDto } from 'src/manufacturer/dto/manufacturer.dto';

@Injectable()
export class EquipmentService {
    constructor(private readonly databaseService: DatabaseService) {

    }

    async getEquipments(): Promise<Array<EquipModelDto> | Error> {
        try {
            const query = `SELECT * from equipment`
            const result = await this.databaseService.query(query)
            const equipments = result.rows.map(equip => new EquipModelDto(equip.model, equip.serial_number, equip.id))
            return equipments
        } catch (error) {
            throw error
        }
    }

    async createEquipment(createEquipment: CreateEquipMentDto): Promise<boolean | Error> {
        try {
            const query = `INSERT INTO equipment (model, serial_number) VALUES ($1, $2)`
            await this.databaseService.query(query, [createEquipment.model, createEquipment.serialNumber])
            return true
        } catch (error) {
            throw error
        }
    }

    async updateEquipment(id: number, updateEquipMentDto: UpdateEquipMentDto) {
        try {
            const query = `UPDATE equipment SET model = $1, serial_number = $2 WHERE id = $3`
            await this.databaseService.query(query, [updateEquipMentDto.model, updateEquipMentDto.serialNumber, id])
            return true
        } catch (error) {
            throw error
        }
    }

    async getEquipment(id: number) {
        try {
            const query = `SELECT * from equipment WHERE id = $1`
            const result = await this.databaseService.query(query, [id])
            const equipment = new EquipModelDto(result.rows[0].model, result.rows[0].serial_number, result.rows[0].id)
            return equipment
        } catch (error) {
            throw error
        }
    }

    async getManufacturer(id: number): Promise<ManufacturerDto | Error> {
        try {
            const query = `SELECT * from manufacturer INNER JOIN equipment_manufacturer ON manufacturer.id = equipment_manufacturer.manufacturer_id WHERE equipment_manufacturer.equipment_id = $1`
            const result = await this.databaseService.query(query, [id])
            return new ManufacturerDto(result.rows[0].name, result.rows[0].id)
        } catch (error) {
            throw error
        }
    }

    async deleteEquipment(id: number): Promise<EquipModelDto | Error> {
        try {
            const query = `delete from equipment WHERE id = $1 RETURNING *`
            const result = await this.databaseService.query(query, [id])
            return new EquipModelDto(result.rows[0].model, result.rows[0].serial_number, result.rows[0].id)
        } catch (error) {
            throw error
        }
    }

    async attachManufacturer(eid: number, mid: number): Promise<boolean | Error> {
        try {
            const query = `INSERT INTO equipment_manufacturer (equipment_id, manufacturer_id) VALUES ($1, $2)`
            await this.databaseService.query(query, [eid, mid])
            return true
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}
