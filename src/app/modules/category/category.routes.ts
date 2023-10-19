import express from 'express';

import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validations';
import { validateRequest } from '../../middlewares/validateRequest';

const router = express.Router();

router.get('/', CategoryController.getAllCategory);

router.post(
  '/create-category',
  // validateRequest(CategoryValidation.create),
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.createCategory,
);
router.patch(
  '/update-category/:id',
  validateRequest(CategoryValidation.update),
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.updateCategory,
);
router.get('/:id', CategoryController.getSIngleCategory);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.deleteCategory,
);
export const CategoryRoutes = router;
