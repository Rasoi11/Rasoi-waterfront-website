#!/usr/bin/env python3
"""Dev server that disables caching so browsers always see latest changes."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import sys

class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8765
    server = ThreadingHTTPServer(('0.0.0.0', port), NoCacheHandler)
    print(f"Dev server (no-cache) on http://localhost:{port}")
    server.serve_forever()
