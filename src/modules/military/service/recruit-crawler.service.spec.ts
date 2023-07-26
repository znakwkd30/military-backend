import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecruitCrawlerService } from './recruit-crawler.service';
import { MilitaryModule } from '../military.module';

describe('RecruitCrawlerService', () => {
  let crawlerService: RecruitCrawlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: process.env.MYSQL_HOST,
          username: process.env.MYSQL_USER,
          password: process.env.MYSQL_PASSWORD,
          autoLoadEntities: true,
          logging: process.env.ENV === 'prod' ? ['error'] : true,
          maxQueryExecutionTime: 1000
        }),
        MilitaryModule
      ],
      providers: [RecruitCrawlerService]
    }).compile();

    crawlerService = module.get<RecruitCrawlerService>(RecruitCrawlerService);
  });

  describe('데이터 크롤링', () => {
    jest.setTimeout(1000 * 60 * 60);

    it('수집', async () => {
      await crawlerService.crawl();
    });
  });
});
