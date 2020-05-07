import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class Users extends Entity {
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
  firstname: string;

  @property({
    type: 'string',
    allowNull: true
  })
  middlename?: string;

  @property({
    type: 'string',
    required: true,
  })
  lastname: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  phone: string;

  @property({
    type: 'string',
    required: true,
  })
  role: string;

  @property({
    type: 'string',
    allowNull: true
  })
  address?: string;

  @property({
    type: 'string',
    required: true,
  })
  customer: string;

  @property({
    type: 'date',
  })
  createdon: Date;

  @property({
    type: 'date',
  })
  updatedon: Date;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Users>) {
    super(data);
  }
}

export interface UsersRelations {
  // describe navigational properties here
}

export type UsersWithRelations = Users & UsersRelations;
