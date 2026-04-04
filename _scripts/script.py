import os

from utils import ModManagerCopier, compare_directory_names
from translation_utils import replace_multiple_languages, copy_stringtables, replace_translation, count_semicols, validate_file

HU_SRC = r"D:\Sefaris\G3\1.6.3HU"

BASE_DST = r"D:\Repos\G3-FanMods"

STRINGTABLES_ROOT = r"D:\Sefaris\G3\Stringtables"

MODS_US = r"D:\Sefaris\G3\Modpack 172\ModsUS"
MODS_PL = r"D:\Sefaris\G3\Modpack 172\Mods"
REPOSITORY = r"D:\Repos\G3-FanMods"


#copier = ModManagerCopier(MODS_US, MODS_PL)

#copier.copy_union_starter_format_to_modmanager_format()

#compare_directory_names(MODS_US, REPOSITORY)
#copier.copy_stringtables_to_repository(REPOSITORY)

# copier.copy_mod_configs_to_repository(REPOSITORY)


# replace_translation(r"D:\Repos\G3-FanMods\Y_05_TotalRebalance\stringtable.ini",r"D:\Repos\G3-FanMods\Y_05_TotalRebalance\stringtable_new.ini","D:\Repos\G3-FanMods\Y_05_TotalRebalance\stringtable_out.ini","HUN")

# replace_multiple_languages(r"D:\Repos\G3-FanMods\A_2_BaseMod")
# replace_multiple_languages(r"D:\Repos\G3-FanMods\N_Main")
# replace_multiple_languages(r"D:\Repos\G3-FanMods\O_Pirate_Dream")
# replace_multiple_languages(r"D:\Repos\G3-FanMods\O_TameAnimal")
# replace_multiple_languages(r"D:\Repos\G3-FanMods\P_Arenas")
# replace_multiple_languages(r"D:\Repos\G3-FanMods\P_ThiefQuests")
# replace_multiple_languages(r"D:\Repos\G3-FanMods\Q_Conquest")
# replace_multiple_languages(r"D:\Repos\G3-FanMods\Q_MagicWeapons")
# replace_multiple_languages(r"D:\Repos\G3-FanMods\X71_Achievements")
# replace_multiple_languages(r"D:\Repos\G3-FanMods\X72_QuestEdit")
# replace_multiple_languages(r"D:\Repos\G3-FanMods\X73_AlternativePickpocketing")
# replace_multiple_languages(r"D:\Repos\G3-FanMods\X74_AlternativeBonuses")
# replace_multiple_languages(r"D:\Repos\G3-FanMods\Y_03_Balance Ultimate")
# replace_multiple_languages(r"D:\Repos\G3-FanMods\Y_05_TotalRebalance")
replace_translation(r"D:\Repos\G3-FanMods\O_UnlimitedSummons\stringtable.ini",r"D:\Repos\G3-FanMods\Q_MagicWeapons\stringtable.ini",r"D:\Repos\G3-FanMods\Q_MagicWeapons\stringtable.ini","POL")
replace_translation(r"D:\Repos\G3-FanMods\O_UnlimitedSummons\stringtable.ini",r"D:\Repos\G3-FanMods\Y_05_TotalRebalance\stringtable.ini",r"D:\Repos\G3-FanMods\Y_05_TotalRebalance\stringtable.ini","POL")

# count_semicols(r"D:\Repos\G3-FanMods\A_2_BaseMod\stringtable.ini")
# count_semicols(r"D:\Repos\G3-FanMods\N_Main\stringtable.ini")
# count_semicols(r"D:\Repos\G3-FanMods\O_Pirate_Dream\stringtable.ini")
# count_semicols(r"D:\Repos\G3-FanMods\O_TameAnimal\stringtable.ini")
# count_semicols(r"D:\Repos\G3-FanMods\P_Arenas\stringtable.ini")
# count_semicols(r"D:\Repos\G3-FanMods\P_ThiefQuests\stringtable.ini")
# count_semicols(r"D:\Repos\G3-FanMods\Q_Conquest\stringtable.ini")
# count_semicols(r"D:\Repos\G3-FanMods\Q_MagicWeapons\stringtable.ini")
# count_semicols(r"D:\Repos\G3-FanMods\X71_Achievements\stringtable.ini")
# count_semicols(r"D:\Repos\G3-FanMods\X72_QuestEdit\stringtable.ini")
# count_semicols(r"D:\Repos\G3-FanMods\X73_AlternativePickpocketing\stringtable.ini")
# count_semicols(r"D:\Repos\G3-FanMods\X74_AlternativeBonuses\stringtable.ini")
# count_semicols(r"D:\Repos\G3-FanMods\Y_03_Balance Ultimate\stringtable.ini")
# count_semicols(r"D:\Repos\G3-FanMods\Y_05_TotalRebalance\stringtable.ini")


#validate_file(r"D:\Repos\G3-FanMods\Q_MagicWeapons\stringtable.ini")
# for dirpath, _, filenames in os.walk(REPOSITORY):
#   target = "stringtable.ini"
#   if target in filenames:
#       iniPath = os.path.join(dirpath, target)
#       validate_file(iniPath)
