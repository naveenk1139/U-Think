import { Router } from 'express';
import { getStates, getDistricts, getTaluks, getCities } from '../controllers/geographyController.js';

const router = Router();

router.get('/states', getStates);
router.get('/districts', getDistricts);
router.get('/taluks', getTaluks);
router.get('/cities', getCities);

export default router;
