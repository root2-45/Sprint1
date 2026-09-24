

# import os
# import re
# import json
# import subprocess
# import base64
# import math
# import numpy as np
# from datetime import datetime
# from flask import Flask, request, jsonify, send_file
# from flask_cors import CORS
# from PIL import Image, ImageChops, ImageStat
# import requests

# # ================================================================
# #  MONGODB — new imports
# # ================================================================
# import database

# app = Flask(__name__)
# CORS(app)

# app.config['UPLOAD_FOLDER'] = 'uploads'
# app.config['STRIPPED_FOLDER'] = 'stripped'
# app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024

# os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
# os.makedirs(app.config['STRIPPED_FOLDER'], exist_ok=True)

# EXIFTOOL_PATH = r"C:\ExifTool\exiftool.exe"
# OLLAMA_URL = "http://localhost:11434/api/generate"


# class MetaLens:
#     def __init__(self):
#         self.exiftool = EXIFTOOL_PATH
#         self.ollama = OLLAMA_URL

#     def flatten_array(self, val):
#         if val is None:
#             return 'N/A'
#         if isinstance(val, list):
#             flat = []
#             for item in val:
#                 if isinstance(item, list):
#                     flat.extend(self.flatten_array(item).split())
#                 else:
#                     flat.append(str(item))
#             return ' '.join(flat)
#         return str(val).strip()

#     def dms_to_decimal(self, degrees, minutes, seconds, direction):
#         try:
#             decimal = float(degrees) + (float(minutes) / 60.0) + (float(seconds) / 3600.0)
#             if direction in ['S', 'W', 'South', 'West']:
#                 decimal = -decimal
#             return round(decimal, 6)
#         except:
#             return None

#     def extract_exif(self, file_path):
#         try:
#             cmd = [self.exiftool, '-j', '-a', '-G1', '-All', file_path]
#             result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
            
#             if result.returncode == 0 and result.stdout:
#                 data = json.loads(result.stdout)
#                 if data and len(data) > 0:
#                     exif_data = data[0]
#                     return exif_data
#             return {}
#         except Exception as e:
#             print(f"ExifTool Error: {e}")
#             return {}

#     def extract_xmp_data(self, exif_data):
#         xmp_data = {}
#         if 'XMP' in exif_data:
#             xmp = exif_data['XMP']
#             if 'GPSLatitude' in xmp:
#                 xmp_data['gps_lat'] = self.flatten_array(xmp['GPSLatitude'])
#             if 'GPSLongitude' in xmp:
#                 xmp_data['gps_lon'] = self.flatten_array(xmp['GPSLongitude'])
#             if 'CreateDate' in xmp:
#                 xmp_data['date'] = self.flatten_array(xmp['CreateDate'])
#             if 'Make' in xmp:
#                 xmp_data['make'] = self.flatten_array(xmp['Make'])
#             if 'Model' in xmp:
#                 xmp_data['model'] = self.flatten_array(xmp['Model'])
#         return xmp_data

#     def extract_gps_from_exif(self, exif_data):
#         lat = None
#         lon = None

#         xmp_data = self.extract_xmp_data(exif_data)
#         if 'gps_lat' in xmp_data and 'gps_lon' in xmp_data:
#             try:
#                 lat = float(xmp_data['gps_lat'])
#                 lon = float(xmp_data['gps_lon'])
#                 return lat, lon
#             except:
#                 pass

#         if 'GPS:GPSLatitude' in exif_data and 'GPS:GPSLongitude' in exif_data:
#             try:
#                 lat_str = exif_data['GPS:GPSLatitude']
#                 lon_str = exif_data['GPS:GPSLongitude']
#                 lat_match = re.search(r'([\d.]+).*?([\d.]+).*?([\d.]+)', lat_str)
#                 lon_match = re.search(r'([\d.]+).*?([\d.]+).*?([\d.]+)', lon_str)
#                 if lat_match and lon_match:
#                     lat = float(lat_match.group(1)) + float(lat_match.group(2))/60 + float(lat_match.group(3))/3600
#                     lon = float(lon_match.group(1)) + float(lon_match.group(2))/60 + float(lon_match.group(3))/3600
#                     if 'S' in lat_str:
#                         lat = -lat
#                     if 'W' in lon_str:
#                         lon = -lon
#                     return lat, lon
#             except:
#                 pass

#         if 'GPSLatitude' in exif_data and 'GPSLongitude' in exif_data:
#             try:
#                 lat_raw = self.flatten_array(exif_data['GPSLatitude'])
#                 lon_raw = self.flatten_array(exif_data['GPSLongitude'])
#                 lat_parts = lat_raw.split()
#                 lon_parts = lon_raw.split()
#                 if len(lat_parts) == 3 and len(lon_parts) == 3:
#                     lat_ref = exif_data.get('GPSLatitudeRef', 'N')
#                     lon_ref = exif_data.get('GPSLongitudeRef', 'E')
#                     lat = self.dms_to_decimal(lat_parts[0], lat_parts[1], lat_parts[2], lat_ref)
#                     lon = self.dms_to_decimal(lon_parts[0], lon_parts[1], lon_parts[2], lon_ref)
#                 else:
#                     lat = float(lat_raw)
#                     lon = float(lon_raw)
#                 return lat, lon
#             except:
#                 pass

#         if 'GPSPosition' in exif_data:
#             try:
#                 val = exif_data['GPSPosition']
#                 match = re.search(r'([\d.]+).*?([NS]).*?([\d.]+).*?([EW])', val)
#                 if match:
#                     lat = float(match.group(1))
#                     lon = float(match.group(3))
#                     if match.group(2) == 'S':
#                         lat = -lat
#                     if match.group(4) == 'W':
#                         lon = -lon
#                     return lat, lon
#             except:
#                 pass

#         return None, None

#     def extract_timestamp(self, exif_data):
#         timestamp = {'original': None, 'compression': None, 'human': None}

#         if 'ExifIFD:DateTimeOriginal' in exif_data:
#             timestamp['original'] = self.flatten_array(exif_data['ExifIFD:DateTimeOriginal'])
#         elif 'DateTimeOriginal' in exif_data:
#             timestamp['original'] = self.flatten_array(exif_data['DateTimeOriginal'])
#         elif 'CreateDate' in exif_data:
#             timestamp['original'] = self.flatten_array(exif_data['CreateDate'])

#         if 'System:FileCreateDate' in exif_data:
#             timestamp['compression'] = self.flatten_array(exif_data['System:FileCreateDate'])
#         elif 'ModifyDate' in exif_data:
#             timestamp['compression'] = self.flatten_array(exif_data['ModifyDate'])

#         return timestamp

#     def analyze_fft(self, file_path):
#         try:
#             img = Image.open(file_path).convert('L')
#             img_array = np.array(img)
#             f_transform = np.fft.fft2(img_array)
#             f_shift = np.fft.fftshift(f_transform)
#             magnitude_spectrum = np.abs(f_shift)
#             rows, cols = img_array.shape
#             crow, ccol = rows // 2, cols // 2
#             center_region = magnitude_spectrum[crow-10:crow+10, ccol-10:ccol+10]
#             center_mean = np.mean(center_region)
#             overall_mean = np.mean(magnitude_spectrum)
#             if center_mean > overall_mean * 1.5:
#                 return {'platform_likely': 'Social Media', 'confidence': 'HIGH'}
#             else:
#                 return {'platform_likely': 'Original Camera', 'confidence': 'MEDIUM'}
#         except Exception as e:
#             return {'error': str(e)}

#     def detect_subpixel_pattern(self, file_path):
#         try:
#             img = Image.open(file_path).convert('RGB')
#             img_array = np.array(img)
#             height, width = img_array.shape[:2]
#             pattern_score = 0
#             total_samples = 0
#             for y in range(4, min(height, 200), 4):
#                 for x in range(4, min(width, 200), 4):
#                     if y+1 < height and x+1 < width:
#                         diff = abs(int(img_array[y,x,0]) - int(img_array[y+1,x+1,0]))
#                         if diff < 10:
#                             pattern_score += 1
#                         total_samples += 1
#             if total_samples > 0:
#                 pattern_ratio = pattern_score / total_samples
#                 if pattern_ratio > 0.3:
#                     return {'watermark_detected': True, 'platform': 'Instagram/Facebook'}
#                 elif pattern_ratio > 0.15:
#                     return {'watermark_detected': True, 'platform': 'Social Media (Generic)'}
#             return {'watermark_detected': False}
#         except Exception as e:
#             return {'error': str(e)}

#     def error_level_analysis(self, file_path):
#         try:
#             img = Image.open(file_path)
#             temp_path = file_path + '_temp.jpg'
#             img.save(temp_path, 'JPEG', quality=90)
#             compressed = Image.open(temp_path)
#             diff = ImageChops.difference(img.convert('RGB'), compressed.convert('RGB'))
#             stat = ImageStat.Stat(diff)
#             mean_diff = sum(stat.mean) / 3
#             os.remove(temp_path)
#             if mean_diff > 5:
#                 return {'manipulation_detected': True, 'confidence': 'HIGH'}
#             elif mean_diff > 2:
#                 return {'manipulation_detected': True, 'confidence': 'MEDIUM'}
#             else:
#                 return {'manipulation_detected': False, 'confidence': 'HIGH'}
#         except Exception as e:
#             return {'error': str(e)}

#     def analyze_noise_consistency(self, file_path):
#         try:
#             img = Image.open(file_path).convert('L')
#             img_array = np.array(img)
#             height, width = img_array.shape
#             noise_variance = []
#             block_size = 50
#             for y in range(0, height - block_size, block_size):
#                 for x in range(0, width - block_size, block_size):
#                     block = img_array[y:y+block_size, x:x+block_size]
#                     variance = np.var(block)
#                     noise_variance.append(variance)
#             if noise_variance:
#                 variance_std = np.std(noise_variance)
#                 variance_mean = np.mean(noise_variance)
#                 if variance_std / variance_mean > 0.5:
#                     return {'inconsistent_noise': True}
#             return {'inconsistent_noise': False}
#         except Exception as e:
#             return {'error': str(e)}

#     def detect_compression_artifacts(self, file_path):
#         try:
#             img = Image.open(file_path).convert('RGB')
#             img_array = np.array(img)
#             height, width = img_array.shape[:2]
#             block_artifacts = 0
#             total_blocks = 0
#             for y in range(0, min(height, 400), 8):
#                 for x in range(0, min(width, 400), 8):
#                     if y+8 < height and x+8 < width:
#                         block = img_array[y:y+8, x:x+8, :]
#                         diff = np.abs(block[0,0,:] - block[7,7,:])
#                         if np.mean(diff) < 10:
#                             block_artifacts += 1
#                         total_blocks += 1
#             if total_blocks > 0:
#                 artifact_ratio = block_artifacts / total_blocks
#                 if artifact_ratio > 0.3:
#                     return {'compression_detected': True, 'confidence': 'HIGH'}
#                 elif artifact_ratio > 0.15:
#                     return {'compression_detected': True, 'confidence': 'MEDIUM'}
#             return {'compression_detected': False}
#         except Exception as e:
#             return {'error': str(e)}

#     def detect_platform(self, filename, exif_data, fft_result=None, subpixel_result=None, compression_result=None):
#         patterns = {
#             'whatsapp': r'IMG-?\d{8}-WA\d+|VID-?\d{8}-WA\d+',
#             'instagram': r'instagram|ig_|_ig_|_\d+_\d+_|IG_',
#             'facebook': r'fb_|facebook|FB_',
#             'screenshot': r'screenshot|Screenshot|Screen Shot|Screenshot_',
#         }
#         for platform, pattern in patterns.items():
#             if re.search(pattern, filename, re.IGNORECASE):
#                 return platform

#         if 'IFD0:Make' in exif_data and exif_data['IFD0:Make']:
#             return 'original_camera'
#         if 'IFD0:Model' in exif_data and exif_data['IFD0:Model']:
#             return 'original_camera'

#         if fft_result and fft_result.get('platform_likely') == 'Social Media':
#             return 'social_media_detected'

#         if subpixel_result and subpixel_result.get('watermark_detected'):
#             return 'social_media_with_watermark'

#         if compression_result and compression_result.get('compression_detected'):
#             return 'social_media_compressed'

#         return 'unknown'

#     def get_platform_details(self, platform):
#         details = {
#             'whatsapp': {'name': 'WhatsApp', 'icon': '📱', 'description': 'Metadata stripped during compression', 'confidence': 'HIGH'},
#             'instagram': {'name': 'Instagram', 'icon': '📸', 'description': 'EXIF stripped, square/portrait crop', 'confidence': 'HIGH'},
#             'facebook': {'name': 'Facebook', 'icon': '📘', 'description': 'EXIF stripped, specific compression', 'confidence': 'HIGH'},
#             'screenshot': {'name': 'Screenshot', 'icon': '🖥️', 'description': 'No metadata expected', 'confidence': 'MEDIUM'},
#             'original_camera': {'name': 'Original Camera', 'icon': '📷', 'description': 'Full metadata preserved', 'confidence': 'HIGH'},
#             'social_media_detected': {'name': 'Social Media (FFT)', 'icon': '📱', 'description': 'Detected via frequency analysis', 'confidence': 'HIGH'},
#             'social_media_with_watermark': {'name': 'Social Media (Watermark)', 'icon': '📱', 'description': 'Sub-pixel watermark detected', 'confidence': 'HIGH'},
#             'social_media_compressed': {'name': 'Social Media (Compression)', 'icon': '📱', 'description': 'Compression artifacts detected', 'confidence': 'HIGH'},
#             'unknown': {'name': 'Unknown', 'icon': '❓', 'description': 'Could not determine platform', 'confidence': 'LOW'}
#         }
#         return details.get(platform, details['unknown'])

#     def extract_date_from_filename(self, filename):
#         patterns = [
#             r'IMG-?(\d{8})-WA\d+',
#             r'VID-?(\d{8})-WA\d+',
#             r'IMG_(\d{8})_\d+',
#         ]
#         for pattern in patterns:
#             match = re.search(pattern, filename, re.IGNORECASE)
#             if match:
#                 try:
#                     dt = datetime.strptime(match.group(1), "%Y%m%d")
#                     return dt.strftime("%Y:%m:%d 12:00:00")
#                 except:
#                     continue
#         return None

#     def get_custom_place_name(self, lat, lon):
#         lat_rounded = round(lat, 4)
#         lon_rounded = round(lon, 4)
        
#         place_mappings = {
#             (19.0698, 72.8882): "Sable Nagar, Kurla, Mumbai, Maharashtra, India",
#             (19.0697, 72.8882): "Sable Nagar, Kurla, Mumbai, Maharashtra, India",
#         }
        
#         for (mapped_lat, mapped_lon), place_name in place_mappings.items():
#             if abs(lat - mapped_lat) < 0.001 and abs(lon - mapped_lon) < 0.001:
#                 return place_name
        
#         return None

#     def reverse_geocode(self, lat, lon):
#         custom_place = self.get_custom_place_name(lat, lon)
#         if custom_place:
#             return custom_place
        
#         try:
#             url = f"https://nominatim.openstreetmap.org/reverse?lat={lat}&lon={lon}&format=json&zoom=18&addressdetails=1"
#             headers = {'User-Agent': 'MetaLens-Forensic/1.0'}
#             response = requests.get(url, headers=headers, timeout=10)
            
#             if response.status_code == 200:
#                 data = response.json()
#                 if data and 'display_name' in data:
#                     return data['display_name']
#                 elif data and 'address' in data:
#                     addr = data['address']
#                     parts = []
#                     if 'suburb' in addr: parts.append(addr['suburb'])
#                     if 'city' in addr: parts.append(addr['city'])
#                     if 'town' in addr: parts.append(addr['town'])
#                     if 'state' in addr: parts.append(addr['state'])
#                     if 'country' in addr: parts.append(addr['country'])
#                     if parts:
#                         return ', '.join(parts)
#             return None
#         except Exception as e:
#             print(f"Reverse geocode error: {e}")
#             return None

#     def analyze_pixels(self, file_path):
#         try:
#             img = Image.open(file_path)
#             width, height = img.size
#             if img.mode != 'L':
#                 img_gray = img.convert('L')
#             else:
#                 img_gray = img
#             hist = img_gray.histogram()
#             total = sum(hist)
#             entropy = 0
#             for count in hist:
#                 if count > 0:
#                     p = count / total
#                     entropy -= p * math.log2(p)
#             return {
#                 'width': width,
#                 'height': height,
#                 'aspect_ratio': round(width / height, 2) if height > 0 else 0,
#                 'is_square': width == height,
#                 'entropy': round(entropy, 2),
#                 'is_compressed': width * height < 2000000,
#                 'megapixels': round((width * height) / 1000000, 1)
#             }
#         except Exception as e:
#             return {'error': str(e)}

#     # ================================================================
#     #  AI ANALYSIS — Prompt updated to avoid hallucinating locations
#     # ================================================================
#     def analyze_with_ai(self, file_path):
#         try:
#             with open(file_path, 'rb') as f:
#                 img_data = base64.b64encode(f.read()).decode('utf-8')
#             prompt = """You are a forensic image analyst. Describe ONLY what you can clearly see:
# 1. What objects, people, or scenes are visible
# 2. Time of day (day/night/indoor/outdoor)
# 3. Any text, signs, or logos visible
# 4. Overall image quality

# DO NOT guess the geographic location — you do not have reliable geographic knowledge.
# Be concise and factual. Only describe what is clearly visible."""
#             payload = {
#                 "model": "moondream",
#                 "prompt": prompt,
#                 "images": [img_data],
#                 "stream": False,
#                 "options": {"num_predict": 100}
#             }
#             response = requests.post(self.ollama, json=payload, timeout=60)
#             if response.status_code == 200:
#                 result = response.json()
#                 return {'success': True, 'analysis': result.get('response', 'No analysis available')}
#             return {'success': False, 'error': f'HTTP {response.status_code}'}
#         except Exception as e:
#             return {'success': False, 'error': str(e)}

#     # ================================================================
#     #  FIXED: STRIP METADATA - Uses ExifTool properly
#     # ================================================================
#     def strip_metadata(self, file_path):
#         try:
#             if not os.path.exists(file_path):
#                 return {'success': False, 'error': f'File not found: {file_path}'}
            
#             filename = os.path.basename(file_path)
#             name, ext = os.path.splitext(filename)
#             output_path = os.path.join(app.config['STRIPPED_FOLDER'], f"{name}_stripped{ext}")
            
#             # Delete existing output file
#             if os.path.exists(output_path):
#                 try:
#                     os.remove(output_path)
#                 except:
#                     pass
            
#             # Build ExifTool command
#             cmd = [
#                 self.exiftool,
#                 '-all=',           # Remove ALL metadata
#                 '-overwrite_original',
#                 '-o', output_path,
#                 file_path
#             ]
            
#             print(f"🔧 Running: {' '.join(cmd)}")
            
#             result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
            
#             if result.returncode == 0 and os.path.exists(output_path) and os.path.getsize(output_path) > 0:
#                 return {
#                     'success': True,
#                     'output_path': output_path,
#                     'original_size': os.path.getsize(file_path),
#                     'stripped_size': os.path.getsize(output_path)
#                 }
#             else:
#                 error_msg = result.stderr if result.stderr else 'Unknown error'
#                 return {'success': False, 'error': error_msg}
                
#         except subprocess.TimeoutExpired:
#             return {'success': False, 'error': 'ExifTool timeout (30s)'}
#         except Exception as e:
#             return {'success': False, 'error': str(e)}

#     def generate_custody(self, file_path, filename, exif_data, platform):
#         custody = []
        
#         date_str = None
#         if 'ExifIFD:DateTimeOriginal' in exif_data and exif_data['ExifIFD:DateTimeOriginal']:
#             date_str = exif_data['ExifIFD:DateTimeOriginal']
#         elif 'DateTimeOriginal' in exif_data and exif_data['DateTimeOriginal']:
#             date_str = exif_data['DateTimeOriginal']
        
#         if date_str:
#             device = ''
#             if 'IFD0:Make' in exif_data and exif_data['IFD0:Make']:
#                 device += exif_data['IFD0:Make'] + ' '
#             if 'IFD0:Model' in exif_data and exif_data['IFD0:Model']:
#                 device += exif_data['IFD0:Model']
#             if not device:
#                 device = 'Unknown'
            
#             custody.append({
#                 'step': 1,
#                 'event': '📸 Photo Captured',
#                 'details': f"Original capture time: {date_str}",
#                 'device': device
#             })
#         else:
#             custody.append({
#                 'step': 1,
#                 'event': '📸 Photo Captured',
#                 'details': 'Original capture time: UNKNOWN (metadata stripped)',
#                 'device': 'Unknown'
#             })

#         platform_names = {
#             'whatsapp': 'WhatsApp', 'instagram': 'Instagram', 'facebook': 'Facebook',
#             'screenshot': 'Screenshot', 'original_camera': 'Direct from Camera',
#             'social_media_detected': 'Social Media', 'social_media_with_watermark': 'Social Media',
#             'social_media_compressed': 'Social Media', 'unknown': 'Unknown Platform'
#         }
#         platform_name = platform_names.get(platform, 'Unknown Platform')
#         custody.append({
#             'step': 2,
#             'event': f'📱 Shared on {platform_name}',
#             'details': f'Image was processed by {platform_name}',
#             'device': platform_name
#         })
#         custody.append({
#             'step': 3,
#             'event': '💻 Downloaded to Device',
#             'details': f"File saved as: {filename}",
#             'device': 'PC'
#         })
#         custody.append({
#             'step': 4,
#             'event': '🔍 Analyzed by MetaLens',
#             'details': f"Analysis completed: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}",
#             'device': 'MetaLens v2.0'
#         })
#         return custody

#     def generate_report(self, file_path, filename):
#         exif_data = self.extract_exif(file_path)
        
#         print("=" * 60)
#         print(f"FILE: {filename}")
#         if exif_data:
#             print("✅ EXIF DATA FOUND!")
#             if 'IFD0:Make' in exif_data:
#                 print(f"  Make: {exif_data['IFD0:Make']}")
#             if 'IFD0:Model' in exif_data:
#                 print(f"  Model: {exif_data['IFD0:Model']}")
#             if 'ExifIFD:DateTimeOriginal' in exif_data:
#                 print(f"  DateTimeOriginal: {exif_data['ExifIFD:DateTimeOriginal']}")
#         else:
#             print("❌ NO EXIF DATA FOUND!")
#         print("=" * 60)
        
#         lat, lon = self.extract_gps_from_exif(exif_data)
        
#         address = None
#         if lat and lon:
#             address = self.reverse_geocode(lat, lon)
        
#         timestamp = self.extract_timestamp(exif_data)
        
#         try:
#             file_stat = os.stat(file_path)
#             filesystem_date = datetime.fromtimestamp(file_stat.st_mtime).strftime('%Y:%m:%d %H:%M:%S')
#         except:
#             filesystem_date = None
        
#         fft_result = self.analyze_fft(file_path)
#         subpixel_result = self.detect_subpixel_pattern(file_path)
#         compression_result = self.detect_compression_artifacts(file_path)
#         ela_result = self.error_level_analysis(file_path)
#         noise_result = self.analyze_noise_consistency(file_path)
        
#         platform = self.detect_platform(filename, exif_data, fft_result, subpixel_result, compression_result)
#         platform_details = self.get_platform_details(platform)
        
#         has_metadata = bool(exif_data and ('IFD0:Make' in exif_data or 'IFD0:Model' in exif_data))
        
#         reconstructed_date = self.extract_date_from_filename(filename)
        
#         timestamp['reconstructed'] = reconstructed_date
#         timestamp['filesystem'] = filesystem_date
        
#         report = {
#             'file_name': filename,
#             'analysis_time': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
#             'exif': exif_data,
#             'gps': {'lat': lat, 'lon': lon, 'address': address} if lat and lon else None,
#             'timestamp': timestamp,
#             'platform': platform,
#             'platform_details': platform_details,
#             'pixel': self.analyze_pixels(file_path),
#             'ai': self.analyze_with_ai(file_path),
#             'custody': self.generate_custody(file_path, filename, exif_data, platform),
#             'reconstructed': {
#                 'platform': platform,
#                 'platform_name': platform_details['name'],
#                 'platform_icon': platform_details['icon'],
#                 'has_metadata': has_metadata,
#                 'metadata_status': 'PRESENT' if has_metadata else 'STRIPPED',
#                 'reconstructed_date': reconstructed_date,
#                 'gps_found': bool(lat and lon),
#                 'warning': None if has_metadata else '⚠️ Metadata was stripped by platform compression'
#             }
#         }
        
#         verdict = self.generate_verdict(report)
#         report['verdict'] = verdict
        
#         return report

#     def generate_verdict(self, report):
#         recon = report.get('reconstructed', {})
#         exif = report.get('exif', {})
#         gps = report.get('gps', None)
#         timestamp = report.get('timestamp', {})
#         platform = recon.get('platform', 'unknown')
#         has_metadata = False
#         gps_found = False
        
#         if 'IFD0:Make' in exif and exif['IFD0:Make']:
#             has_metadata = True
#         if 'IFD0:Model' in exif and exif['IFD0:Model']:
#             has_metadata = True
#         if 'ExifIFD:DateTimeOriginal' in exif and exif['ExifIFD:DateTimeOriginal']:
#             has_metadata = True
        
#         if 'GPS:GPSLatitude' in exif and 'GPS:GPSLongitude' in exif:
#             gps_found = True
        
#         verdict = {
#             'authenticity': 'UNKNOWN',
#             'tampering_detected': False,
#             'platform_confidence': 'LOW',
#             'recommendations': [],
#             'score': 0,
#             'evidence': []
#         }
        
#         score = 0
        
#         if has_metadata:
#             score += 30
#             device = exif.get('IFD0:Make', '') + ' ' + exif.get('IFD0:Model', '')
#             verdict['evidence'].append(f"📱 Device: {device}")
#             verdict['authenticity'] = 'AUTHENTIC'
#             verdict['tampering_detected'] = False
        
#         if gps_found:
#             score += 30
#             lat = exif.get('GPS:GPSLatitude', '')
#             lon = exif.get('GPS:GPSLongitude', '')
#             address = report.get('gps', {}).get('address', '')
#             if address:
#                 verdict['evidence'].append(f"📍 Location: {address}")
#                 verdict['evidence'].append(f"   Coordinates: {lat}, {lon}")
#             else:
#                 verdict['evidence'].append(f"📍 GPS: {lat}, {lon}")
        
#         if timestamp.get('original'):
#             score += 20
#             verdict['evidence'].append(f"🕐 Original Date: {timestamp['original']}")
        
#         if platform == 'original_camera':
#             score += 20
#         elif platform in ['whatsapp', 'instagram', 'facebook', 'social_media_detected', 'social_media_with_watermark', 'social_media_compressed']:
#             verdict['tampering_detected'] = True
#             if not has_metadata:
#                 verdict['authenticity'] = 'TAMPERED'
#                 score += 10
        
#         if report.get('ai', {}).get('success'):
#             score += 10
#             verdict['evidence'].append('🤖 AI analysis available')
        
#         verdict['score'] = min(score, 100)
        
#         if verdict['score'] >= 80:
#             verdict['authenticity'] = 'AUTHENTIC'
#             verdict['recommendations'].append('✅ Image appears AUTHENTIC and can be used as evidence')
#         elif verdict['score'] >= 50:
#             verdict['authenticity'] = 'PARTIAL'
#             verdict['recommendations'].append('⚠️ Image shows signs of tampering - use with caution')
#         else:
#             verdict['authenticity'] = 'TAMPERED'
#             verdict['recommendations'].append('❌ Image CANNOT be used as forensic evidence')
        
#         return verdict


# # ================================================================
# #  FLASK ROUTES
# # ================================================================

# @app.route('/api/analyze', methods=['POST'])
# def analyze():
#     if 'file' not in request.files:
#         return jsonify({'error': 'No file uploaded'}), 400

#     file = request.files['file']
#     if file.filename == '':
#         return jsonify({'error': 'No file selected'}), 400

#     filename = file.filename
#     file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    
#     with open(file_path, 'wb') as f:
#         f.write(file.read())
    
#     print(f"\n📁 SAVED: {file_path} ({os.path.getsize(file_path)} bytes)")

#     try:
#         lens = MetaLens()
#         report = lens.generate_report(file_path, filename)
        
#         # ============================================================
#         #  ✅ NEW: Save report to MongoDB
#         # ============================================================
#         try:
#             report_id = database.save_report(report)
#             print(f"💾 Saved to MongoDB: {report_id}")
#             report['_id'] = report_id
#         except Exception as db_err:
#             print(f"⚠️ Failed to save to DB: {db_err}")
#             # Don't fail the request — just log the error
        
#         return jsonify({
#             'report': report,
#             'file_path': file_path
#         })
#     except Exception as e:
#         if os.path.exists(file_path):
#              os.remove(file_path)
#         import traceback
#         traceback.print_exc()
#         return jsonify({'error': str(e)}), 500


# # ================================================================
# #  REPORTS — list / fetch / delete (MongoDB backed)
# # ================================================================

# @app.route('/api/reports', methods=['GET'])
# def list_reports():
#     """Return the latest saved reports."""
#     try:
#         reports = database.get_all_reports(limit=100)
#         return jsonify({
#             'count': len(reports),
#             'reports': reports
#         })
#     except Exception as e:
#         import traceback
#         traceback.print_exc()
#         return jsonify({'error': str(e)}), 500


# @app.route('/api/reports/<report_id>', methods=['GET'])
# def get_report(report_id):
#     """Return a single report by id."""
#     report = database.get_report_by_id(report_id)
#     if not report:
#         return jsonify({'error': 'Report not found'}), 404
#     return jsonify({'report': report})


# @app.route('/api/reports/<report_id>', methods=['DELETE'])
# def remove_report(report_id):
#     """Delete a report."""
#     ok = database.delete_report(report_id)
#     if not ok:
#         return jsonify({'error': 'Report not found'}), 404
#     return jsonify({'success': True, 'deleted_id': report_id})


# @app.route('/api/stats', methods=['GET'])
# def stats():
#     """Quick stats about the DB."""
#     return jsonify({
#         'total_reports': database.reports_count()
#     })


# @app.route('/api/strip', methods=['POST'])
# def strip():
#     if 'file' not in request.files:
#         return jsonify({'error': 'No file uploaded'}), 400
    
#     file = request.files['file']
#     if file.filename == '':
#         return jsonify({'error': 'No file selected'}), 400
    
#     filename = file.filename
#     file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    
#     with open(file_path, 'wb') as f:
#         f.write(file.read())
    
#     print(f"📁 STRIP FILE: {file_path} ({os.path.getsize(file_path)} bytes)")
    
#     try:
#         lens = MetaLens()
#         result = lens.strip_metadata(file_path)
        
#         if result['success']:
#             stripped_filename = os.path.basename(result['output_path'])
#             print(f"✅ STRIP SUCCESS: {stripped_filename}")
            
#             return jsonify({
#                 'success': True,
#                 'original_filename': filename,
#                 'stripped_filename': stripped_filename,
#                 'original_size': result['original_size'],
#                 'stripped_size': result['stripped_size'],
#                 'download_url': f"/api/download/{stripped_filename}"
#             })
#         else:
#             print(f"❌ STRIP FAILED: {result.get('error')}")
#             return jsonify({'error': result.get('error', 'Failed to strip metadata')}), 500
#     except Exception as e:
#         print(f"❌ STRIP EXCEPTION: {str(e)}")
#         return jsonify({'error': str(e)}), 500
#     finally:
#         if os.path.exists(file_path):
#             try:
#                  os.remove(file_path)
#             except:
#                 pass


# @app.route('/api/download/<filename>')
# def download(filename):
#     file_path = os.path.join(app.config['STRIPPED_FOLDER'], filename)
#     if not os.path.exists(file_path):
#         return jsonify({'error': 'File not found'}), 404
#     return send_file(file_path, as_attachment=True)


# if __name__ == '__main__':
#     print("""
#     ╔═══════════════════════════════════════════════════════════════╗
#     ║              🔍 MetaLens - Forensic Intelligence            ║
#     ║                                                               ║
#     ║  Server: http://localhost:5000                               ║
#     ║  MongoDB: connected ✅                                       ║
#     ║                                                               ║
#     ║  Requirements:                                               ║
#     ║  ✅ ExifTool: C:\\ExifTool\\exiftool.exe                      ║
#     ║  ✅ Ollama running: ollama serve                             ║
#     ║  ✅ Model: ollama pull moondream                             ║
#     ║  ✅ MongoDB running on localhost:27017                       ║
#     ╚═══════════════════════════════════════════════════════════════╝
#     """)
#     app.run(debug=True, host='0.0.0.0', port=5000)



















import os
import re
import json
import subprocess
import base64
import math
import numpy as np
from datetime import datetime
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from PIL import Image, ImageChops, ImageStat
import requests

# ================================================================
#  MongoDB + Auth
# ================================================================
import database
import auth

app = Flask(__name__)
CORS(app)

app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['STRIPPED_FOLDER'] = 'stripped'
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024

os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.makedirs(app.config['STRIPPED_FOLDER'], exist_ok=True)

EXIFTOOL_PATH = r"C:\ExifTool\exiftool.exe"
OLLAMA_URL = "http://localhost:11434/api/generate"


class MetaLens:
    def __init__(self):
        self.exiftool = EXIFTOOL_PATH
        self.ollama = OLLAMA_URL

    def flatten_array(self, val):
        if val is None:
            return 'N/A'
        if isinstance(val, list):
            flat = []
            for item in val:
                if isinstance(item, list):
                    flat.extend(self.flatten_array(item).split())
                else:
                    flat.append(str(item))
            return ' '.join(flat)
        return str(val).strip()

    def dms_to_decimal(self, degrees, minutes, seconds, direction):
        try:
            decimal = float(degrees) + (float(minutes) / 60.0) + (float(seconds) / 3600.0)
            if direction in ['S', 'W', 'South', 'West']:
                decimal = -decimal
            return round(decimal, 6)
        except:
            return None

    def extract_exif(self, file_path):
        try:
            cmd = [self.exiftool, '-j', '-a', '-G1', '-All', file_path]
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
            if result.returncode == 0 and result.stdout:
                data = json.loads(result.stdout)
                if data and len(data) > 0:
                    return data[0]
            return {}
        except Exception as e:
            print(f"ExifTool Error: {e}")
            return {}

    def extract_xmp_data(self, exif_data):
        xmp_data = {}
        if 'XMP' in exif_data:
            xmp = exif_data['XMP']
            if 'GPSLatitude' in xmp: xmp_data['gps_lat'] = self.flatten_array(xmp['GPSLatitude'])
            if 'GPSLongitude' in xmp: xmp_data['gps_lon'] = self.flatten_array(xmp['GPSLongitude'])
            if 'CreateDate' in xmp: xmp_data['date'] = self.flatten_array(xmp['CreateDate'])
            if 'Make' in xmp: xmp_data['make'] = self.flatten_array(xmp['Make'])
            if 'Model' in xmp: xmp_data['model'] = self.flatten_array(xmp['Model'])
        return xmp_data

    def extract_gps_from_exif(self, exif_data):
        lat = None
        lon = None
        xmp_data = self.extract_xmp_data(exif_data)
        if 'gps_lat' in xmp_data and 'gps_lon' in xmp_data:
            try:
                return float(xmp_data['gps_lat']), float(xmp_data['gps_lon'])
            except:
                pass
        if 'GPS:GPSLatitude' in exif_data and 'GPS:GPSLongitude' in exif_data:
            try:
                lat_str = exif_data['GPS:GPSLatitude']
                lon_str = exif_data['GPS:GPSLongitude']
                lat_match = re.search(r'([\d.]+).*?([\d.]+).*?([\d.]+)', lat_str)
                lon_match = re.search(r'([\d.]+).*?([\d.]+).*?([\d.]+)', lon_str)
                if lat_match and lon_match:
                    lat = float(lat_match.group(1)) + float(lat_match.group(2))/60 + float(lat_match.group(3))/3600
                    lon = float(lon_match.group(1)) + float(lon_match.group(2))/60 + float(lon_match.group(3))/3600
                    if 'S' in lat_str: lat = -lat
                    if 'W' in lon_str: lon = -lon
                    return lat, lon
            except:
                pass
        if 'GPSLatitude' in exif_data and 'GPSLongitude' in exif_data:
            try:
                lat_raw = self.flatten_array(exif_data['GPSLatitude'])
                lon_raw = self.flatten_array(exif_data['GPSLongitude'])
                lat_parts = lat_raw.split()
                lon_parts = lon_raw.split()
                if len(lat_parts) == 3 and len(lon_parts) == 3:
                    lat_ref = exif_data.get('GPSLatitudeRef', 'N')
                    lon_ref = exif_data.get('GPSLongitudeRef', 'E')
                    lat = self.dms_to_decimal(lat_parts[0], lat_parts[1], lat_parts[2], lat_ref)
                    lon = self.dms_to_decimal(lon_parts[0], lon_parts[1], lon_parts[2], lon_ref)
                else:
                    lat = float(lat_raw); lon = float(lon_raw)
                return lat, lon
            except:
                pass
        if 'GPSPosition' in exif_data:
            try:
                val = exif_data['GPSPosition']
                match = re.search(r'([\d.]+).*?([NS]).*?([\d.]+).*?([EW])', val)
                if match:
                    lat = float(match.group(1)); lon = float(match.group(3))
                    if match.group(2) == 'S': lat = -lat
                    if match.group(4) == 'W': lon = -lon
                    return lat, lon
            except:
                pass
        return None, None

    def extract_timestamp(self, exif_data):
        timestamp = {'original': None, 'compression': None, 'human': None}
        if 'ExifIFD:DateTimeOriginal' in exif_data:
            timestamp['original'] = self.flatten_array(exif_data['ExifIFD:DateTimeOriginal'])
        elif 'DateTimeOriginal' in exif_data:
            timestamp['original'] = self.flatten_array(exif_data['DateTimeOriginal'])
        elif 'CreateDate' in exif_data:
            timestamp['original'] = self.flatten_array(exif_data['CreateDate'])
        if 'System:FileCreateDate' in exif_data:
            timestamp['compression'] = self.flatten_array(exif_data['System:FileCreateDate'])
        elif 'ModifyDate' in exif_data:
            timestamp['compression'] = self.flatten_array(exif_data['ModifyDate'])
        return timestamp

    def analyze_fft(self, file_path):
        try:
            img = Image.open(file_path).convert('L')
            img_array = np.array(img)
            f_transform = np.fft.fft2(img_array)
            f_shift = np.fft.fftshift(f_transform)
            magnitude_spectrum = np.abs(f_shift)
            rows, cols = img_array.shape
            crow, ccol = rows // 2, cols // 2
            center_region = magnitude_spectrum[crow-10:crow+10, ccol-10:ccol+10]
            center_mean = np.mean(center_region)
            overall_mean = np.mean(magnitude_spectrum)
            if center_mean > overall_mean * 1.5:
                return {'platform_likely': 'Social Media', 'confidence': 'HIGH'}
            else:
                return {'platform_likely': 'Original Camera', 'confidence': 'MEDIUM'}
        except Exception as e:
            return {'error': str(e)}

    def detect_subpixel_pattern(self, file_path):
        try:
            img = Image.open(file_path).convert('RGB')
            img_array = np.array(img)
            height, width = img_array.shape[:2]
            pattern_score = 0
            total_samples = 0
            for y in range(4, min(height, 200), 4):
                for x in range(4, min(width, 200), 4):
                    if y+1 < height and x+1 < width:
                        diff = abs(int(img_array[y,x,0]) - int(img_array[y+1,x+1,0]))
                        if diff < 10:
                            pattern_score += 1
                        total_samples += 1
            if total_samples > 0:
                pattern_ratio = pattern_score / total_samples
                if pattern_ratio > 0.3:
                    return {'watermark_detected': True, 'platform': 'Instagram/Facebook'}
                elif pattern_ratio > 0.15:
                    return {'watermark_detected': True, 'platform': 'Social Media (Generic)'}
            return {'watermark_detected': False}
        except Exception as e:
            return {'error': str(e)}

    def error_level_analysis(self, file_path):
        try:
            img = Image.open(file_path)
            temp_path = file_path + '_temp.jpg'
            img.save(temp_path, 'JPEG', quality=90)
            compressed = Image.open(temp_path)
            diff = ImageChops.difference(img.convert('RGB'), compressed.convert('RGB'))
            stat = ImageStat.Stat(diff)
            mean_diff = sum(stat.mean) / 3
            os.remove(temp_path)
            if mean_diff > 5:
                return {'manipulation_detected': True, 'confidence': 'HIGH'}
            elif mean_diff > 2:
                return {'manipulation_detected': True, 'confidence': 'MEDIUM'}
            else:
                return {'manipulation_detected': False, 'confidence': 'HIGH'}
        except Exception as e:
            return {'error': str(e)}

    def analyze_noise_consistency(self, file_path):
        try:
            img = Image.open(file_path).convert('L')
            img_array = np.array(img)
            height, width = img_array.shape
            noise_variance = []
            block_size = 50
            for y in range(0, height - block_size, block_size):
                for x in range(0, width - block_size, block_size):
                    block = img_array[y:y+block_size, x:x+block_size]
                    noise_variance.append(np.var(block))
            if noise_variance:
                variance_std = np.std(noise_variance)
                variance_mean = np.mean(noise_variance)
                if variance_std / variance_mean > 0.5:
                    return {'inconsistent_noise': True}
            return {'inconsistent_noise': False}
        except Exception as e:
            return {'error': str(e)}

    def detect_compression_artifacts(self, file_path):
        try:
            img = Image.open(file_path).convert('RGB')
            img_array = np.array(img)
            height, width = img_array.shape[:2]
            block_artifacts = 0
            total_blocks = 0
            for y in range(0, min(height, 400), 8):
                for x in range(0, min(width, 400), 8):
                    if y+8 < height and x+8 < width:
                        block = img_array[y:y+8, x:x+8, :]
                        diff = np.abs(block[0,0,:] - block[7,7,:])
                        if np.mean(diff) < 10:
                            block_artifacts += 1
                        total_blocks += 1
            if total_blocks > 0:
                artifact_ratio = block_artifacts / total_blocks
                if artifact_ratio > 0.3:
                    return {'compression_detected': True, 'confidence': 'HIGH'}
                elif artifact_ratio > 0.15:
                    return {'compression_detected': True, 'confidence': 'MEDIUM'}
            return {'compression_detected': False}
        except Exception as e:
            return {'error': str(e)}

    def detect_platform(self, filename, exif_data, fft_result=None, subpixel_result=None, compression_result=None):
        patterns = {
            'whatsapp': r'IMG-?\d{8}-WA\d+|VID-?\d{8}-WA\d+',
            'instagram': r'instagram|ig_|_ig_|_\d+_\d+_|IG_',
            'facebook': r'fb_|facebook|FB_',
            'screenshot': r'screenshot|Screenshot|Screen Shot|Screenshot_',
        }
        for platform, pattern in patterns.items():
            if re.search(pattern, filename, re.IGNORECASE):
                return platform
        if 'IFD0:Make' in exif_data and exif_data['IFD0:Make']:
            return 'original_camera'
        if 'IFD0:Model' in exif_data and exif_data['IFD0:Model']:
            return 'original_camera'
        if fft_result and fft_result.get('platform_likely') == 'Social Media':
            return 'social_media_detected'
        if subpixel_result and subpixel_result.get('watermark_detected'):
            return 'social_media_with_watermark'
        if compression_result and compression_result.get('compression_detected'):
            return 'social_media_compressed'
        return 'unknown'

    def get_platform_details(self, platform):
        details = {
            'whatsapp': {'name': 'WhatsApp', 'icon': '📱', 'description': 'Metadata stripped during compression', 'confidence': 'HIGH'},
            'instagram': {'name': 'Instagram', 'icon': '📸', 'description': 'EXIF stripped, square/portrait crop', 'confidence': 'HIGH'},
            'facebook': {'name': 'Facebook', 'icon': '📘', 'description': 'EXIF stripped, specific compression', 'confidence': 'HIGH'},
            'screenshot': {'name': 'Screenshot', 'icon': '🖥️', 'description': 'No metadata expected', 'confidence': 'MEDIUM'},
            'original_camera': {'name': 'Original Camera', 'icon': '📷', 'description': 'Full metadata preserved', 'confidence': 'HIGH'},
            'social_media_detected': {'name': 'Social Media (FFT)', 'icon': '📱', 'description': 'Detected via frequency analysis', 'confidence': 'HIGH'},
            'social_media_with_watermark': {'name': 'Social Media (Watermark)', 'icon': '📱', 'description': 'Sub-pixel watermark detected', 'confidence': 'HIGH'},
            'social_media_compressed': {'name': 'Social Media (Compression)', 'icon': '📱', 'description': 'Compression artifacts detected', 'confidence': 'HIGH'},
            'unknown': {'name': 'Unknown', 'icon': '❓', 'description': 'Could not determine platform', 'confidence': 'LOW'}
        }
        return details.get(platform, details['unknown'])

    def extract_date_from_filename(self, filename):
        patterns = [r'IMG-?(\d{8})-WA\d+', r'VID-?(\d{8})-WA\d+', r'IMG_(\d{8})_\d+']
        for pattern in patterns:
            match = re.search(pattern, filename, re.IGNORECASE)
            if match:
                try:
                    dt = datetime.strptime(match.group(1), "%Y%m%d")
                    return dt.strftime("%Y:%m:%d 12:00:00")
                except:
                    continue
        return None

    def get_custom_place_name(self, lat, lon):
        place_mappings = {
            (19.0698, 72.8882): "Sable Nagar, Kurla, Mumbai, Maharashtra, India",
            (19.0697, 72.8882): "Sable Nagar, Kurla, Mumbai, Maharashtra, India",
        }
        for (mapped_lat, mapped_lon), place_name in place_mappings.items():
            if abs(lat - mapped_lat) < 0.001 and abs(lon - mapped_lon) < 0.001:
                return place_name
        return None

    def reverse_geocode(self, lat, lon):
        custom_place = self.get_custom_place_name(lat, lon)
        if custom_place:
            return custom_place
        try:
            url = f"https://nominatim.openstreetmap.org/reverse?lat={lat}&lon={lon}&format=json&zoom=18&addressdetails=1"
            headers = {'User-Agent': 'MetaLens-Forensic/1.0'}
            response = requests.get(url, headers=headers, timeout=10)
            if response.status_code == 200:
                data = response.json()
                if data and 'display_name' in data:
                    return data['display_name']
                elif data and 'address' in data:
                    addr = data['address']
                    parts = []
                    if 'suburb' in addr: parts.append(addr['suburb'])
                    if 'city' in addr: parts.append(addr['city'])
                    if 'town' in addr: parts.append(addr['town'])
                    if 'state' in addr: parts.append(addr['state'])
                    if 'country' in addr: parts.append(addr['country'])
                    if parts:
                        return ', '.join(parts)
            return None
        except Exception as e:
            print(f"Reverse geocode error: {e}")
            return None

    def analyze_pixels(self, file_path):
        try:
            img = Image.open(file_path)
            width, height = img.size
            img_gray = img.convert('L') if img.mode != 'L' else img
            hist = img_gray.histogram()
            total = sum(hist)
            entropy = 0
            for count in hist:
                if count > 0:
                    p = count / total
                    entropy -= p * math.log2(p)
            return {
                'width': width, 'height': height,
                'aspect_ratio': round(width / height, 2) if height > 0 else 0,
                'is_square': width == height,
                'entropy': round(entropy, 2),
                'is_compressed': width * height < 2000000,
                'megapixels': round((width * height) / 1000000, 1)
            }
        except Exception as e:
            return {'error': str(e)}

    def analyze_with_ai(self, file_path):
        try:
            with open(file_path, 'rb') as f:
                img_data = base64.b64encode(f.read()).decode('utf-8')
            prompt = """You are a forensic image analyst. Describe ONLY what you can clearly see:
1. What objects, people, or scenes are visible
2. Time of day (day/night/indoor/outdoor)
3. Any text, signs, or logos visible
4. Overall image quality

DO NOT guess the geographic location — you do not have reliable geographic knowledge.
Be concise and factual. Only describe what is clearly visible."""
            payload = {
                "model": "moondream", "prompt": prompt,
                "images": [img_data], "stream": False,
                "options": {"num_predict": 100}
            }
            response = requests.post(self.ollama, json=payload, timeout=60)
            if response.status_code == 200:
                result = response.json()
                return {'success': True, 'analysis': result.get('response', 'No analysis available')}
            return {'success': False, 'error': f'HTTP {response.status_code}'}
        except Exception as e:
            return {'success': False, 'error': str(e)}

    def strip_metadata(self, file_path):
        try:
            if not os.path.exists(file_path):
                return {'success': False, 'error': f'File not found: {file_path}'}
            filename = os.path.basename(file_path)
            name, ext = os.path.splitext(filename)
            output_path = os.path.join(app.config['STRIPPED_FOLDER'], f"{name}_stripped{ext}")
            if os.path.exists(output_path):
                try: os.remove(output_path)
                except: pass
            cmd = [self.exiftool, '-all=', '-overwrite_original', '-o', output_path, file_path]
            print(f"🔧 Running: {' '.join(cmd)}")
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
            if result.returncode == 0 and os.path.exists(output_path) and os.path.getsize(output_path) > 0:
                return {
                    'success': True, 'output_path': output_path,
                    'original_size': os.path.getsize(file_path),
                    'stripped_size': os.path.getsize(output_path)
                }
            else:
                return {'success': False, 'error': result.stderr or 'Unknown error'}
        except subprocess.TimeoutExpired:
            return {'success': False, 'error': 'ExifTool timeout (30s)'}
        except Exception as e:
            return {'success': False, 'error': str(e)}

    def generate_custody(self, file_path, filename, exif_data, platform):
        custody = []
        date_str = None
        if 'ExifIFD:DateTimeOriginal' in exif_data and exif_data['ExifIFD:DateTimeOriginal']:
            date_str = exif_data['ExifIFD:DateTimeOriginal']
        elif 'DateTimeOriginal' in exif_data and exif_data['DateTimeOriginal']:
            date_str = exif_data['DateTimeOriginal']
        if date_str:
            device = ''
            if 'IFD0:Make' in exif_data and exif_data['IFD0:Make']:
                device += exif_data['IFD0:Make'] + ' '
            if 'IFD0:Model' in exif_data and exif_data['IFD0:Model']:
                device += exif_data['IFD0:Model']
            if not device: device = 'Unknown'
            custody.append({'step': 1, 'event': '📸 Photo Captured', 'details': f"Original capture time: {date_str}", 'device': device})
        else:
            custody.append({'step': 1, 'event': '📸 Photo Captured', 'details': 'Original capture time: UNKNOWN (metadata stripped)', 'device': 'Unknown'})
        platform_names = {
            'whatsapp': 'WhatsApp', 'instagram': 'Instagram', 'facebook': 'Facebook',
            'screenshot': 'Screenshot', 'original_camera': 'Direct from Camera',
            'social_media_detected': 'Social Media', 'social_media_with_watermark': 'Social Media',
            'social_media_compressed': 'Social Media', 'unknown': 'Unknown Platform'
        }
        platform_name = platform_names.get(platform, 'Unknown Platform')
        custody.append({'step': 2, 'event': f'📱 Shared on {platform_name}', 'details': f'Image was processed by {platform_name}', 'device': platform_name})
        custody.append({'step': 3, 'event': '💻 Downloaded to Device', 'details': f"File saved as: {filename}", 'device': 'PC'})
        custody.append({'step': 4, 'event': '🔍 Analyzed by MetaLens', 'details': f"Analysis completed: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}", 'device': 'MetaLens v2.0'})
        return custody

    def generate_report(self, file_path, filename):
        exif_data = self.extract_exif(file_path)
        print("=" * 60)
        print(f"FILE: {filename}")
        if exif_data:
            print("✅ EXIF DATA FOUND!")
            if 'IFD0:Make' in exif_data: print(f"  Make: {exif_data['IFD0:Make']}")
            if 'IFD0:Model' in exif_data: print(f"  Model: {exif_data['IFD0:Model']}")
            if 'ExifIFD:DateTimeOriginal' in exif_data: print(f"  DateTimeOriginal: {exif_data['ExifIFD:DateTimeOriginal']}")
        else:
            print("❌ NO EXIF DATA FOUND!")
        print("=" * 60)
        lat, lon = self.extract_gps_from_exif(exif_data)
        address = None
        if lat and lon:
            address = self.reverse_geocode(lat, lon)
        timestamp = self.extract_timestamp(exif_data)
        try:
            file_stat = os.stat(file_path)
            filesystem_date = datetime.fromtimestamp(file_stat.st_mtime).strftime('%Y:%m:%d %H:%M:%S')
        except:
            filesystem_date = None
        fft_result = self.analyze_fft(file_path)
        subpixel_result = self.detect_subpixel_pattern(file_path)
        compression_result = self.detect_compression_artifacts(file_path)
        self.error_level_analysis(file_path)
        self.analyze_noise_consistency(file_path)
        platform = self.detect_platform(filename, exif_data, fft_result, subpixel_result, compression_result)
        platform_details = self.get_platform_details(platform)
        has_metadata = bool(exif_data and ('IFD0:Make' in exif_data or 'IFD0:Model' in exif_data))
        reconstructed_date = self.extract_date_from_filename(filename)
        timestamp['reconstructed'] = reconstructed_date
        timestamp['filesystem'] = filesystem_date
        report = {
            'file_name': filename,
            'analysis_time': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            'exif': exif_data,
            'gps': {'lat': lat, 'lon': lon, 'address': address} if lat and lon else None,
            'timestamp': timestamp,
            'platform': platform,
            'platform_details': platform_details,
            'pixel': self.analyze_pixels(file_path),
            'ai': self.analyze_with_ai(file_path),
            'custody': self.generate_custody(file_path, filename, exif_data, platform),
            'reconstructed': {
                'platform': platform,
                'platform_name': platform_details['name'],
                'platform_icon': platform_details['icon'],
                'has_metadata': has_metadata,
                'metadata_status': 'PRESENT' if has_metadata else 'STRIPPED',
                'reconstructed_date': reconstructed_date,
                'gps_found': bool(lat and lon),
                'warning': None if has_metadata else '⚠️ Metadata was stripped by platform compression'
            }
        }
        verdict = self.generate_verdict(report)
        report['verdict'] = verdict
        return report

    def generate_verdict(self, report):
        recon = report.get('reconstructed', {})
        exif = report.get('exif', {})
        timestamp = report.get('timestamp', {})
        platform = recon.get('platform', 'unknown')
        has_metadata = False
        gps_found = False
        if 'IFD0:Make' in exif and exif['IFD0:Make']: has_metadata = True
        if 'IFD0:Model' in exif and exif['IFD0:Model']: has_metadata = True
        if 'ExifIFD:DateTimeOriginal' in exif and exif['ExifIFD:DateTimeOriginal']: has_metadata = True
        if 'GPS:GPSLatitude' in exif and 'GPS:GPSLongitude' in exif: gps_found = True
        verdict = {'authenticity': 'UNKNOWN', 'tampering_detected': False, 'platform_confidence': 'LOW', 'recommendations': [], 'score': 0, 'evidence': []}
        score = 0
        if has_metadata:
            score += 30
            device = exif.get('IFD0:Make', '') + ' ' + exif.get('IFD0:Model', '')
            verdict['evidence'].append(f"📱 Device: {device}")
            verdict['authenticity'] = 'AUTHENTIC'
            verdict['tampering_detected'] = False
        if gps_found:
            score += 30
            lat = exif.get('GPS:GPSLatitude', '')
            lon = exif.get('GPS:GPSLongitude', '')
            address = report.get('gps', {}).get('address', '')
            if address:
                verdict['evidence'].append(f"📍 Location: {address}")
                verdict['evidence'].append(f"   Coordinates: {lat}, {lon}")
            else:
                verdict['evidence'].append(f"📍 GPS: {lat}, {lon}")
        if timestamp.get('original'):
            score += 20
            verdict['evidence'].append(f"🕐 Original Date: {timestamp['original']}")
        if platform == 'original_camera':
            score += 20
        elif platform in ['whatsapp', 'instagram', 'facebook', 'social_media_detected', 'social_media_with_watermark', 'social_media_compressed']:
            verdict['tampering_detected'] = True
            if not has_metadata:
                verdict['authenticity'] = 'TAMPERED'
                score += 10
        if report.get('ai', {}).get('success'):
            score += 10
            verdict['evidence'].append('🤖 AI analysis available')
        verdict['score'] = min(score, 100)
        if verdict['score'] >= 80:
            verdict['authenticity'] = 'AUTHENTIC'
            verdict['recommendations'].append('✅ Image appears AUTHENTIC and can be used as evidence')
        elif verdict['score'] >= 50:
            verdict['authenticity'] = 'PARTIAL'
            verdict['recommendations'].append('⚠️ Image shows signs of tampering - use with caution')
        else:
            verdict['authenticity'] = 'TAMPERED'
            verdict['recommendations'].append('❌ Image CANNOT be used as forensic evidence')
        return verdict


# ================================================================
#  AUTH ROUTES
# ================================================================

@app.route('/api/auth/signup', methods=['POST'])
def signup():
    data = request.get_json() or {}
    email = (data.get('email') or '').strip()
    password = data.get('password') or ''
    name = (data.get('name') or '').strip()

    # Validation
    if not email or not password or not name:
        return jsonify({'error': 'Name, email and password are required'}), 400
    if '@' not in email or '.' not in email:
        return jsonify({'error': 'Invalid email format'}), 400
    if len(password) < 8:
        return jsonify({'error': 'Password must be at least 8 characters'}), 400

    try:
        hashed = auth.hash_password(password)
        user = database.create_user(email, hashed, name)
        token = auth.create_token(user['id'], user['email'])
        print(f"✅ New user signed up: {email}")
        return jsonify({'success': True, 'user': user, 'token': token}), 201
    except ValueError as ve:
        return jsonify({'error': str(ve)}), 409
    except Exception as e:
        import traceback; traceback.print_exc()
        return jsonify({'error': str(e)}), 500


@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    email = (data.get('email') or '').strip().lower()
    password = data.get('password') or ''

    if not email or not password:
        return jsonify({'error': 'Email and password required'}), 400

    user_doc = database.get_user_by_email(email)
    if not user_doc:
        return jsonify({'error': 'Invalid email or password'}), 401

    if not auth.verify_password(password, user_doc.get('password_hash', '')):
        return jsonify({'error': 'Invalid email or password'}), 401

    user_id = str(user_doc['_id'])
    database.update_last_login(user_id)
    token = auth.create_token(user_id, user_doc['email'])

    public_user = database.get_user_by_id(user_id)
    print(f"✅ User logged in: {email}")
    return jsonify({'success': True, 'user': public_user, 'token': token})


@app.route('/api/auth/me', methods=['GET'])
@auth.require_auth
def me():
    user = database.get_user_by_id(request.user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    return jsonify({'user': user})


# ================================================================
#  ANALYZE — protected, saves with user_id
# ================================================================

@app.route('/api/analyze', methods=['POST'])
@auth.require_auth
def analyze():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    filename = file.filename
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    with open(file_path, 'wb') as f:
        f.write(file.read())
    print(f"\n📁 SAVED: {file_path} ({os.path.getsize(file_path)} bytes)")

    try:
        lens = MetaLens()
        report = lens.generate_report(file_path, filename)

        # Save with user_id
        try:
            report_id = database.save_report(report, user_id=request.user_id)
            print(f"💾 Saved to MongoDB: {report_id} (user: {request.user_email})")
            report['_id'] = report_id
        except Exception as db_err:
            print(f"⚠️ Failed to save to DB: {db_err}")

        return jsonify({'report': report, 'file_path': file_path})
    except Exception as e:
        if os.path.exists(file_path):
            os.remove(file_path)
        import traceback; traceback.print_exc()
        return jsonify({'error': str(e)}), 500


# ================================================================
#  REPORTS — protected, filtered by user
# ================================================================

@app.route('/api/reports', methods=['GET'])
@auth.require_auth
def list_reports():
    try:
        reports = database.get_all_reports(limit=100, user_id=request.user_id)
        return jsonify({'count': len(reports), 'reports': reports})
    except Exception as e:
        import traceback; traceback.print_exc()
        return jsonify({'error': str(e)}), 500


@app.route('/api/reports/<report_id>', methods=['GET'])
@auth.require_auth
def get_report(report_id):
    report = database.get_report_by_id(report_id, user_id=request.user_id)
    if not report:
        return jsonify({'error': 'Report not found'}), 404
    return jsonify({'report': report})


@app.route('/api/reports/<report_id>', methods=['DELETE'])
@auth.require_auth
def remove_report(report_id):
    ok = database.delete_report(report_id, user_id=request.user_id)
    if not ok:
        return jsonify({'error': 'Report not found'}), 404
    return jsonify({'success': True, 'deleted_id': report_id})


@app.route('/api/stats', methods=['GET'])
@auth.require_auth
def stats():
    return jsonify({'total_reports': database.reports_count(user_id=request.user_id)})


# ================================================================
#  STRIP — protected
# ================================================================

@app.route('/api/strip', methods=['POST'])
@auth.require_auth
def strip():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    filename = file.filename
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    with open(file_path, 'wb') as f:
        f.write(file.read())
    print(f"📁 STRIP FILE: {file_path} ({os.path.getsize(file_path)} bytes)")

    try:
        lens = MetaLens()
        result = lens.strip_metadata(file_path)
        if result['success']:
            stripped_filename = os.path.basename(result['output_path'])
            return jsonify({
                'success': True,
                'original_filename': filename,
                'stripped_filename': stripped_filename,
                'original_size': result['original_size'],
                'stripped_size': result['stripped_size'],
                'download_url': f"/api/download/{stripped_filename}"
            })
        else:
            return jsonify({'error': result.get('error', 'Failed to strip metadata')}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if os.path.exists(file_path):
            try: os.remove(file_path)
            except: pass


@app.route('/api/download/<filename>')
def download(filename):
    file_path = os.path.join(app.config['STRIPPED_FOLDER'], filename)
    if not os.path.exists(file_path):
        return jsonify({'error': 'File not found'}), 404
    return send_file(file_path, as_attachment=True)


# ================================================================
if __name__ == '__main__':
    print("""
    ╔═══════════════════════════════════════════════════════════════╗
    ║              🔍 MetaLens - Forensic Intelligence            ║
    ║                                                               ║
    ║  Server: http://localhost:5000                               ║
    ║  MongoDB: connected ✅                                       ║
    ║  Auth: enabled 🔐                                            ║
    ║                                                               ║
    ║  Requirements:                                               ║
    ║  ✅ ExifTool · Ollama · moondream · MongoDB                  ║
    ╚═══════════════════════════════════════════════════════════════╝
    """)
    app.run(debug=True, host='0.0.0.0', port=5000)