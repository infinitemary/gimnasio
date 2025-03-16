import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<import("../interfaces/user.interface").User>;
    findAll(): Promise<import("../interfaces/user.interface").User[]>;
    findOne(id: string): Promise<import("../interfaces/user.interface").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("../interfaces/user.interface").User>;
    remove(id: string): Promise<void>;
}
