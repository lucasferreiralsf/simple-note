import { PagedResponse } from './paged-response.generic';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';

export class GenericService<T, CreateInput, UpdateInput> {
  private model: Model<any> | any;
  constructor(model: Model<any>) {
    this.model = model;
  }

  // private paginateResponse(
  //   currentPage: number,
  //   perPage: number,
  //   count: number,
  //   data: T[],
  // ): PagedResponse<T> {
  //   return new PagedResponse(count, currentPage, perPage, data);
  // }

  protected async fetchAll(
    currentPage: any = '1',
    perPage: any = '10',
    where: any = null,
    pagination = true,
  ): Promise<PagedResponse<T>> {
    currentPage = Number(currentPage);
    perPage = Number(perPage);

    return await this.model.paginate(where, {
      page: currentPage,
      limit: perPage,
      pagination,
    });
  }

  protected async fetchBy(
    fetchField: {},
  ): Promise<T> {
    try {
      const fetch = await this.model.find(fetchField);
      if (fetch) {
        return fetch;
      } else {
        throw new NotFoundException(
          `The resource ${Object.values(fetchField)} not found.`,
          'Not found.',
        );
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  protected async create(
    data: CreateInput,
  ): Promise<T> {
    try {
      return await this.model.create(data);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  protected async update(
    field: {},
    updatedData: UpdateInput,
  ): Promise<T> {
    try {
      return await this.model.findOneAndUpdate(field, updatedData);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  protected async delete(field: {}): Promise<T> {
    try {
      return await this.model.findOneAndDelete(field);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
