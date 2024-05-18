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
  Query,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiTags } from '@nestjs/swagger';

const fileInterceptor = FileInterceptor('photo', {
  storage: diskStorage({
    destination: 'public/img',
    filename: (req, file, cb) => {
      cb(null, Date.now() + extname(file.originalname));
    },
  }),
});

@ApiTags('employees')
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
  findAll(
    @Query('search') text: string,
    @Query('serviceIds') serviceIds: string[],
  ) {
    return this.employeesService.findAll(text, serviceIds);
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
