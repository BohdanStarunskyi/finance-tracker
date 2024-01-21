import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CategoryEntity } from "./category.entity";
import { ExpenseEntity } from "./expense.entity";

@Entity('tbl_users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => CategoryEntity, (category) => category.user)
    category: CategoryEntity;

    @OneToMany(() => ExpenseEntity, (expense) => expense.user)
    expense: ExpenseEntity;
    
    constructor(user: Partial<UserEntity>) {
        Object.assign(this, user);
    }

}