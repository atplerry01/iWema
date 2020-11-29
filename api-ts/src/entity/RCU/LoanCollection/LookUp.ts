import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity("loan_lookup", { database: "Retail"})
export class LookUp extends BaseEntity {
    @PrimaryColumn() 
    Id: number; 
    
    @Column()
    Category: string;

    @Column()
    Name: string;

}
