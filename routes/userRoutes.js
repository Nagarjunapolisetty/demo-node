import express from 'express';
import { getUsers, createUser, deleteUser, getPokemon} from '../controllers/userController.js';
import { validateUser } from '../middlewares/validateUser.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/', validateUser, createUser);
router.delete('/:id', deleteUser);
router.get('/pokemon', getPokemon);

export default router;