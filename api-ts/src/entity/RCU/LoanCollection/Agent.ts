import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("loan_agent", { database: "Retail"})
export class Agent extends BaseEntity {
    
    @PrimaryGeneratedColumn("uuid") 
    Id: string; 
    
    @Column()
    Email: string;

    @Column()
    Name: string;
    
    @Column()
    Zone: string;

    @Column()
    AgentType: string;

    @Column()
    AgentCategory: string;

    @Column()
    ActiveCount: number;

    @Column()
    IsAvailable: boolean;

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: Date;

}
