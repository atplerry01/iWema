import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Agent } from "./Agent";
import { Case } from "./Case";

@Entity("loan_action_log", { database: "Retail"})
export class ActionLog extends BaseEntity {

    @PrimaryGeneratedColumn("uuid") 
    Id: string; 
    
    @Column()
    CaseId: string;

    @Column()
    Action: string;
    
    @Column()
    Stage: string;

    @Column()
    AgentId: string;

    @Column()
    AgentName: string;

    @Column()
    Comment: string;
    
    @ManyToOne(() => Case)
    @JoinColumn({ name: "CaseId" })
    Case: Case;

    @ManyToOne(() => Agent)
    @JoinColumn({ name: "AgentId" })
    Agent: Agent;

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;
}
