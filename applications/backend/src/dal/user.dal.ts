import { PageInfo as IPageInfo } from '@spaceheater/shared/types/model.pageInfo';
import { DefaultQueryParams as IDefaultQueryParams } from '@spaceheater/shared/types/model.defaultQueryParams';
import { User as IUser } from '@spaceheater/shared/types/model.user';
import { User, Company } from '../entities';
import { AppDataSource } from '../database/data-source';
import { getAllOrPaginated } from '../utils/getAllOrPaginated';
import { CustomError } from '../utils/customError';
import { CreateUserRequest, UpdateUserRequest } from '@spaceheater/shared';
import { CognitoIdentityService } from '../aws/cognito/cognito-identity-service';
import { UsersQueryParams as IUsersQueryParams } from '@spaceheater/shared';
import { addSearchToQuery } from '../utils/searchUtils';
import { addSortToQuery } from '../utils/sortUtils';

const userRepository = AppDataSource.getRepository(User);

const SORTABLE_FIELDS = ['first_name', 'last_name', 'email', 'updated_at', 'created_at'];
const DEFAULT_ORDER_BY = 'last_name';
const DEFAULT_ORDER_DIR = 'ASC';

export const getAllUsers = async (
  params: Partial<IUsersQueryParams>,
): Promise<{ page_info: IPageInfo; results: IUser[] } | null> => {
  let query = userRepository.createQueryBuilder('User').select();

  if (params.company_id) {
    query = query.andWhere('User.company_id = :company_id', { company_id: params.company_id });
  }

  if (params.role) {
    query = query.andWhere('User.role = :role', { role: params.role });
  }

  if (params.q) {
    query = addSearchToQuery('User', query, 'text_tsvector', params.q);
  }

  query = addSortToQuery('User', query, params, SORTABLE_FIELDS, DEFAULT_ORDER_BY, DEFAULT_ORDER_DIR);

  return getAllOrPaginated(query, params);
};

export const getCompanyUsers = async (
  params: Partial<IDefaultQueryParams>,
  company: Company,
): Promise<{ page_info: IPageInfo; results: IUser[] } | null> => {
  const query = userRepository
    .createQueryBuilder('User')
    .select()
    .where('User.company_id = :company_id', { company_id: company.id })
    .orderBy(`User.first_name`, 'ASC');

  return getAllOrPaginated(query, params);
};

export const getUserById = async (params: Partial<IDefaultQueryParams>, id: string): Promise<User | null> => {
  const user = await userRepository.findOne({ where: { id } });

  if (!user) {
    throw new CustomError('User not found', 404);
  }

  return user;
};

export const getCompanyUserById = async (
  params: Partial<IDefaultQueryParams>,
  id: string,
  company: Company,
): Promise<User | null> => {
  const company_id: string = company.id;
  const user = await userRepository.findOne({ where: { id, company_id } });

  if (!user) {
    throw new CustomError('User not found', 404);
  }

  return user;
};

export const getUserByRefreshToken = (refreshToken: string): Promise<User | null> =>
  userRepository.findOne({ where: { refresh_token: refreshToken } });

export const getIsUserExist = async (email: string): Promise<boolean | null> => {
  const user = await userRepository.findOne({ where: { email } });

  return !!user;
};

export const createUser = async (
  params: Partial<IDefaultQueryParams>,
  userData: CreateUserRequest,
): Promise<User | null> => {
  const isUserExist = await getIsUserExist(userData.email);

  if (isUserExist) {
    throw new CustomError('User account already exists', 404);
  }

  const user = userRepository.create(userData);

  const userResponse = await userRepository.save(user);

  if (!userResponse) {
    throw new CustomError('User not Created', 404);
  }

  const cognitoIdentityService = new CognitoIdentityService();
  const cognitoUser = await cognitoIdentityService.createUser(user.email);

  if (cognitoUser && cognitoUser.User && cognitoUser.User.Username) {
    await userRepository.update(user.id, { cognito_sub: cognitoUser.User.Username });
  }

  return userResponse;
};

export const updateUser = async (id: string, userData: UpdateUserRequest): Promise<User | null> => {
  const userToUpdate = await userRepository.findOne({ where: { id } });

  if (!userToUpdate) {
    throw new CustomError('User not found', 404);
  }

  const updatedUser = { ...userToUpdate, ...userData };

  if (userData.email && userToUpdate.email !== userData.email) {
    const cognitoIdentityService = new CognitoIdentityService();
    await cognitoIdentityService.updateUser(updatedUser.cognito_sub, updatedUser.email);
  }

  const userResponse = await userRepository.save(updatedUser);

  return userResponse;
};

export const updateCompanyUser = async (
  id: string,
  userData: UpdateUserRequest,
  company: Company,
): Promise<User | null> => {
  const company_id: string = company.id;
  const userToUpdate = await userRepository.findOne({ where: { id, company_id } });

  if (!userToUpdate) {
    throw new CustomError('User not found', 404);
  }

  const updatedUser = { ...userToUpdate, ...userData };
  const userResponse = await userRepository.save(updatedUser);

  return userResponse;
};

export const deleteUser = async (params: Partial<IDefaultQueryParams>, id: string): Promise<void> => {
  const userToDelete = await userRepository.findOne({ where: { id } });

  if (!userToDelete) {
    throw new CustomError('Label not found', 404);
  }
  await userRepository.delete(id);
};

export const deleteCompanyUser = async (
  params: Partial<IDefaultQueryParams>,
  id: string,
  company: Company,
): Promise<void> => {
  const company_id: string = company.id;
  const userToDelete = await userRepository.findOne({ where: { id, company_id } });

  if (!userToDelete) {
    throw new CustomError('Label not found', 404);
  }
  await userRepository.delete(id);
};
