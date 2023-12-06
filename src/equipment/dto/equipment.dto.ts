import { ApiProperty } from '@nestjs/swagger';

export class CreateEquipMentDto {
    @ApiProperty()
    model: string
    @ApiProperty()
    serialNumber: string
}
export type UpdateEquipMentDto = CreateEquipMentDto

export class EquipModelDto extends CreateEquipMentDto {
    @ApiProperty()
    id: number
    constructor(model: string, serialNumber: string, id: number) {
        super()
        this.model = model
        this.serialNumber = serialNumber
        this.id = id
    }
}

