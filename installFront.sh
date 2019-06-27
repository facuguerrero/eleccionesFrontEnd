#!/bin/bash
BACKEND="eleccionesFrontEnd/Mini-BackEnd"
TEST=="TestEleccionesFrontEnd/Mini-BackEnd"

echo "Killing previous instances"
cd $TEST
./shutdown
cd ..
cd ..

echo "Uncompressing file..."
tar -xzf frontend.tar.gz

echo "Deleting compressed file..."
rm frontend.tar.gz

echo "Starting application..."
cd $TEST
./startup
cd ..
cd ..

echo "Installation finished."
