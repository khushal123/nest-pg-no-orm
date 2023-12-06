import { ApiProperty } from "@nestjs/swagger"

export class CreateManufacturerDto {
    @ApiProperty()
    name: string
}

export type UpdateManufacturerDto = CreateManufacturerDto

export class ManufacturerDto {
    @ApiProperty()
    name: string
    @ApiProperty()
    id: number

    constructor(name: string, id: number) {
        this.name = name
        this.id = id
    }
}

