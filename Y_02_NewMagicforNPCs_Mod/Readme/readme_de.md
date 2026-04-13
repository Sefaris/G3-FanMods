NewMagicforNPCs.dll:

Die Magier verwenden nun fast immer (außer bei den Golemarten) die Zauber ihres "Glaubens" oder Weges.

Es wurde ein Bug gefixt, der Magiern den Effekt eines Zaubers gab, welcher eine Aufladezeit hatte und von einem HitStun unterbrochen wurde, wenn diese
danach einen Projektilzauber zauberten. Passierte immer im Standard Gothic nach einem Healversuch des Magiers, wenn dieser von einem Zauber/Projectil erwischt wurde.

Definition von NPC Powerlevel:
Level von NPC + Currentlevel des Pc_Heros bis zum Maximum level des NPCs


EisGolem:
- Verwendet nun den neuen Eisblock Zauber!


Alle Drachen verwenden den Feuerball
Eisdrachen und Blaue Drachen verwenden die Eislanze
Steindrachen und Schwarze Drachen verwenden den Blitzschlag


Wassermagier:
- Powerlevel > 24:
- Chance von 10 % falls das Anvisierte Ziel in der Nähe ist eine Eiswelle zu zaubern,
- ansonsten wird mit einer 6% Chance der SchlafZauber gewirkt
- Powerlevel > 34:
- Chance von 4 % einen EisGolem zu beschwören
- falls schon ein PartyMitglied vorhanden ist, wird hier der neue EisBlock Zauber verwendet
- Powerlevel > 39:
- Chance von 2 % einen Hagelsturm zu beschwören
- Ansonsten wird die Eislanze ausgewählt


Feuermagier:
- Wenn der Gegner ein Böses Wesen ist, kann der Feuermagier, falls es ein Powerlevel von mindestens 30 besitzt den "Böses Vernichten"-Zauber nutzen
- Powerlevel > 24:
- Chance von 10 % falls das Anvisierte Ziel in der Nähe ist eine Feuerwelle zu zaubern
- Powerlevel > 34:
- Chance von 4 % einen FeuerGolem zu beschwören
- Powerlevel > 39:
- Chance von 2 % einen Feuerregen zu beschwören
- Ansonsten wird der Feuerball ausgewählt


Schwarzmagier:
- Powerlevel > 24:
- Chance von 10 % ein Skelett zu beschwören (War vorher Gift, aber eine Spiel-Funktion hat Schwierigkeiten mit den Threads)
- Powerlevel > 34:
- Chance von 4 % einen Demon zu beschwören
- Powerlevel > 39:
- Chance von 2 % einen Blitz zu beschwören
- Ansonsten wird der Blitzschlag ausgewählt


Sonstige Zauberer (wurde nicht identifiziert):
- Powerlevel > 24:
- Chance von 6 % ein Schlafzauber zu zu wirken
- Powerlevel > 34:
- Chance von 4 % einen Golem zu beschwören
- Powerlevel > 39:
- Chance von 2 % einen Meteor zu beschwören
- Ansonsten wird der Feuerball ausgewählt


Die Auswahl, welcher Magiertyp der Magier ist wird folgendes abgeglichen:
-> Für vorhandene NPCs werden die Namen aus einer Liste abgeglichen.
-> Für neue NPCs werden hier das RoleDescription-Feld in dem NPC Template verwendet und suchen hierbei nach Keywörtern im Vorhandenen String:


Feuermagier:
- "Feuermagier", "Paladin"


Wassermagier:
- "Druide", "Wassermagier"


Schwarzmagier:
- "Schwarzmagier", "Schamane"


-> Alternativ kann hierbei auch bei dem Template eines NPCs im Inventar der Plunder5 auf 3 bestimmte Werte gesetzt werden:
- IsFiremage, IsWatermage, IsBlackmage
