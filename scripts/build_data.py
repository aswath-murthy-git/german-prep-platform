import json
import os

# We will generate comprehensive b1_reading_data.ts, b1_listening_data.ts, b1_keywords_data.ts, b1_writing_data.ts, b1_speaking_data.ts

def sanitize_no_em_dash(text):
    # Ensure no em dash or en dash unicode characters
    return text.replace('\u2014', ' - ').replace('\u2013', ' - ')

print("Script template ready")
