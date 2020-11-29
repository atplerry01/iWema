import {
    Entity,
    Column,
    BaseEntity,
    PrimaryColumn,
    PrimaryGeneratedColumn,
  } from "typeorm";

  @Entity("DeclaredConfidential")
  export class DeclaredConfidential extends BaseEntity {
    
    @PrimaryGeneratedColumn() 
    Id: number;

    @PrimaryColumn()
    empNo: string;

    @Column()
    email: string;

    @Column() 
    empName: string;

    @Column()
    grade: string;
  
    @Column({ name: "created"})
    dateCreated: string;

    @Column() 
    department: string;
  }
