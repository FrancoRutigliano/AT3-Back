import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../../domain/services/user.service';
import { LoginDto } from '../../dto/login.dto';
import { RegisterDto } from '../../dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  // INICIO DE SESION
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto; 
    const user = await this.userService.login(email, password);
    
    return { message: 'Login successful', user };
  }

  // REGISTRO
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.userService.register(registerDto);
    return { message: 'User registered successfully', user };
  }
}
