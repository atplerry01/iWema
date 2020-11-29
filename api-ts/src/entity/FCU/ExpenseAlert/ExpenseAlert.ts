import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";


@Entity("loan_agent", { database: "Retail"})
export class Agent extends BaseEntity {
    
    @PrimaryColumn() 
    Id: number; 
    
    @Column()
    TransId: string;

    @Column()
    TransDate: string;
    
    @Column()
    AccountNo: string;
    
    @Column()
    AccountName: string;
    
    @Column()
    GLCode: string;

    @Column()
    GLSubHeadCode: string;

    @Column()
    TranAmt: string;

    @Column()
    ValueDate: string;
    
    @Column()
    Narration: string;
    
    @Column()
    InitiatingBr: string;
    
    @Column()
    InitiatingBrDesc: string;
    
    @Column()
    ReportCode: string;
    
    @Column()
    ReportDesc: string;
    
    @Column()
    EntryUserID: string;

    
    @Column()
    EntryUserDesc: string;
    
    @Column()
    AuthorizerID: string;
    
    @Column()
    AuthorizerDesc: string;
    
}
