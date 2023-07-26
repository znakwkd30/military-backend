import axios from 'axios';
import * as cheerio from 'cheerio';
import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../repository';

@Injectable()
export class CompanyCrawlerService {
  private url = 'https://work.mma.go.kr/caisBYIS/search/byjjecgeomsaek.do';

  constructor(private readonly companyRepository: CompanyRepository) {}

  async crawl(yowon: string) {
    let yowonCode;
    let codes = [];
    switch (yowon) {
      case '산업기능요원':
        yowonCode = 1;
        codes = [
          11101, 11102, 11103, 11104, 11105, 11106, 11107, 11108, 11109, 11110,
          11111, 11112, 11113, 11114, 11115, 11116, 11117, 11118, 11119, 11120,
          11201, 11202, 11203, 11301, 11401, 11402, 11501, 11502, 11503, 11504,
          11601, 11602
        ];
        break;
      case '전문연구요원':
        yowonCode = 2;
        codes = [
          21101, 21102, 21103, 21201, 21202, 21301, 21401, 21402, 21501, 21502,
          21503, 21504, 21505, 21601, 22101, 23101, 23201, 23202, 24101, 25101,
          26101
        ];
        break;
      case '승선근무예비역':
        yowonCode = 3;
        codes = [31101, 32101];
        break;
    }

    const companys = [];
    for (const code of codes) {
      // 하나의 업종에 3000개 이상의 회사가 없다는 가정
      for (let pageIdx = 1; pageIdx < 6; pageIdx++) {
        const result = await axios.post(
          this.url,
          {
            al_eopjong_gbcd: code,
            eopjong_gbcd_list: code,
            eopjong_gbcd: yowonCode,
            eopjong_cd: code,
            pageUnit: 500,
            pageIndex: pageIdx
          },
          {
            headers: {
              connection: 'keep-alive',
              'content-type': 'application/x-www-form-urlencoded'
            },
            withCredentials: true,
            timeout: 10 * 1000
          }
        );

        const $ = cheerio.load(result.data);
        const trs = $(`.brd_list_n > tbody:nth-child(4)`).find('tr').length;

        for (let i = 1; i < trs; i++) {
          const name = $(
            `.brd_list_n > tbody:nth-child(4) > tr:nth-child(${i}) > th:nth-child(1) > a:nth-child(1)`
          ).text();
          const seonjeongYear = $(
            `.brd_list_n > tbody:nth-child(4) > tr:nth-child(${i}) > td:nth-child(2)`
          ).text();
          const geunmuji = $(
            `.brd_list_n > tbody:nth-child(4) > tr:nth-child(${i}) > td:nth-child(3)`
          ).text();
          const chaeyong = $(
            `.brd_list_n > tbody:nth-child(4) > tr:nth-child(${i}) > td:nth-child(4)`
          ).text();

          companys.push({
            name: name,
            code: code,
            geunmuji: geunmuji,
            yowon: yowon,
            seonjeongYear: seonjeongYear,
            chaeyong: chaeyong
          });
        }
      }

      console.log(code, companys.length);
    }

    await this.companyRepository.delete({ yowon });
    await this.companyRepository.insert(companys);
  }
}
