import { Router } from 'express';

const Home = Router();

Home.get('/', (req, res) => {
    res.send('hi from home');
});

export default Home;