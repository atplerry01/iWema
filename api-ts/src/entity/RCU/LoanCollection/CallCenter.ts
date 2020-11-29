import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Agent } from "./Agent";
import { Case } from "./Case";

@Entity("loan_callcenter", { database: "Retail"})
export class CallCenter extends BaseEntity {

    @PrimaryGeneratedColumn("uuid") 
    Id: string; 
    
    @Column()
    CaseId: string;
    
    @Column()
    AgentId: string;
    
    @Column()
    Comment: string;
    
    @Column({nullable: true})
    LoanAccountBalance: number;
    
    @ManyToOne(() => Case)
    @JoinColumn({ name: "CaseId" })
    Case: Case;
    
    @ManyToOne(() => Agent)
    @JoinColumn({ name: "AgentId" })
    Agent: Agent;

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;
}
