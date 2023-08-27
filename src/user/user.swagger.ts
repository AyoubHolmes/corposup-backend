import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiPayloadTooLargeResponse,
} from '@nestjs/swagger';
import {
  UpdateUserCredentialsDto,
  UpdateUserProfileDto,
} from './dtos/user.dto';

export const GetApiKeyDocs = () =>
  applyDecorators(
    ApiOkResponse({
      description: 'Return id, Api Key',
    }) as PropertyDecorator,
    ApiNotFoundResponse({
      description: 'User not found.',
    }) as PropertyDecorator,
  );

export const GetHeaderDocs = () =>
  applyDecorators(
    ApiOkResponse({
      schema: {
        properties: {
          id: {
            type: 'string',
            example: '5810c3af-4058-45de-89f9-bb1c926ee7c9',
            description: 'user Id',
          },
          firstname: { type: 'string', example: 'John' },
          lastname: { type: 'string', example: 'Mama' },
          avatar: {
            type: 'string',
            description: 'aws S3 avatar link',
          },
        },
      },
      description: 'Return id, firstname, lastname, avatar',
    }) as PropertyDecorator,
    ApiNotFoundResponse({
      description: 'User not found.',
    }) as PropertyDecorator,
  );

export const GetProfileInfoDocs = () =>
  applyDecorators(
    ApiOkResponse({
      description: 'Return id, firstname, lastname, email, contact',
    }) as PropertyDecorator,
    ApiNotFoundResponse({
      description: 'User not found.',
    }) as PropertyDecorator,
  );

export const DeleteAvatarDocs = () =>
  applyDecorators(
    ApiOkResponse({
      description: 'Avatar deleted successfully.',
    }) as PropertyDecorator,
    ApiNotFoundResponse({
      description: 'User not found.',
    }) as PropertyDecorator,
  );

export const UpdateProfileDocs = () =>
  applyDecorators(
    ApiBody({
      type: [UpdateUserProfileDto],
    }) as PropertyDecorator,
    ApiParam({
      name: 'firstname',
      required: false,
      description: 'Update First name of the user.',
      type: String,
      example: 'John',
    }) as PropertyDecorator,
    ApiParam({
      name: 'lastname',
      required: false,
      description: 'Update Last name of the user.',
      type: String,
      example: 'Joe',
    }) as PropertyDecorator,
    ApiParam({
      name: 'email',
      required: false,
      description: 'Update Email of the user.',
      example: 'john.doe.@gmail.com',
      type: String,
    }) as PropertyDecorator,
    ApiOkResponse({
      description: 'The profile has been updated successfully',
    }) as PropertyDecorator,
    ApiNotFoundResponse({
      description: 'User not found.',
    }) as PropertyDecorator,
    ApiConflictResponse({
      description: 'The email already exists. ',
    }) as PropertyDecorator,
    ApiPayloadTooLargeResponse({
      description: 'File too large. ',
    }) as PropertyDecorator,
  );

export const UpdateCredentialsDocs = () =>
  applyDecorators(
    ApiBody({
      type: [UpdateUserCredentialsDto],
    }) as PropertyDecorator,
    ApiParam({
      name: 'currPassword',
      required: false,
      description: 'Current Password of the user.',
      example: 'Password123+++',
      type: String,
    }) as PropertyDecorator,
    ApiParam({
      name: 'newPassword',
      required: true,
      description: 'New Password of the user.',
      example: 'Password123---',
      type: String,
    }) as PropertyDecorator,
    ApiParam({
      name: 'confirmNewPassword',
      required: true,
      description: 'Confirm new Password of the user.',
      example: 'Password123---',
      type: String,
    }) as PropertyDecorator,
    ApiOkResponse({
      description: 'The password has been updated successfully',
    }) as PropertyDecorator,
  );
