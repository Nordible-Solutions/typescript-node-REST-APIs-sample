import app from './app';
import config from './config/config';

const PORT = config.PORT;

app.listen(PORT, () => {
    console.log(`Battles API server running on ${PORT}`);
});