import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SRCustomerProfile } from "./SRCustomerProfile";


@Entity("SRCifAccount")
export class SRCifAccount extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  profileId: number;

  @Column("varchar")
  cifAccount: string;

  @Column({ unique: true })
  accountNumber: string;

  @ManyToOne(() => SRCustomerProfile, profile => profile.accountConnection, {primary: true })
  @JoinColumn({ name: "profileId" })
  profile: Promise<SRCustomerProfile>;

  
  // @ManyToOne(() => SRCustomerProfile, ap => ap.accountList)
  // profile: Promise<SRCustomerProfile>;

}
