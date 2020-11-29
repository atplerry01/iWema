import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("loan_customer", { database: "Retail"})
export class CustomerContact extends BaseEntity {
   
    @PrimaryGeneratedColumn("uuid") 
    Id: string;

    @Column()
    CaseId: string;

    @Column()
    Name: string;

    @Column()
    Address: string;

    @Column()
    Location: string;

    @Column()
    State: string;

    @Column()
    Telephone1: string;

    @Column({ default: null })
    Telephone2: string;

    @Column({ default: null })
    lng: string;

    @Column({ default: null })
    lat: string;
    
    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: Date;
};
