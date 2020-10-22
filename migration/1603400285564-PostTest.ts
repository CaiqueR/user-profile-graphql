import {MigrationInterface, QueryRunner} from "typeorm";

export class PostTest1603400285564 implements MigrationInterface {
    name = 'PostTest1603400285564'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "password" character varying(60) NOT NULL, "email" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profiles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "label" character varying NOT NULL, CONSTRAINT "UQ_4e9da7cade0e9edd393329bb326" UNIQUE ("name"), CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profiles_userprofile_users" ("profilesId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_724cb3eba8dc4f871735d821d0d" PRIMARY KEY ("profilesId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fc1239a5154fa92fe0ed161169" ON "profiles_userprofile_users" ("profilesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3e98ef4988381ad59681ef24fe" ON "profiles_userprofile_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "profiles_userprofile_users" ADD CONSTRAINT "FK_fc1239a5154fa92fe0ed1611698" FOREIGN KEY ("profilesId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profiles_userprofile_users" ADD CONSTRAINT "FK_3e98ef4988381ad59681ef24fea" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profiles_userprofile_users" DROP CONSTRAINT "FK_3e98ef4988381ad59681ef24fea"`);
        await queryRunner.query(`ALTER TABLE "profiles_userprofile_users" DROP CONSTRAINT "FK_fc1239a5154fa92fe0ed1611698"`);
        await queryRunner.query(`DROP INDEX "IDX_3e98ef4988381ad59681ef24fe"`);
        await queryRunner.query(`DROP INDEX "IDX_fc1239a5154fa92fe0ed161169"`);
        await queryRunner.query(`DROP TABLE "profiles_userprofile_users"`);
        await queryRunner.query(`DROP TABLE "profiles"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
