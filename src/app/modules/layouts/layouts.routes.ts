import express from 'express';
import { LayoutController } from './layouts.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { validateRequest } from '../../middlewares/validateRequest';
import { BlogValidation } from './layouts.validations';

const router = express.Router();
router.get('/blog', LayoutController.getBlog);
router.post(
  '/create-layout',

  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  LayoutController.createLayout,
);
router.post(
  '/create-blog',
  validateRequest(BlogValidation.create),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  LayoutController.createBlog,
);
router.post(
  '/create-faq',
  validateRequest(BlogValidation.faq),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  LayoutController.createFAQ,
);
router.put(
  '/update-layout',
  auth(ENUM_USER_ROLE.ADMIN),
  LayoutController.updateLayout,
);
router.put(
  '/update-blog/:id',
  validateRequest(BlogValidation.update),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  LayoutController.updateBlog,
);
router.get(
  '/get-layout/:type',

  LayoutController.getLayoutByType,
);
router.get(
  '/faq',

  LayoutController.getAllFAQs,
);
router.get(
  '/blog/:id',

  LayoutController.getBlogById,
);
router.delete(
  '/blog/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  LayoutController.deleteBlog,
);

export const LayoutRoutes = router;
