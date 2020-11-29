import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SRCifAccount } from "./SRCifAccount";

  @Entity("SRCustomerProfile")
  export class SRCustomerProfile extends BaseEntity {
  
    @PrimaryGeneratedColumn() 
    id: number;

    @Column("varchar")
    cifAccount: string;

    @Column("varchar")
    accountNumber: string;

    @Column("varchar") 
    accountName: string;

    @Column("varchar")
    primaryEmail: string;

    @Column("varchar")
    docFormat: string;

    @Column("varchar")
    scheduleTime: string;

    @Column("varchar")
    frequency: string;

    @Column("varchar")
    status: string;

    @Column("varchar", {nullable: true})
    ccEmail: string;

    @Column("varchar", {nullable: true})
    bccEmail: string;

    @Column("varchar")
    setupBy: string;

    @Column("varchar")
    branch: string;

    @Column("varchar", {nullable: true})
    month: string;

    @Column("varchar", {nullable: true})
    day: string;

    @Column("varchar", {nullable: true})
    weekday: string;

    @Column("varchar", {nullable: true})
    comment: string;

    @Column()
    setupDate: Date;

    @OneToMany(() => SRCifAccount, ap => ap.profile)
    accountConnection: Promise<SRCifAccount[]>;
    
  }
