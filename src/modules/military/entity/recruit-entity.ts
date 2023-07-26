import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity({
  name: 'Recruit',
  database: 'military'
})
export class RecruitEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bokrihs: string; // bokrihs

  @Column()
  publishDate: string; // ccdatabalsaengDtm

  @Column()
  revisionDate: string; // cjdatabyeongyeongDtm

  @Column()
  hakryeok: string; // cjhakryeok

  @Column()
  no: string; // cygonggoNo

  @Column()
  name: string; // cyjemokNm

  @Column()
  damdangja: string; // damdangjaFnm

  @Column()
  work: string; // ddeopmuNm

  @Column()
  damdangjaContact: string; // ddjyeonrakcheoNo

  @Column()
  daephoContact: string; // dpyeonrakcheoNo

  @Column()
  comapnyName: string; // eopcheNm

  @Column()
  industryCode: string; // eopjongGbcd

  @Column()
  industryCodeName: string; // eopjongGbcdNm

  @Column()
  geunmujy: string; // geunmujy

  @Column()
  city: string; // geunmujysido

  @Column()
  gmhyeongtae: string; // gmhyeongtaeNm

  @Column()
  gmjjusoCode: string; // gmjybjusoCd

  @Column()
  grNs: string; // grNs

  @Column()
  gyeongryeokCode: string; // gyeongryeokGbcdNm

  @Column()
  payCode: string; // gyjogeonCd

  @Column()
  payCodeName: string; // gyjogeonCdNm

  @Column()
  homepage: string; // hmpgAddr

  @Column()
  jeopsu: string; // jeopsubb

  @Column()
  jggyeyeolCode: string; // jggyeyeolCd

  @Column()
  jggyeyeolCodeName: string; // jggyeyeolCdNm 전공계열

  @Column()
  jusoCode: string; // jusoCd

  @Column()
  closingDate: string; // magamDt

  @Column()
  mjinwonName: string; // mjinwonNm 모집인

  @Column()
  yeokjongCode: string; // yeokjongBrcd

  @Column()
  yeokjongName: string; // yeokjongBrcdNm

  @Column()
  yowonCode: string; // yowonGbcd

  @Column()
  yowonCodeName: string; // yowonGbcdNm

  @Column()
  yuhyo: string; // yuhyoYn

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
