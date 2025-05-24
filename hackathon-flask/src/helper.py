from langchain_community.document_loaders import PyPDFLoader, DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings

import os
import requests
from datetime import datetime
import csv
from dateutil import parser 
from datetime import datetime, timedelta
import calendar

# def fetch_all_rooms_and_save_to_csv():
#     endpoint = "/rooms"
#     headers = {'RITAuthorization': os.getenv('RIT_API_KEY')}
#     base_url = os.getenv('RIT_API_BASE') + endpoint

#     all_rooms = []
#     current_page = 1

#     while True:
#         params = {"page": current_page}
#         response = requests.get(base_url, headers=headers, params=params)

#         if response.status_code != 200:
#             print(f"❌ Failed to fetch page {current_page}: {response.status_code}")
#             break

#         json_data = response.json()
#         room_data = json_data.get("data", [])

#         if not room_data:
#             print(f"✅ All pages fetched. Total pages: {current_page - 1}")
#             break

#         all_rooms.extend(room_data)
#         print(f"📦 Page {current_page} fetched with {len(room_data)} rooms.")

#         current_page += 1
#         if current_page > json_data.get("last_page", current_page): 
#             break

#     room_id_map = {}
#     with open("room_id_map.csv", mode="w", newline="") as csv_file:
#         writer = csv.writer(csv_file)
#         writer.writerow(["Room ID", "Room Code"])

#         for room in all_rooms:
#             room_id = room.get("id")
#             room_name = room.get("name")
#             writer.writerow([room_id, room_name])
#             room_id_map[room_id] = room_name

#     print("✅ All room data saved to:", os.path.abspath("room_id_map.csv"))
#     return room_id_map


# def load_room_mappings() -> dict:
#     """Load room mappings from CSV with proper error handling"""
#     room_map = {}
#     try:
#         with open("room_id_map.csv", "r") as csv_file:
#             reader = csv.DictReader(csv_file)
#             for row in reader:
#                 room_map[row["Room ID"]] = row["Room Code"]
#         print(f"✅ Loaded {len(room_map)} rooms from CSV")
#     except FileNotFoundError:
#         print("⚠️ CSV not found - fetching fresh data")
#         room_map = fetch_all_rooms_and_save_to_csv()
#     except Exception as e:
#         print(f"🚨 Error loading rooms: {str(e)}")
#     return room_map

# ROOM_ID_MAP = load_room_mappings()


# def get_room_code_from_id(room_id: str) -> str:
#     return ROOM_ID_MAP.get(room_id, "Unknown Room")




# def get_course_schedule(course_code: str, date: str = None) -> dict:
#     endpoint = f"/v1/course/{course_code.replace(' ', '-')}"
#     headers = {'RITAuthorization': os.getenv('RIT_API_KEY')}
    
#     params = {}
#     if date:
#         try:
#             parsed_date = datetime.strptime(date, "%m/%d/%Y").strftime("%Y-%m-%d")
#             params['date'] = parsed_date
#         except ValueError:
#             pass
            
#     response = requests.get(os.getenv('RIT_API_BASE') + endpoint, headers=headers,params=params)
#     #print(f"API Response for {course_code}:", response.text)
#     print(f"Full API response: {response.json()}")  
#     return response.json() if response.status_code == 200 else None

# def get_room_schedule(room_code: str, date: str) -> dict:
#     endpoint = f"/v1/rooms/{room_code}/meetings"
#     try:
#         parsed_date = datetime.strptime(date, "%m/%d/%Y").strftime("%Y-%m-%d")
#     except ValueError:
#         return None
        
#     params = {'date': parsed_date}
#     headers = {'RITAuthorization': os.getenv('RIT_API_KEY')}
#     response = requests.get(os.getenv('RIT_API_BASE') + endpoint, params=params, headers=headers)   
#     return response.json() if response.status_code == 200 else None


# def get_room_name_from_id(room_id: str) -> str:
#     """Get room name with automatic CSV refresh on missing entries"""
#     name = ROOM_ID_MAP.get(room_id)
    
#     if not name:
#         ROOM_ID_MAP.update(fetch_all_rooms_and_save_to_csv())
#         name = ROOM_ID_MAP.get(room_id, "Unknown Room")
        
#     return name

# def normalize_date(user_date: str) -> datetime:
#     """Handle 'today', 'tomorrow', weekday names, and full date formats"""
#     user_date = user_date.strip().lower()
#     today = datetime.now()

#     if user_date in ["today"]:
#         return today
#     elif user_date in ["tomorrow"]:
#         return today + timedelta(days=1)
    
#     # Match weekday names (e.g., "monday", "friday")
#     weekdays = {day.lower(): i for i, day in enumerate(calendar.day_name)}
#     if user_date in weekdays:
#         current_weekday = today.weekday()
#         target_weekday = weekdays[user_date]
#         days_ahead = (target_weekday - current_weekday + 7) % 7
#         if days_ahead == 0:
#             days_ahead = 7  
#         return today + timedelta(days=days_ahead)

#     try:
#         return parser.parse(user_date)
#     except Exception as e:
#         print(f"Date parsing error: {e}")
#         return None


# def format_time(time_str: str) -> str:
#     """Convert API time to HH:MM format"""
#     try:
#         return datetime.strptime(time_str, "%H:%M:%S").strftime("%H:%M")
#     except:
#         return time_str[:5] if time_str else "unknown time"

#loadanje pdfova iz data foldera i extractanje texta iz njih 
def load_pdf(data):
    loader = DirectoryLoader(data,
                    glob="*.pdf",
                    loader_cls=PyPDFLoader)
    documents = loader.load()
    return documents

#splita extractani text na manje dijelove (svaki dio ima 500 charctera, overlap 20 charactera)
def text_split(extracted_data):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size = 500, chunk_overlap=20)
    text_chunks = text_splitter.split_documents(extracted_data)
    
    return text_chunks


#download embedding model i converta text u numericke vekotire 
def download_hugging_face_embeddings():
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    return embeddings