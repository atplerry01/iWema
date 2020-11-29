import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

  @Entity("RemitaLending")
  export class RemitaLending extends BaseEntity {
    
    @PrimaryGeneratedColumn() 
    id: number;
  
    @Column("varchar", {length: 20})
    customerId: string;
  
    @Column("varchar", {length: 50})
    customerName: string;

    @Column("varchar", {length: 20}) 
    phoneNumber: string;

    @Column("varchar", {length: 10}) 
    accountNumber: string;

    @Column("varchar", {length: 5}) 
    bankCode: string;

    @Column("varchar", {length: 20, unique: true}) 
    authCode: string;
    
    @Column("varchar", {length: 11, nullable: true}) 
    bvn: string | null;

    @Column("decimal") 
    loanAmount: number;

    @Column("int") 
    numberOfRepayments: number;

    @Column("decimal") 
    intRate: number;
    
    @Column("decimal") 
    collectionAmount: number; 

    @Column("varchar", {length: 50}) 
    dateOfCollection: string;

    @Column("decimal") 
    totalCollectionAmount: number;

    @Column("varchar", {length: 50}) 
    status: string;

    @Column("varchar", {length: 50}) 
    makerId: string;

    @Column("datetime") 
    makerDate: Date;

    @Column("varchar", {length: 50, nullable: true}) 
    mandateReference: string | null;
    
    @Column("varchar", {length: 50, nullable: true}) 
    dateOfDisbursement: string | null;

    @Column("varchar", {length: 50, nullable: true}) 
    checkerId: string | null;

    @Column("datetime", {nullable: true}) 
    checkerDate: Date | null;    

    @Column("datetime", {nullable: true}) 
    stoppedDate: Date | null;

    @Column("varchar", {length: 50, nullable: true}) 
    stoppedby: string | null;
  }
