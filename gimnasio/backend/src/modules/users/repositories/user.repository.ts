import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from './user.repository.interface';
import { User } from '../interfaces/user.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PrismaService } from '../../../infrastructure/database/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    
    const user = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPassword,
        role: createUserDto.role as any,
      },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    
    return users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // Verificar si el usuario existe
    await this.findOne(id);
    
    // Preparar los datos para actualizar
    const data: any = {};
    if (updateUserDto.name) data.name = updateUserDto.name;
    if (updateUserDto.email) data.email = updateUserDto.email;
    if (updateUserDto.password) {
      data.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    if (updateUserDto.role) data.role = updateUserDto.role;

    // Actualizar el usuario
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data,
    });

    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      password: updatedUser.password,
      role: updatedUser.role,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    };
  }

  async remove(id: string): Promise<void> {
    // Verificar si el usuario existe
    await this.findOne(id);
    
    // Eliminar el usuario
    await this.prisma.user.delete({
      where: { id },
    });
  }
} 