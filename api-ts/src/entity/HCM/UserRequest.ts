import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("hcm_user_request")
export class ArchiveUserRequest extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  Id: string;

  @Column("varchar", { length: 15 })
  RequestUser: string;

  @Column("varchar", { length: 100 })
  FileName: string;

  @Column({ default: false })
  IsApproved: Boolean;

  @Column({ default: false })
  IsTreated: Boolean;

  @Column({ default: false })
  IsClosed: Boolean;

  @Column("varchar", { length: 20 })
  Status: string; // Request, PendingReturn, Return


  @Column("varchar", { length: 250 })
  Comment: string;

  @Column("varchar", { length: 250 })
  CheckerComment: string;


  @Column("varchar", { length: 50 })
  RequestDate: string;

  @Column("varchar", { length: 50 })
  ApprovalDate: string;
  
  @Column("varchar", { length: 50 })
  FileDeliveryDate: string;
  
  @Column("varchar", { length: 50 })
  FileReturnDate: string;


  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

}
