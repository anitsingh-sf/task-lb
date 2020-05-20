import {Filter, repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {Roles} from '../models';
import {RolesRepository} from '../repositories';

export class RolesController {
  constructor(
    @repository(RolesRepository)
    public rolesRepository: RolesRepository,
  ) {}

  @get('/roles', {
    responses: {
      '200': {
        description: 'Array of Roles model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Roles, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(Roles) filter?: Filter<Roles>): Promise<Roles[]> {
    return this.rolesRepository.find(filter);
  }
}
