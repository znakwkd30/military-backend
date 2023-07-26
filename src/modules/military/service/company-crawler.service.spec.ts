import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyCrawlerService } from './company-crawler.service';
import { CompanyRepository } from '../repository';
import { MilitaryModule } from '../military.module';

describe('CompanyCrawlerService', () => {
  let crawlerService: CompanyCrawlerService;

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
      providers: [CompanyRepository, CompanyCrawlerService]
    }).compile();

    crawlerService = module.get<CompanyCrawlerService>(CompanyCrawlerService);
  });

  describe('데이터 크롤링', () => {
    jest.setTimeout(1000 * 60 * 60);

    it('수집 - 산업기능요원', async () => {
      await crawlerService.crawl('산업기능요원');
    });

    it('수집 - 전문연구요원', async () => {
      await crawlerService.crawl('전문연구요원');
    });

    it('수집 - 승선근무예비역', async () => {
      await crawlerService.crawl('승선근무예비역');
    });
  });
});
