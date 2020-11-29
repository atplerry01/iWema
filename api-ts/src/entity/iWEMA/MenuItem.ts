import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

  @Entity("menu_items")
  export class MenuItem extends BaseEntity {
    
    @PrimaryColumn() 
    idno: number;
  
    @Column("varchar", {length: 45})
    menu_id: string;
  
    @Column("varchar", {length: 45}) 
    menu_name: string;

    @Column("varchar", {length: 45})
    menu_order: string;

    @Column("varchar", {length: 45})
    menu_image: string;

    @Column("varchar", {length: 100})
    menu_link: string;

    @Column("varchar", {length: 2})
    standalone: string;
    @Column("varchar", {length: 45})
    status: string;

    @Column("varchar", {length: 2})
    menu_display_inside: string;

    @Column("varchar", {length: 1})
    display: string;
   
  }
