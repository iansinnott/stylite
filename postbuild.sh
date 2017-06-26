# Copy over the manifest file and replace it's version with the version found in
# package.json. This way we just have one version to keep track of.
cat src/manifest.json | sed "s/\"version\":.*\"/\"version\": \"$(node -e 'console.log(require("./package.json").version)')\"/" > ./dist/manifest.json
echo "Copying to ./dist...\nmanifest.json"

# Copy over plugin assets
cp ./web_modules/assets/* ./dist/
echo "$(ls ./web_modules/assets/* | xargs -I _ basename _)"

echo "Zipping final files..."
zip -r stylite.zip ./dist

echo "Done."
