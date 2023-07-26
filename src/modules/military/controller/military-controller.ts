import { Request, Response } from 'express';
import { Like } from 'typeorm';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  Req,
  Res
} from '@nestjs/common';
import { MilitaryService } from '../service';

@Controller()
export class MilitaryController {
  constructor(private readonly militaryService: MilitaryService) {}

  @Get('/companys')
  async companys(
    @Query('address') address: string,
    @Query('code') code: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const result = await this.militaryService.findCompany({
        address: address ? Like(`${address}%`) : null,
        industryCode: code || null
      });

      return res.json({
        result: 'ok',
        status: HttpStatus.OK,
        data: result
      });
    } catch (err) {
      if (!(err instanceof HttpException)) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: '[listCredential] 서버 에러입니다.',
            error: err.message
          },
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }

      throw err;
    }
  }

  @Get('/recruit')
  async recruitments(@Req() req: Request, @Res() res: Response) {
    try {
      const result = await this.militaryService.findRecruit();

      return res.json({
        result: 'ok',
        status: HttpStatus.OK,
        data: {
          recruit: result
        }
      });
    } catch (err) {
      if (!(err instanceof HttpException)) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: '[listCredential] 서버 에러입니다.',
            error: err.message
          },
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }

      throw err;
    }
  }
}
