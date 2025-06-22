// Generates a 4-digit unique-looking token number for patients
const generateTokenNumber = () => {
  return Math.floor(1000 + Math.random() * 9000); // range: 1000-9999
};

module.exports = generateTokenNumber;
