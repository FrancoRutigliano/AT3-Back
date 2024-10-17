import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/orm/user.repository';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  // INCIO DE SESION
  async login(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new HttpException('Credenciales inválidas', HttpStatus.UNAUTHORIZED);
    }
    
    return user;
  }

  // REGISTRO
  async register(data: {
    razonSocial: string;
    pais: string;
    domicilioFiscal: string;
    identificacionTributaria: string;
    nroTelefono: string;
    email: string;
    password: string;
    walletAddress: string;
    isUIFF?: boolean;
    isExpuesta?: boolean;
    isCompany?: boolean;
  }): Promise<User> {
    const {
      razonSocial, pais, domicilioFiscal, identificacionTributaria, nroTelefono, 
      email, password, walletAddress, isUIFF = false, 
      isExpuesta = false, isCompany = false
    } = data;

    const existingUser = await this.userRepository.findOne({
      where: [
        { email },
        { identificacionTributaria }
      ]
    });

    if (existingUser) {
      throw new HttpException('Usuario o identificación tributaria ya existe', HttpStatus.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      razonSocial,
      pais,
      domicilioFiscal,
      identificacionTributaria,
      nroTelefono,
      email,
      password: hashedPassword,
      walletAddress,
      isUIFF,
      isExpuesta,
      isCompany,
    });

    return this.userRepository.save(newUser);
  }
}
