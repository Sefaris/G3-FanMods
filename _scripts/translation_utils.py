import os
import shutil
from collections import Counter

LANGUAGES = {
    0: "ENG",
    1: "ITA",
    2: "FRA",
    3: "GER",
    4: "SPA",
    5: "CZE",
    6: "HUN",
    7: "POL",
    8: "RUS",
    9: "TRC",
}

def read_file_utf16(path):
    with open(path, "r", encoding="utf-16le") as f:
        return f.read().split("\n")

def write_file_utf16(path, lines):
    with open(path, "w", encoding="utf-16le") as f:
        f.write("\r\n".join(lines))

def find_stringtable(root_path):
    target = "stringtable.ini"
    for dirpath, _, filenames in os.walk(root_path):
        if target in filenames:
            return os.path.join(dirpath, target)
    return None


def copy_stringtables(src_root, dst_root):
   
    for dirpath, _, filenames in os.walk(src_root):
        if "stringtable.ini" in [f.lower() for f in filenames]:
            src_file = os.path.join(dirpath, "stringtable.ini")
            
            module_folder = os.path.basename(dirpath)
            
            dst_dir = os.path.join(dst_root, module_folder, "ModFiles")
            os.makedirs(dst_dir, exist_ok=True)
            
            dst_file = os.path.join(dst_dir, "stringtable.ini")
            
            shutil.copy2(src_file, dst_file)
            print(f"Skopiowano: {src_file} → {dst_file}")


def replace_translation(source, destination, output, lang):
    lang_index = None
    for key, value in LANGUAGES.items():
        if value.lower() == lang.lower():
            lang_index = key
            break
    if lang_index is None:
        raise ValueError(f"Nie znaleziono języka: {lang}")

    with open(destination, "r", encoding="utf-16le") as f:
        file1_lines = f.readlines()  # zachowuje końce linii

    with open(source, "r", encoding="utf-16le") as f:
        file2_lines = f.readlines()

    file2_map = {}
    for line in file2_lines:
        line_strip = line.rstrip("\r\n")
        if "=" in line_strip:
            parts = line_strip.split(";")
            idx = parts[0].split("=")[0]
            file2_map[idx] = parts

    output_lines = []

    for line in file1_lines:
        line_strip = line.rstrip("\r\n")
        if "=" in line_strip:
            parts = line_strip.split(";")
            idx1 = parts[0].split("=")[0]

            if idx1 in file2_map:
                parts2 = file2_map[idx1]
                if lang_index * 2 < len(parts2):
                    parts[lang_index * 2] = parts2[lang_index * 2]

            newline = line[len(line_strip):]
            output_lines.append(";".join(parts) + newline)
        else:
            output_lines.append(line)

    if output_lines == file1_lines:
        print(f"Brak zmian dla {lang}, plik nie został zapisany: {output}")
        return

    os.makedirs(os.path.dirname(output), exist_ok=True)
    with open(output, "w", encoding="utf-16le", newline="") as f:
        f.writelines(output_lines)

    print(f"Zakończono tłumaczenie dla {lang}. Wynik zapisany w: {output}")


def replace_multitple_languages(src_root, dst_root, lang):
    for entry in os.scandir(src_root):
        if entry.is_dir():
            stringtable_path = find_stringtable(entry.path)
            if stringtable_path is None:
                continue

            module_name = os.path.basename(entry.path)
            dst_path = os.path.join(dst_root, module_name, "stringtable.ini")

            if os.path.exists(dst_path):
                replace_translation(
                    source=stringtable_path,
                    destination=dst_path,
                    output=dst_path,
                    lang=lang,
                )
            else:
                print(f"Ścieżka nie istnieje: {dst_path}")

def replace_multiple_languages(root_dir):
    langs_to_replace = [v for k, v in LANGUAGES.items() if v != "RUS"]
  

    source_path = os.path.join(root_dir, "stringtable_old.ini")
    target_path = os.path.join(root_dir, "stringtable.ini")

    count_semicols(source_path)
    count_semicols(target_path)

    if not os.path.exists(source_path):
        print(f"Brak pliku źródłowego: {source_path}")

    if not os.path.exists(target_path):
        print(f"Brak pliku docelowego: {target_path}")

    for lang in langs_to_replace:
        replace_translation(
            source=source_path,
            destination=target_path,
            output=target_path,
            lang=lang,
        )

def count_semicols(file_path):

    with open(file_path, 'r', encoding='utf-16le') as f:
        for index, line in enumerate(f):
            if ';' not in line:
                continue

            semicolons = len(line.split(';'))
            if semicolons != 20:

                print(f"  Line {index + 1}: {semicolons}")


def check_for_duplicates(occurrences):
    duplicates = {}
    for element, count in occurrences.items():
        if count > 1:
            duplicates[element] = count
    return duplicates

def get_keys(file_lines):
    keys = []
    for line in file_lines:
        if '=' in line:
            key = line.split('=')[0]
            keys.append(key)
    return keys



def validate_file(file_path):
    folder_name = os.path.basename(os.path.dirname(file_path))
    printed_header = False

    if os.path.isdir(file_path) or not file_path.endswith('.ini'):
        return
    count_semicols(file_path)

    file_lines = read_file_utf16(file_path)

    duplicates = check_for_duplicates(
        Counter(get_keys(file_lines))
        )
    

       

    for key, count in sorted(duplicates.items()):
        if not printed_header:
            print(f"\nFile: {folder_name}")
            printed_header = True
        print(f"{key:<50} | {count}")