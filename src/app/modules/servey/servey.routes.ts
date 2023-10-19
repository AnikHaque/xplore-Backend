import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { ServeyController } from './servey.controller';

const router = express.Router();

router.get('/', ServeyController.getAllServey);

router.post(
  '/',

  auth(ENUM_USER_ROLE.USER),
  ServeyController.insertIntoDB,
);

export const ServeyRoutes = router;
