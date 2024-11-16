async function main() {
    // Get the signer
    const [deployer] = await ethers.getSigners();
    console.log("deployer:", deployer);
}

// Execute the deployment script
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });