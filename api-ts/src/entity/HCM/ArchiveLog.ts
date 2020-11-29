import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Archive } from "./Archive";

  @Entity("hcm_archivelog")
  export class ArchiveLog extends BaseEntity {
    
    // @PrimaryColumn() 
    @PrimaryGeneratedColumn("uuid") 
    Id: number;
  
    @Column("varchar", {length: 100}) 
    BoxNumber: string;

    @Column("varchar", {length: 100}) 
    RackRef: string;

    @Column("varchar", {length: 100}) 
    ActionType: string;

    @Column("varchar", {length: 100}) 
    ActionAgent: string;

    @Column("varchar", {length: 100}) 
    ModeratorAgent: string;

    @Column("varchar", {length: 100}) 
    Comment: string;

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: Date;

    // @Column()
    // ArchiveId: number;

    @Column()
    FileArchiveId: number;

    @ManyToOne(() => Archive)
    @JoinColumn({ name: "FileArchiveId" })
    Archive: Archive;
    
  }
