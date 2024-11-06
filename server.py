import threading
import sounddevice as sd
from http.server import BaseHTTPRequestHandler, HTTPServer

# Parameters
duration = 1  # 10 milliseconds
sample_rate = 44100  # Sample rate in Hz

# Shared variable to hold the latest audio data
audio_data = None
data_lock = threading.Lock()

def record_audio():
    global audio_data
    while True:
        # Record audio
        new_data = sd.rec(int(duration * sample_rate), samplerate=sample_rate, channels=1, dtype='float32')
        sd.wait()
        
        # Update shared audio data with lock
        with data_lock:
            audio_data = new_data

# HTTP server handler to serve the latest audio data
class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Acquire lock to access the latest audio data safely
        with data_lock:
            if audio_data is not None:
                # Convert audio data to text format
                audio_text_data = "\n".join(f"{sample[0]:.6f}" for sample in audio_data)
            else:
                audio_text_data = "No audio data available yet."

        # Set response status and headers
        self.send_response(200)
        self.send_header("Content-type", "text/plain")
        self.end_headers()

        # Send the latest audio data as the response
        self.wfile.write(audio_text_data.encode())

def start_server():
    host = "localhost"
    port = 8000
    server_address = (host, port)
    httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)
    print(f"Server running on http://{host}:{port}")
    httpd.serve_forever()

# Create and start threads for both tasks
audio_thread = threading.Thread(target=record_audio, daemon=True)
server_thread = threading.Thread(target=start_server, daemon=True)

# Start both threads
audio_thread.start()
server_thread.start()

# Keep the main thread alive
audio_thread.join()
server_thread.join()
