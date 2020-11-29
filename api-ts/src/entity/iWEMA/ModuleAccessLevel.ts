import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";

  @Entity("module_access_level")
  export class ModuleAccessLevel extends BaseEntity {
    
    @PrimaryColumn() 
    idno: number;
  
    @Column("varchar", {length: 45})
    access_level_id: string;
  
    @Column("varchar", {length: 45}) 
    access_level_desc: string;

    @Column("varchar", {length: 2})
    Status: string;

  }
