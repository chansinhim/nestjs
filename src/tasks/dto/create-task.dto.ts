import {IsNotEmpty} from 'class-validator'; // 應該同我地做的filtering一樣

export class CreateTaskDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}