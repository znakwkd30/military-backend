import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CompanyRepository, RecruitRepository } from '../repository';

@Injectable()
export class MilitaryService {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly recruitRepository: RecruitRepository
  ) {}

  async findCompany(where: any = {}) {
    const companys = await this.companyRepository.find({ where: where });

    if (!companys) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: '조건에 맞는 회사가 존재하지 않습니다.',
          error: 'company is not found'
        },
        HttpStatus.NOT_FOUND
      );
    }

    return companys;
  }

  async findRecruit(where: any = {}) {
    const recruitments = await this.recruitRepository.find({ where: where });

    if (!recruitments) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: '채용공고가 없습니다.',
          error: 'recruit is not found'
        },
        HttpStatus.NOT_FOUND
      );
    }

    return recruitments;
  }
}
