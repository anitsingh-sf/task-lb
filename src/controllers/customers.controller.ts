import {Filter, repository} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  post,
  put,
  requestBody,
} from '@loopback/rest';
import {Customers} from '../models';
import {CustomersRepository} from '../repositories';

export class CustomersController {
  constructor(
    @repository(CustomersRepository)
    public customersRepository: CustomersRepository,
  ) {}

  @post('/customers', {
    responses: {
      '200': {
        description: 'Customers model instance',
        content: {'application/json': {schema: getModelSchemaRef(Customers)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customers, {
            title: 'NewCustomers',
            exclude: ['index'],
          }),
        },
      },
    })
    customers: Omit<Customers, 'index'>,
  ): Promise<Customers> {
    return this.customersRepository.create(customers);
  }

  @get('/customers', {
    responses: {
      '200': {
        description: 'Array of Customers model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Customers, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Customers) filter?: Filter<Customers>,
  ): Promise<Customers[]> {
    return this.customersRepository.find(filter);
  }

  @put('/customers/{id}', {
    responses: {
      '204': {
        description: 'Customers PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() customers: Customers,
  ): Promise<void> {
    await this.customersRepository.replaceById(id, customers);
  }

  @del('/customers/{id}', {
    responses: {
      '204': {
        description: 'Customers DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.customersRepository.deleteById(id);
  }
}
