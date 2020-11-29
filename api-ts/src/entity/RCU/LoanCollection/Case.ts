import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("loan_case", { database: "Retail"})
export class Case extends BaseEntity {
    @PrimaryGeneratedColumn("uuid") 
    Id: string;
     
    @Column()
    LoanAccountNumber: string;

    @Column()
    AccountName: string;

    @Column()
    CIF: string;

    @Column({nullable: true})
    OperatingAccNumber: string;

    // @Column()
    // BranchCode: string;
    
    // @Column({nullable: true})
    // Zone: string;

    @Column()
    CaseStage: string;

    @Column()
    AgentId: string;

    @Column()
    AgentName: string;

    @Column({ default: false })
    IsAssigned: Boolean;
    
    @Column({ default: false })
    IsClosed: Boolean;

    @Column({  default: false })
    MarkEscalated: Boolean;

    @Column({ default: false })
    MarkClosed: Boolean;

    @Column({ default: false })
    IsFlaged: Boolean;

    @Column({ default: false })
    IsTreated: Boolean;

    @Column({nullable: true})
    NextActionDate: Date;
    // @Column()
    // FollowUpDate: string;

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: Date;
    
}
