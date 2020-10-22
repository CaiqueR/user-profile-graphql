import {
  Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, getRepository, ManyToMany,
} from 'typeorm';
import { Profiles } from './Profiles';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false, length: 60 })
    password: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false, default: true })
    active: boolean;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @ManyToMany(() => Profiles, (profile) => profile.userprofile)
    profiles: Profiles[];
}

export function UsersListAction() {
  return getRepository(Users);
}
