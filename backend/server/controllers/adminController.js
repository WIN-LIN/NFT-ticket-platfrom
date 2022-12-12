const { ethers } = require('ethers');
const deployContract = async (req, res) => {
    console.log("controller");
    const { name, description, price } = req.body;
    res.send("Deployed contract, name: " + name + ", description: " + description + ", price: " + price);
};

module.exports = {
    deployContract,
}