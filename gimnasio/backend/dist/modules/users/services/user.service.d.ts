import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserRepository } from '../repositories/user.repository';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    create(createUserDto: CreateUserDto): Promise<import("../interfaces/user.interface").User>;
    findAll(): Promise<import("../interfaces/user.interface").User[]>;
    findOne(id: string): Promise<import("../interfaces/user.interface").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("../interfaces/user.interface").User>;
    remove(id: string): Promise<void>;
}
