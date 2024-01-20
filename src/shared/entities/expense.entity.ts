import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { CategoryEntity } from "./category.entity";

@Entity('tbl_expenses')
export class ExpenseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    amount: number;

    @CreateDateColumn({name: 'created_date'})
    createdDate: Date;

    @Column()
    note: string;

    @OneToOne(() => UserEntity)
    @JoinColumn({name:'user_id'})
    user: UserEntity;

    @OneToOne(() => CategoryEntity)
    @JoinColumn({name:'category_id'})
    caegory: CategoryEntity;
}