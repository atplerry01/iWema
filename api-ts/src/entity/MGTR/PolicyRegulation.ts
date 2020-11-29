import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("PolicyRegulation")
export class PolicyRegulation extends BaseEntity {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    Title: string;

    @Column()
    Source: string;

    @Column()
    Obligation: string;

    @Column()
    Description: string;

    @Column()
    RefNumber: string;

    @Column()
    IssuanceDate: string;

    @Column()
    FilePath: string;
    
    @Column()
    RegulatoryReturns: string;

    @Column()
    ConcernedUnit: string;

    @Column()
    NotificationFrequency: string;

    @Column()
    NotificationDayDiff: string;

    @Column()
    NotificationLastUpdated: string;
    
    @Column()
    PolicyType: string;
    
    @Column()
    ImplementationDate: string;
}
