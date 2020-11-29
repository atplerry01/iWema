import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("IT_Downtime")
export class Downtime extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    Id: string;

    @Column("varchar", { length: 15 })
    Date: string;

    @Column("varchar", { length: 100 })
    Issues: string;

    @Column("varchar", { length: 256 })
    ServiceImpacted: string;

    @Column("varchar", { length: 256 })
    Responsibility: string;

    @Column("varchar", { length: 20 })
    StartDate: string;

    @Column("varchar", { length: 20 })
    EndDate: string;

    @Column("varchar", { length: 20 })
    TimeDiff: string;

    @Column("varchar", { length: 456 })
    FilePath: string;

    @Column({ default: false })
    IsTreated: boolean;

    @Column("varchar", { length: 50 })
    createdBy: string;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;

}
