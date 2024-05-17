import { Injectable } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { SignInAdminDto } from 'src/admin/dto/signin-admin.dto';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  async validateUser(signInAdminDto: SignInAdminDto): Promise<any> {
    const admin = await this.adminService.findOne(signInAdminDto.username);

    if (admin && admin.password === signInAdminDto.password) {
      // const { password, ...result } = admin;
      return admin;
    }
    return null;
  }

  async login(admin: any) {
    const payload = { username: admin.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
