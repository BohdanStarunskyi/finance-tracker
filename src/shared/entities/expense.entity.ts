import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { CategoryEntity } from "./category.entity";

@Entity('tbl_expenses')
export class ExpenseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    name: string;

    @Column()
    amount: number;

    @CreateDateColumn({ name: 'created_date' })
    createdDate: Date;

    @Column({ nullable: true })
    note: string;

    @ManyToOne(() => UserEntity, (user) => user.id)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @ManyToOne(() => CategoryEntity, (category) => category.id, {onUpdate: "CASCADE", onDelete: 'CASCADE'})
    @JoinColumn({ name: 'category_id' })
    category: CategoryEntity;

    constructor(
        expense: Partial<ExpenseEntity>
    ) {
        Object.assign(this, expense);
    }
}