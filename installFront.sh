#!/bin/bash
BACKEND="eleccionesFrontEnd/Mini-BackEnd"

echo "Killing previous instances"
.$BACKEND/shutdown

echo "Uncompressing file..."
tar -xzf frontend.tar.gz

echo "Deleting compressed file..."
rm frontend.tar.gz

echo "Starting application..."
.$BACKEND/startup

echo "Installation finished."
