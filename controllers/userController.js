import User from '../models/userModel.js';
import axios from 'axios';

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        const result = await user.save();
        res.status(201).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.send({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getPokemon = async(req, res) => {
    try {
        const pokemonData = await axios.get('https://pokeapi.co/api/v2/pokemon/ditto');
        // console.log(res.data);
        res.send(pokemonData.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data for pokemon');
    }
};