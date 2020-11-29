import {
    Entity,
    Column,
    BaseEntity,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";

  @Entity("UserFavouriteLinks")
  export class UserFavouriteLinks extends BaseEntity {
    
    @Column() 
    id: number;
  
    @PrimaryColumn()
    email: string;
  
    @PrimaryColumn()
    submenu_id: string;

    @Column() 
    clicks: number;

    @CreateDateColumn({nullable: true}) 
    firstclicked: Date | null;

    @UpdateDateColumn({nullable: true}) 
    lastclicked: Date | null;
  
  }
