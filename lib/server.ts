import app from './app';

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Battles API server running on ${PORT}`);
});
