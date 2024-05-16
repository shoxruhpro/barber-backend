import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

const fileInterceptor = FileInterceptor('photo', {
  storage: diskStorage({
    destination: 'public/img',
    filename: (req, file, cb) => {
      cb(null, Date.now() + extname(file.originalname));
    },
  }),
});

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(fileInterceptor)
  @Post()
  create(
    @Body() createEmployeeDto: CreateEmployeeDto,
    @UploadedFile() photo: any,
  ) {
    return this.employeesService.create({
      photo: photo.filename,
      ...createEmployeeDto,
    });
  }

  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.employeesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(fileInterceptor)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
    @UploadedFile() photo: any,
  ) {
    const payload: Partial<UpdateEmployeeDto> & { photo?: string } = {
      ...updateEmployeeDto,
    };

    if (photo?.filename) payload.photo = photo.filename;

    return this.employeesService.update(id, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.employeesService.remove(id);
  }
}
