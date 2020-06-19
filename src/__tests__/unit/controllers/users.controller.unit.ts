import {HttpErrors} from '@loopback/rest';
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
    // it('creates a user', async () => {
    //   const create = usersRepo.stubs.create;
    //   create.resolves(userWithId);
    //   const result = await controller.create(user);
    //   expect(result).to.eql(userWithId);
    //   sinon.assert.calledWith(create, user);
    // });

    it('does not accepts error', async () => {
      // let error;
      // try {
      //   await controller.create(user, true);
      // } catch (err) {
      //   error = err;
      // } finally {
      //   expect(error).instanceOf(HttpErrors.InternalServerError);
      // }

      const error = await controller.create(user, true).catch(err => {
        return err;
      });

      expect(error).instanceOf(HttpErrors.InternalServerError);
    });

    it('accepts error', async () => {
      // let error;
      // try {
      //   await controller.create(user, false);
      // } catch (err) {
      //   error = err;
      // } finally {
      //   expect(error).instanceOf(HttpErrors.InternalServerError);
      // }

      const error = await controller.create(user, false).catch(err => {
        return err;
      });

      expect(error).instanceOf(HttpErrors.InternalServerError);
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

  describe('find users by customer', () => {
    it('returns a users lists with the same customer', async () => {
      const find = usersRepo.stubs.find;
      find.resolves(listOfUsers);
      expect(
        await controller.findByCustomer(listOfUsers[0].customer as string),
      ).to.eql(listOfUsers);
      sinon.assert.calledWith(find);
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
