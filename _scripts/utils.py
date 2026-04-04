import os
import shutil
import json
class ModManagerCopier:
    def __init__(self, source_path, target_path):
        self.source_path = source_path
        self.target_path = target_path

    # --- utilities ---
    @staticmethod
    def ensure_directory_exists(path):
        os.makedirs(path, exist_ok=True)

    @staticmethod
    def copy_files(src_dir, dst_dir, filter_fn=None):
        if not os.path.exists(src_dir):
            return

        try:
            files = os.listdir(src_dir)
        except Exception as e:
            print(f"Error reading directory {src_dir}: {e}")
            return

        for file_name in files:
            file_path = os.path.join(src_dir, file_name)

            if not os.path.isfile(file_path):
                continue

            if filter_fn and not filter_fn(file_name):
                continue

            try:
                ModManagerCopier.ensure_directory_exists(dst_dir)
                target_path = os.path.join(dst_dir, file_name)
                shutil.copyfile(file_path, target_path)
                print(f"Copying {file_name}")
            except Exception as error:
                print(f"Error copying {file_name}: {error}")

    # --- main copy methods ---
    def copy_pictures(self):
        src = os.path.join(self.source_path, "pictures")
        dst = os.path.join(self.target_path, "images")
        self.copy_files(src, dst)

    def copy_mod_files(self):
        src = os.path.join(self.source_path, "ModFiles")
        self.copy_files(src, self.target_path, filter_fn=lambda f: not f.endswith(".ini"))

    def copy_scripts(self):
        root = os.path.join(self.source_path, "ScriptFiles")
        self.copy_files(os.path.join(root, "scripts"), self.target_path)
        self.copy_files(os.path.join(root, "ini"), self.target_path)

    def copy_mod_configs_to_repository(self, repository_path):
        for dir_name in os.listdir(self.source_path):
            dir_path = os.path.join(self.source_path, dir_name)

            if not os.path.isdir(dir_path):
                continue

            ini_path = os.path.join(dir_path, "ScriptFiles", "Ini")
            target_dir = os.path.join(repository_path, dir_name)

            self.copy_files(ini_path, target_dir, filter_fn=lambda f: f.endswith(".ini"))

    def copy_stringtables_to_repository(self, repository_path):
        for dir_name in os.listdir(self.source_path):
            dir_path = os.path.join(self.source_path, dir_name)

            if not os.path.isdir(dir_path):
                continue

            src = os.path.join(dir_path, "ModFiles", "stringtable.ini")
            if not os.path.exists(src):
                continue

            dst_dir = os.path.join(repository_path, dir_name)
            self.ensure_directory_exists(dst_dir)

            try:
                shutil.copyfile(src, os.path.join(dst_dir, "stringtable.ini"))
                print(f"Copying stringtable for {dir_name}")
            except Exception as e:
                print(f"Error copying {dir_name}: {e}")

    def copy_union_starter_format_to_modmanager_format(self):
        try:
            directories = os.listdir(self.source_path)
        except Exception as e:
            print(f"Error reading directory {self.source_path}: {e}")
            return

        for directory in directories:
            print("Preparing directory", directory)
            dir_path = os.path.join(self.source_path, directory)
            if not os.path.isdir(dir_path):
                continue
            target_dir = os.path.join(self.target_path, directory)
            ModManagerCopier(dir_path, target_dir).copy_pictures()
            ModManagerCopier(dir_path, target_dir).copy_mod_files()
            ModManagerCopier(dir_path, target_dir).copy_scripts()


def compare_directory_names(mods_us, mods_pl):
    ignore_dirs = {".git", ".github"}

    try:
        us_dirs = [
            d for d in os.listdir(mods_us)
            if os.path.isdir(os.path.join(mods_us, d)) and d not in ignore_dirs
        ]
        pl_dirs = [
            d for d in os.listdir(mods_pl)
            if os.path.isdir(os.path.join(mods_pl, d)) and d not in ignore_dirs
        ]
    except Exception as e:
        print(f"Error reading directories: {e}")
        return

    missing_dirs = [d for d in pl_dirs if d not in us_dirs]
    extra_dirs = [d for d in us_dirs if d not in pl_dirs]

    print("Missing directories:", json.dumps(missing_dirs))
    print("Extra directories:", json.dumps(extra_dirs).replace(",", "\n"))

def remove_empty_dirs(path, ignore_dirs=None):
    if ignore_dirs is None:
        ignore_dirs = {".git", ".github"}

    if not os.path.exists(path):
        print(f"Path does not exist: {path}")
        return

    for root, dirs, files in os.walk(path, topdown=False):
        for dir_name in dirs:
            if dir_name in ignore_dirs:
                continue
            dir_path = os.path.join(root, dir_name)
            try:
                if not os.listdir(dir_path):
                    os.rmdir(dir_path)
                    print(f"Removed empty directory: {dir_path}")
            except Exception as e:
                print(f"Error removing {dir_path}: {e}")


