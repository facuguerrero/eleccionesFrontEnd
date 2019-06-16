#!/bin/bash

echo "Uncompressing file..."
tar -xzf frontend.tar.gz
echo "Deleting compressed file..."
rm frontend.tar.gz
cd eleccionesFrontEnd/
echo "Installing dependencies..."
npm i
echo "Starting application..."
npm run dev
cd ..
echo "Installation finished."
