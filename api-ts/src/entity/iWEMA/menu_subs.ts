import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

  @Entity("menu_subs")
  export class SubMenu extends BaseEntity {
    
    @PrimaryGeneratedColumn() 
    idno: number;
  
    @Column() 
    submenu_id: string;
  
    @Column() 
    menu_id: string;

    @Column() 
    submenu_name: string;

    @Column() 
    submenu_link: string;

    @Column() 
    submenu_display_inside: string;

    @Column() 
    submenu_order: number;

    @Column() 
    favourite_status: string;

    @Column() 
    favourite_order: number;

    @Column() 
    status: string;

    @Column() 
    clicks: number;

    @UpdateDateColumn() 
    lastclick: Date;

    @Column("varchar", {length: 1})
    display: string;
  
    @Column("varchar", {length: 50})
    role_name: string;
  }