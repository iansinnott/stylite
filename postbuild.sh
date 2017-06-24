# Copy over the manifest file
cp ./src/manifest.json ./dist/
echo "Copying to ./dist...\nmanifest.json"

# Copy over plugin assets
cp ./web_modules/assets/* ./dist/
echo "$(ls ./web_modules/assets/* | xargs -I _ basename _)"

echo "Done."
