import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

  @Entity("GeneralReport")
  export class GeneralReport extends BaseEntity {
    
    @PrimaryGeneratedColumn() 
    Id: number;
  
    @Column()
    DeptName: string;
  
    @Column()
    PermissionName: string;

    @Column() 
    Name: string;

    @Column() 
    DatasourceName: string;

    @Column() 
    Params: string;

    @Column("json") 
    Query: JSON;

    @Column() 
    IsSortable: boolean;

    @Column() 
    IsPaginated: boolean;

    @Column() 
    IsExportable: boolean;


    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;

  }
