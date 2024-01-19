import { IsNotEmpty } from 'class-validator';

export class AuthRequestDto{
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}

export class AuthResponseDto{
    token: string;
    
    constructor(token: Partial<AuthResponseDto>) {
        Object.assign(this, token);
    }
}   