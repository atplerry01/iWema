# Include only what the application needs to run
# This means only include production dependencies, not development dependencies :
RUN npm install --only=production

# Run npm install before copying your source to the container image
# This allows your docker runtime to cache the volume layer containing all your dependencies below 
# the layer containing your sources

# Use a specific version of Node docker image


### https://www.hostingadvice.com/how-to/update-npm-packages/
## npm install -g npm-check-updates
npm outdated
ncu --help
##ncu –upgradeAll
ncu --upgradeAll
npm install