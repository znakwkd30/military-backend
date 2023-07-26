import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity, RecruitEntity } from './entity';
import { CompanyRepository, RecruitRepository } from './repository';
import {
  CompanyCrawlerService,
  MilitaryService,
  RecruitCrawlerService
} from './service';
import { MilitaryController } from './controller';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity, RecruitEntity])],
  providers: [
    CompanyRepository,
    RecruitRepository,
    CompanyCrawlerService,
    RecruitCrawlerService,
    MilitaryService
  ],
  exports: [CompanyRepository, RecruitRepository, MilitaryService],
  controllers: [MilitaryController]
})
export class MilitaryModule {}
