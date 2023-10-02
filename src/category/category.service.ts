import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    let newCategory: any = { label: createCategoryDto.label };
    if (createCategoryDto.parentId !== '') {
      const parentCategory = await this.categoryRepository.findOne({
        where: { id: createCategoryDto.parentId },
      });
      newCategory = { ...newCategory, parent: parentCategory };
    }
    return await this.categoryRepository.save(newCategory);
  }

  async findAll() {
    return await this.categoryRepository.find({
      where: { parent: IsNull() },
      relations: ['childs', 'parent'],
    });
  }

  async findOne(id: string) {
    return await this.categoryRepository.findOne({
      where: { id },
      relations: ['parent', 'products'],
    });
  }

  async findOneByLabel(label: string) {
    return await this.categoryRepository.findOne({
      where: { label },
      relations: ['childs'],
    });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    let updatedCategory: any = { id, label: updateCategoryDto.label };
    if (updateCategoryDto.parentId) {
      const parentCategory = await this.categoryRepository.findOne({
        where: { id: updateCategoryDto.parentId },
      });
      updatedCategory = { ...updatedCategory, parent: parentCategory };
    }
    return await this.categoryRepository.save(updatedCategory);
  }
}
