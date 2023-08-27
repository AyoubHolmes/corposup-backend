import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { signInDto, signUpDto } from './auth.dto';

export const SignUpDocs = () =>
  applyDecorators(
    ApiBody({
      type: [signUpDto],
    }) as PropertyDecorator,
    ApiParam({
      name: 'firstname',
      required: true,
      description: 'First name of the user.',
      type: String,
      example: 'John',
    }) as PropertyDecorator,
    ApiParam({
      name: 'lastname',
      required: true,
      description: 'Last name of the user.',
      type: String,
      example: 'Joe',
    }) as PropertyDecorator,
    ApiParam({
      name: 'email',
      required: true,
      description: 'Email of the user.',
      example: 'john.doe.@gmail.com',
      type: String,
    }) as PropertyDecorator,
    ApiParam({
      name: 'password',
      required: true,
      description: 'Password of the user.',
      example: '**********',
      type: String,
    }) as PropertyDecorator,
    ApiCreatedResponse({
      description: 'The account has been created successfully',
    }) as PropertyDecorator,
  );

export const SignInDocs = () =>
  applyDecorators(
    ApiBody({
      type: [signInDto],
    }) as PropertyDecorator,
    ApiParam({
      name: 'email',
      required: true,
      description: 'Email of the user.',
      example: 'john.doe.@gmail.com',
      type: String,
    }) as PropertyDecorator,
    ApiParam({
      name: 'password',
      required: true,
      description: 'Password of the user.',
      example: '**********',
      type: String,
    }) as PropertyDecorator,
    ApiCreatedResponse({
      description:
        'You have signed in successfully, a jwt has been sent to you for future requests.',
    }) as PropertyDecorator,
    ApiNotFoundResponse({
      description: 'User not found.',
    }) as PropertyDecorator,
    ApiUnauthorizedResponse({
      description: 'Invalid credentials.',
    }) as PropertyDecorator,
  );

export const SignOutDocs = () =>
  applyDecorators(
    ApiNoContentResponse({
      description: 'Logout successfully.',
    }) as PropertyDecorator,
  );
