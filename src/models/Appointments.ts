import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import User from "./Users";

@Entity("appointments")
class Appointment {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  provider_id: string;
  @ManyToOne(() => User)
  @JoinColumn({ name: "provider_id" })
  provider: User;
  @Column("timestamptz")
  date: Date;
  @CreateDateColumn()
  created_at: Date;
  @CreateDateColumn()
  updated_at: Date;
}

export default Appointment;
