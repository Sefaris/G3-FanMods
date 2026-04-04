import json
import os
from configparser import ConfigParser

INI_FILE = "mod.ini"
JSON_FILE = "mod.json"
MODS_PATH = r"D:\Repos\G3-FanMods"

def parse_ini(mod_path: str, mod_dir: str):
    ini_path = os.path.join(mod_path, INI_FILE)
    json_path = os.path.join(mod_dir, JSON_FILE)

    config = ConfigParser()
    config.optionxform = str
    config.read(ini_path, encoding='utf-8')

    required = []
    incompatible = []

    if config.has_option('Main', 'Required'):
        required = [item.strip() for item in config.get('Main', 'Required').split(';') if item.strip()]

    if config.has_option('Main', 'Incompatible'):
        incompatible = [item.strip() for item in config.get('Main', 'Incompatible').split(';') if item.strip()]

    json_file = {}
    if os.path.exists(json_path):
        with open(json_path, 'r', encoding='utf-8') as f:
            json_file = json.load(f)

    json_file['dependencies'] = required
    json_file['incompatibles'] = incompatible

    os.makedirs(os.path.dirname(json_path), exist_ok=True)
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(json_file, f, indent=2, ensure_ascii=False)

    print(f"Plik JSON zapisany: {json_path}")


for mod_dir in os.listdir(MODS_PATH):
    full_mod_path = os.path.join(MODS_PATH, mod_dir)
    if os.path.isdir(full_mod_path):
        parse_ini(full_mod_path, mod_dir)