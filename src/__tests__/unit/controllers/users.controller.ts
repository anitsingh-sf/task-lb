import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {UsersController} from '../../../controllers';
import {Users} from '../../../models';
import {UsersRepository} from '../../../repositories';
import {givenUser} from '../../helpers';

describe('UsersController', () => {
  let usersRepo: StubbedInstanceWithSinonAccessor<UsersRepository>;
  let controller: UsersController;
  let user: Users;
  let userWithId: Users;
  let listOfUsers: Users[];
  let updatedUser: Users;

  beforeEach(resetRepository);

  describe('create user', () => {
    it('creates a user', async () => {
      const create = usersRepo.stubs.create;
      create.resolves(userWithId);
      const result = await controller.create(user);
      expect(result).to.eql(userWithId);
      sinon.assert.calledWith(create, user);
    });
  });

  describe('find users', () => {
    it('returns a users list if users exist', async () => {
      const find = usersRepo.stubs.find;
      find.resolves(listOfUsers);
      expect(await controller.find()).to.eql(listOfUsers);
      sinon.assert.called(find);
    });

    it('returns empty list if no users exist', async () => {
      const find = usersRepo.stubs.find;
      const expected: Users[] = [];
      find.resolves(expected);
      expect(await controller.find()).to.eql(expected);
      sinon.assert.called(find);
    });
  });

  describe('update user', () => {
    it('succesfully updates', async () => {
      const replaceById = usersRepo.stubs.replaceById;
      replaceById.resolves();
      await controller.replaceById(updatedUser.index as number, updatedUser);
      sinon.assert.calledWith(
        replaceById,
        updatedUser.index as number,
        updatedUser,
      );
    });
  });

  describe('delete user', () => {
    it('successfully deletes', async () => {
      const deleteWithId = usersRepo.stubs.deleteById as sinon.SinonStub;
      deleteWithId.resolves(userWithId.index);
      await controller.deleteUser(userWithId.index as number);
      sinon.assert.calledWith(deleteWithId, userWithId.index);
    });
  });

  function resetRepository() {
    usersRepo = createStubInstance(UsersRepository);
    user = givenUser();
    userWithId = givenUser({
      index: 1,
    });
    listOfUsers = [
      userWithId,
      givenUser({
        index: 2,
        firstname: 'Bash',
      }),
    ];
    updatedUser = givenUser({
      index: 1,
      firstname: 'Bash',
    });
    controller = new UsersController(usersRepo);
  }
});
