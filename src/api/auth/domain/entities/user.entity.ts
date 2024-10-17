import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  razonSocial: string; 

  @Column()
  pais: string; 

  @Column()
  domicilioFiscal: string;  

  @Column({ unique: true })
  identificacionTributaria: string; 

  @Column()
  nroTelefono: string; 

  @Column({ unique: true })
  email: string; 

  @Column()
  password: string;  
  @Column({ default: false })
  isUIFF: boolean;  

  @Column({ default: false })
  isExpuesta: boolean; 

  @Column({ default: false })
  isCompany: boolean; 

  @Column({ unique: true })
  walletAddress: string; 
}
