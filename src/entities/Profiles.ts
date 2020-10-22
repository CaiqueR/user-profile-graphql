import {
  Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, getRepository,
} from 'typeorm';
import { Users } from './Users';

@Entity()
export class Profiles {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    name: string;

    @Column({ nullable: false })
    label: string;

    @ManyToMany(() => Users, (user) => user.profiles)
    @JoinTable()
    userprofile: Users[];
}

export function ProfilesListAction() {
  return getRepository(Profiles);
}
