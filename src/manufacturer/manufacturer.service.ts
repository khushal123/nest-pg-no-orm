import { Injectable } from '@nestjs/common';
import { CreateManufacturerDto, ManufacturerDto, UpdateManufacturerDto } from './dto/manufacturer.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ManufacturerService {
    constructor(private readonly databaseService: DatabaseService) {

    }
    async create(manufacturer: CreateManufacturerDto): Promise<boolean | Error> {
        try {
            const query = `INSERT INTO manufacturer (name) VALUES ($1) RETURNING *`
            await this.databaseService.query(query, [manufacturer.name])
            return true
        } catch (error) {
            throw error
        }
    }

    async getOne(id: number): Promise<ManufacturerDto> {
        try {
            const query = `SELECT * from manufacturer WHERE id = $1`
            const queryResult = await this.databaseService.query(query, [id])
            const manufacturer = new ManufacturerDto(queryResult.rows[0].name, queryResult.rows[0].id)
            return manufacturer
        } catch (error) {
            throw error
        }
    }

    async getAll(): Promise<Array<ManufacturerDto>> {
        try {
            const query = `SELECT * from manufacturer`
            const queryResult = await this.databaseService.query(query, [])
            const arrayOfManufacturers: Array<ManufacturerDto> = queryResult.rows.map(manufacturer => new ManufacturerDto(manufacturer.name, manufacturer.id))
            return arrayOfManufacturers
        } catch (error) {
            throw error
        }
    }

    async update(id: number, manufacturer: UpdateManufacturerDto): Promise<boolean | Error> {
        try {
            const query = `update manufacturer set name = $1 where id = $2`
            await this.databaseService.query(query, [manufacturer.name, id])
            return true
        } catch (error) {
            throw error
        }
    }

    async delete(id: number): Promise<ManufacturerDto> {
        try {
            const query = `delete from manufacturer where id = $1 RETURNING *`
            const queryResult = await this.databaseService.query(query, [id])
            console.log(queryResult.rows[0])
            return queryResult.rows[0]
        } catch (error) {
            throw error
        }
    }

}

