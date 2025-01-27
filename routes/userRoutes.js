import express from 'express';
import { getUsers, createUser, deleteUser, getPokemon} from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.delete('/:id', deleteUser);
router.get('/pokemon', getPokemon);

export default router;