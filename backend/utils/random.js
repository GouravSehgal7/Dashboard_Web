const getRandomValue = (min, max) => {
    return (Math.random() * (max - min) + min).toFixed(2);
};

module.exports = {getRandomValue}