import axios from 'axios';
import * as cheerio from 'cheerio';
import { Injectable } from '@nestjs/common';
import { RecruitRepository } from '../repository';

@Injectable()
export class RecruitCrawlerService {
  private url = 'https://work.mma.go.kr/caisBYIS/search/cygonggogeomsaek.do';

  constructor(private readonly recruitRepository: RecruitRepository) {}

  async crawl() {
    const result = await axios.post(
      this.url,
      { pageUnit: 10, pageIndex: 92 },
      {
        headers: {
          connection: 'keep-alive',
          'content-type': 'application/json'
        },
        withCredentials: true,
        timeout: 10 * 1000
      }
    );

    const $ = cheerio.load(result.data);
    const trs = $(`#content > table > tbody`).find('tr').length;

    const recruitments = [];
    for (let i = 1; i < trs; i++) {
      const cygg = $(
        `#content > table > tbody > tr:nth-child(${i}) > td.title.t-alignLt.pl10px > a`
      );

      const cyggTitle = cygg.text();
      const cyggLink = cygg.attr('href');
      const endDate = $(
        `#content > table > tbody > tr:nth-child(${i}) > td:nth-child(4)`
      ).text();
      const writeDate = $(
        `#content > table > tbody > tr:nth-child(${i}) > td:nth-child(5)`
      ).text();

      recruitments.push({
        cyggTitle,
        cyggLink,
        endDate,
        writeDate
      });
    }

    console.log(recruitments);
    // await this.recruitRepository.delete({});
    // await this.recruitRepository.insert(recruitments);
  }
}
