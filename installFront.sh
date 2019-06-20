#!/bin/bash
BACKEND="eleccionesFrontEnd/Mini-BackEnd"

echo "Killing previous instances"
cd $BACKEND
./shutdown
cd ..
cd ..

echo "Uncompressing file..."
tar -xzf frontend.tar.gz

echo "Deleting compressed file..."
rm frontend.tar.gz

echo "Starting application..."
cd $BACKEND
./startup
cd ..
cd ..

echo "Installation finished."
