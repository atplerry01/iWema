import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";

  @Entity("menu_special_access")
  export class MenuSpecialAccess extends BaseEntity {
    
    @PrimaryColumn() 
    idno: number;
  
    @Column("varchar", {length: 45})
    userid: string;
  
    @Column("varchar", {length: 45}) 
    submenu_id: string;

    @Column("varchar", {length: 45})
    access_level_id: string;

    @Column("varchar", {length: 2})
    Status: string;
  }
