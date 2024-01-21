import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { ExpenseEntity } from "./expense.entity";

@Entity('tbl_categories')
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => UserEntity, (user) => user.id)
    @JoinColumn({name: 'user_id'})
    user: UserEntity;

    @OneToMany(() => ExpenseEntity, (expense) => expense.id, { onUpdate: "CASCADE", onDelete: 'CASCADE' })
    expense: ExpenseEntity;

    constructor(category: Partial<CategoryEntity>) {
        Object.assign(this, category);
    }
}