#!/bin/bash
set -e
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

# Ensure port 3001 is clean
lsof -ti:3001 | xargs kill -9 2>/dev/null || true

# Start Next.js production server on port 3001
npm run start &
NEXT_PID=$!

# Wait for Next.js to start
for i in {1..30}; do
  if curl -s http://localhost:3001 >/dev/null 2>&1; then
    echo "Next.js server is ready on http://localhost:3001"
    break
  fi
  sleep 0.5
done

# Run Cloudflare tunnel
echo "Starting Cloudflare tunnel german-prep-tunnel..."
cloudflared tunnel --config ./cloudflared-config.yml run german-prep-tunnel &
TUNNEL_PID=$!

wait $NEXT_PID $TUNNEL_PID
