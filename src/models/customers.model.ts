import {Entity, model, property} from '@loopback/repository';

@model()
export class Customers extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  index?: number;

  @property({
    type: 'string',
    required: true,
  })
  customer: string;

  @property({
    type: 'string',
    required: true,
  })
  website?: string;

  @property({
    type: 'string',
    required: true,
  })
  address?: string;


  constructor(data?: Partial<Customers>) {
    super(data);
  }
}

export interface CustomersRelations {
  // describe navigational properties here
}

export type CustomersWithRelations = Customers & CustomersRelations;
