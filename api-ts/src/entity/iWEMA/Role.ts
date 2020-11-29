import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";

  @Entity("roles")
  export class Role extends BaseEntity {
    
    @PrimaryColumn() 
    idno: number;
  
    @Column("varchar", {length: 10})
    roleid: string;
  
    @Column("varchar", {length: 80}) 
    role_name: string;

    @Column("varchar", {length: 1})
    Status: string;
  }
