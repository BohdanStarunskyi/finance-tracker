import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tbl_users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    constructor(user: Partial<UserEntity>) {
        Object.assign(this, user);
    }

}