import * as services from "../services/users";

type User = {
  id: string;
  name: string;
  email: string;
  emailVarifiedAt: Date | null;
  password: string;
  deleted: boolean;
};

type Response<T> = Promise<{
  status: 200 | 500;
  data: T;
  message: string;
}>;

type UpdateRequest = {
  userId: string;
  data: services.UpdateUserByIdData;
};

export class UserController {
  async list(): Response<User[] | null> {
    try {
      const users = await services.getUserList();
      return { status: 200, data: users, message: "Successfully processed." };
    } catch (e) {
      return { status: 500, data: null, message: "Processed failed." };
    }
  }

  async delete(userId: string): Response<null> {
    try {
      await services.removeUserById(userId);
      return { status: 200, data: null, message: "Successfully processed." };
    } catch (error) {
      return { status: 500, data: null, message: "Processed failed." };
    }
  }

  async update({ userId, data }: UpdateRequest): Response<null> {
    try {
      await services.updateUserById(userId, data);
      return { status: 200, data: null, message: "Successfully processed." };
    } catch (error) {
      return { status: 500, data: null, message: "Processed failed." };
    }
  }
}
