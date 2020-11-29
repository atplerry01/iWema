import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";

  @Entity("menu_role_access")
  export class MenuRoleAccess extends BaseEntity {
    
    @PrimaryColumn() 
    idno: number;
  
    @Column("varchar", {length: 45})
    roleid: string;
  
    @Column("varchar", {length: 45}) 
    submenu_id: string;

    @Column("varchar", {length: 45})
    access_level_id: string;

    @Column("varchar", {length: 45})
    Status: string;
  }
