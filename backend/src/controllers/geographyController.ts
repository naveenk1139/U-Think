import { Request, Response, NextFunction } from 'express';
import State from '../models/State.js';
import District from '../models/District.js';
import Taluk from '../models/Taluk.js';
import City from '../models/City.js';

export const getStates = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const states = await State.find({ active: true }).sort('name');
    res.json(states);
  } catch (error) {
    next(error);
  }
};

export const getDistricts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { stateId } = req.query;
    const filter: any = { active: true };
    if (stateId) filter.stateId = stateId;
    
    const districts = await District.find(filter).sort('name');
    res.json(districts);
  } catch (error) {
    next(error);
  }
};

export const getTaluks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { districtId } = req.query;
    const filter: any = { active: true };
    if (districtId) filter.districtId = districtId;
    
    const taluks = await Taluk.find(filter).sort('name');
    res.json(taluks);
  } catch (error) {
    next(error);
  }
};

export const getCities = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { districtId, talukId } = req.query;
    const filter: any = { active: true };
    if (districtId) filter.districtId = districtId;
    if (talukId) filter.talukId = talukId;
    
    const cities = await City.find(filter).sort('name');
    res.json(cities);
  } catch (error) {
    next(error);
  }
};
