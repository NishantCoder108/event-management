#!/bin/bash

export PATH=$PATH:/home/ubuntu/.nvm/versions/node/v22.3.0/bin

cd backend


git pull origin main



# Check if PM2 is running
if pgrep pm2 > /dev/null; then
  echo "PM2 is running. Killing PM2 processes."
  pm2 kill
else
  echo "PM2 is not running."
fi

# Run the production build
echo "Running production build..."
npm run prod

echo "Deployment completed successfully."