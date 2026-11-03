import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  // Expose the dev server on the LAN so phones/tablets can open it
  // (http://<host-ip>:5173); with a USB cable, `adb reverse tcp:5173 tcp:5173`
  // lets the phone use http://localhost:5173 instead.
  server: {
    host: true,
  },
})
