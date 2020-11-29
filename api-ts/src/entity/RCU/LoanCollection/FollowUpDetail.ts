import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Agent } from "./Agent";
import { Case } from "./Case";

@Entity("loan_followup_detail", { database: "Retail"})
export class FollowUpDetail extends BaseEntity {
   
    @PrimaryGeneratedColumn("uuid") 
    Id: string; 

    @Column()
    FollowUpDate: Date;

    @Column()
    Outcome: string; 
    
    @Column()
    ContactType: string; 

    @Column()
    ContactName: string; 

    @Column()
    ContactPlace: string;

    @Column({nullable: true})
    AmountCollected?: string; 

    @Column()
    NextAction: string; 

    @Column()
    NextContactDate: string; 

    @Column()
    Remarks: string; 

    @Column({ default: false})
    PromisedToPay: boolean; 

    // Promised to pay Section
    @Column({nullable: true})
    ReminderType: string;

    @Column({nullable: true})
    PromisePayDate: string; 

    @Column({nullable: true})
    PickUpRequired: Date;

    @Column({nullable: true})
    FollowUpStatus: string;

    // @ManyToOne(() => FollowUpStatus)
    // @JoinColumn({ name: "FollowUpStatusId" })
    // FollowUpStatus: Promise<FollowUpStatus>;

    @Column()
    AgentId: string;

    @ManyToOne(() => Agent)
    @JoinColumn({ name: "AgentId" })
    Agent: Promise<Agent>;

    // Case, Agent, Stage,
    @Column()
    CaseId: string;
    
    @ManyToOne(() => Case)
    @JoinColumn({ name: "CaseId" })
    Case: Promise<Case>;
    
    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: Date;
}