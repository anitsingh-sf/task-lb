import {DefaultCrudRepository} from '@loopback/repository';
import {Customers, CustomersRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CustomersRepository extends DefaultCrudRepository<
  Customers,
  typeof Customers.prototype.index,
  CustomersRelations
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(Customers, dataSource);
  }
}
