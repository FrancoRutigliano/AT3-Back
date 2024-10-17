import { IsEmail, IsString, IsBoolean, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsString()
  razonSocial: string;

  @IsString()
  pais: string;

  @IsString()
  domicilioFiscal: string;

  @IsString()
  identificacionTributaria: string;

  @IsString()
  nroTelefono: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  walletAddress: string;

  @IsBoolean()
  @IsOptional()
  isUIFF?: boolean;  

  @IsBoolean()
  @IsOptional()
  isExpuesta?: boolean;  

  @IsBoolean()
  @IsOptional()
  isCompany?: boolean; 
}