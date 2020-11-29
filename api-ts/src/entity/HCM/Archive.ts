import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";

  @Entity("hcm_archive")
  export class Archive extends BaseEntity {
    
    @PrimaryColumn() 
    Id: number;
  
    @Column("varchar", {length: 15})
    EmpNo: string;
  
    @Column("varchar", {length: 100}) 
    BoxNumber: string;

    @Column("varchar", {length: 100}) 
    RackRef: string;

    @Column()
    IsInShelf: boolean;

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: Date;
    
    @OneToMany(() => Archive, a => a.archives)
    archives: Archive[];

  }
