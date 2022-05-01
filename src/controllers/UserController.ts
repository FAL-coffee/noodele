import * as services from "../services/users";

type User = {
  id: string;
  name: string;
  email: string;
  emailVarifiedAt: Date | null;
  password: string;
  deleted: boolean;
};

type ListResponse = Promise<{
  status: 200 | 500;
  data: User[] | null;
  message: string;
}>;

type DeleteResponse = Promise<{
  status: 200 | 500;
  data: null;
  message: string;
}>;

type UpdateRequest = {
  userId: string;
  data: services.UpdateUserByIdData;
};

type UpdateResponse = Promise<{
  status: 200 | 500;
  data: null;
  message: string;
}>;

export class UserController {
  async list(): ListResponse {
    try {
      const users = await services.getUserList();
      return { status: 200, data: users, message: "Successfully processed." };
    } catch (e) {
      return { status: 500, data: null, message: "Processed failed." };
    }
  }

  async delete(userId: string): DeleteResponse {
    try {
      await services.removeUserById(userId);
      return { status: 200, data: null, message: "Successfully processed." };
    } catch (error) {
      return { status: 500, data: null, message: "Processed failed." };
    }
  }

  async update({ userId, data }: UpdateRequest): UpdateResponse {
    try {
      await services.updateUserById(userId, data);
      return { status: 200, data: null, message: "Successfully processed." };
    } catch (error) {
      return { status: 500, data: null, message: "Processed failed." };
    }
  }
}
