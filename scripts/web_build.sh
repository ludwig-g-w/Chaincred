echo "Exporting Expo application to Web version..."
npx expo export --platform web > output.txt 2>&1 &

PID=$!

while kill -0 $PID 2>/dev/null; do
    if grep -q "App exported to: dist" output.txt; then
        kill $PID
        break
    fi
    sleep 1
done