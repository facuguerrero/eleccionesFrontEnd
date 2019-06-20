#!/bin/bash
BACKEND="Mini-BackEnd"

echo "Uncompressing file..."
tar -xzf frontend.tar.gz

echo "Deleting compressed file..."
rm frontend.tar.gz

cd $BACKEND/

echo "Killing previous instances"
./shutdown.sh

echo "Starting application..."
./startup.sh

cd ..

echo "Installation finished."
