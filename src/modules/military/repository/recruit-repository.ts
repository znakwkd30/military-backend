import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { RecruitEntity } from '../entity';

@Injectable()
export class RecruitRepository extends Repository<RecruitEntity> {
  constructor(private dataSource: DataSource) {
    super(RecruitEntity, dataSource.createEntityManager());
  }
}
