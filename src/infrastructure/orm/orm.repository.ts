import { WishListEntity } from './entities/wish-list.entity';

export interface ORMRepository {
  findOneByEmail: (email) => Promise<WishListEntity>;
  createOne: (body: WishListEntity) => Promise<WishListEntity[]>;
  updateOne(set: any, where: string, params: any): Promise<void>;
}
