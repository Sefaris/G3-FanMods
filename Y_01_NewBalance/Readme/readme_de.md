NewBalance.dll:

[Update 0.5.6]
Änderungen und Neuheiten:
- Der starke Angriff von 2 Einhandschwertern wurde gefixed so wie es die Animation hergibt: Nun können beide Schwerter nach dem ersten Spin den selben Gegner noch einmal treffen (3(4*) Hit-Kombo) | * der 4 Treffer, kann Gegner hinten seitlich auch treffen
- Die Reichweite von NPC Bogenschützen und Magiern kann nun in der Ini eingestellt werden ('AttackRangeAI')
- Die Treffer von Angriffen auf NPCs oder Spieler, die gerade geknocktdowned wurden wurde angepasst: nun werden Treffer besser wahrgenommen.
- Angreifer können nun noch im "Aktiven starken Angreifer-Phasen" Gegnerische Schläge den "Stun ignorieren", falls diese ein ausreichendes Level besitzen 
- Entities, die gar keine Waffen oder Zauber ausgerüstet haben, können Aufgrund der Animation nicht mehr niedergeschlagen werden
- Eine neue Konfiguration wurde hinzugefügt, welche die NPCs noch aggresiver gegen ihre Gegner einschlagen lässt ('UseHardCoreAttacks'): Damit schlagen Gegner nun weiter wenn ihr Ziel am "Boden sitzt" und warten nicht mehr.
- Es lassen sich nun Projektile nutzen, welche Flächenschaden austeilen. Dies kann über die Keywörtern 'EnableAOEDamage' und einer Liste 'AOENames' eingestellt werden
    - die Liste ist so gebaut, dass schon Keyworter der Template-Namen des Projektils schon ausreicht.
    - => 'Fire' würde also FireBall, FireStorm, FireArrow usw. Hinzufügen.
    - Die default Distanz ist momentan auf 1000 Ingame Units beschränkt. (10 Meter glaub ich ca.)
- Frostschaden per Tick für eingefrorene Entities wurde nun auf 2 erhöht.
- Die Frostzeit von Eis-Block ist nun von 60 auf 30 Sekunden reduziert! 
- Das erweiterte Block (HackAttacken von 2H-Waffen geblockt werden und PierceAttacken von 2 1H-Waffen können geblockt werden) wurde nun als Konfiguration eingestellt in der Ini-Datei ('UseExtendedBlocking')
- Eine Konfiguration wurde eingebaut, dass Innos Licht die Bösen Kreaturen Beliars nun in Flammen steckt (Die kann auch die eigenen Demonen und Skelette betreffen, werden aber nicht sauer auf euch :) ) ('UseDamagingInnosLight')
- NPCs mit Schilden bekommen ca. 25% mehr Rüstungs
- Ausdauerregeneration wird nun leicht mit euer maximalen Ausdauer zusätzlich skalieren (1%) -- Das wird eventuell wieder entfernt oder angepasst.
- Die Level von unterschiedlich starten NPCs für die Kalkulierung von Schaden oder Zusatz-Effekten für NPCs kann für unterschiedliche Mods, die die Level von NPCs anpassen, nun über die Ini eingestellt werden
- Ein System für das Manuelle Zielen von Magischen Projektilen wurde implementiert und kann in der Ini eingestellt werden ('EnableNewMagicAiming')
- Der Zauber Armee der Finsternis spawned nun 4 Skelette und Zombies immer, und einen Untoten Generalen (Dieser hat noch keine Strings, ich arbeite noch daran dies in der Engine zusammenzuführen)
- Das Statische Blocken, welches in der Alternativen KI eingeführt wurde, kann nun wieder aktiviert werden, für die Spieler, die es vermisst haben ('UseStaticBlocks')
- Konfigurationen für die Geschwindigkeit von dem Spannen des Bogens wurden nun eingeführt (Hier ist Achtung geboten, den Sound müsst ihr selber dann anpassen, ansonsten klappt es) ('BowAnimationSpeedBonusMid, BowAnimationSpeedBonusHigh')
- Konfiguration für die Einstellung des Bonusschutzes von den Perks 'Resist_Heat' und 'Resist_Cold' wurden eingeführt ('ElementalPerkBonusResistance')
- Bonuse von Waffen-Qualitäten können nun teilweise selbst in der Ini-Datei angepasst werden (zum Beispiel WaffenSegnen gibt nun 20 anstatt 10 schaden extra)
    - Scharfe Waffen können auch einen prozentualen Bonus geben, wenn eingestellt
- Gesegnete Waffen machen nun 20% mehr Schaden gegen Böse Kreaturen Beliars
- Der Grenzpunkt an den Menschliche Entities niedergeschlagen werden kann nun eingestellt werden ('KnockDownThreshold') und wurde von 4 auf 5 standardmäßig erhöht
- Bonusschaden von Waffen wurde etwas angepasst für Magische Waffen -- Diese verwenden bei unterschiedlichen Waffen-Arten angepasste Bonies
- Magische Projektile von NPCs machen nun nur noch doppelten Schaden gegen andere NPCs und nicht mehr auch gegen den Spieler, da der Spieler generell immer viel weniger Schutz dagegen hat.
- Parierte Entities sind nun etwas leichter Niederzuschlagen
- Bugs gefixed mit eingefrorenen NPCs: Diese können nun keine Angriffe blockieren
- NPCs bekommen nun weniger Ausdauerschaden, damit es mehr in Relation zum Helden-Schaden passt
- der Perfekte Block kann nun eingestellt werden ob er aktiviert sein soll, oder nur für den Helden funktioniert ('EnablePerfectBlock', 'PlayerOnlyPerfectBlock')
- der Perfekte Block pariert nun nicht mehr Fernkampfangreifer xD -- So ein Perk zu lernen, um Projektile umzulenken könnte eingebaut werden!
- Der Poison-Instakill Bug wurde gefixt

[ältere Updates]

Damit die NPCs mehr Schaden machen mit den besonderen Zaubern, und ein paar Änderungen besser integriert werden können, habe ich noch eine weiteres Script geschrieben, der das
Schadensverhalten von G3 anpasst.
NPC machen untereinander die selben Schadensberechnungen gegen alle NPCs wie gegen den Spieler, also die Berechnung des AB ab Level 2
Hier haben auch die Tiere den Schadensbonus ihrer Waffen.

Damit hängt auch zusammen, dass Zauber, wie die Eiswelle nun eine gewisse Stun-Resistenz bietet. Damit wird man nicht mehr so einfach beim Zaubern unterbrochen.

Mit der NewBalance Mod bekommt der NPC und Spieler beim Zaubern einen Stunbuff von dem Wert 2 zur Verteidigung hinzu. Falls der Hitstun dadurch 0 wird von dem Angreifer, wird man nicht gestunt. Dadurch werden Summon Zauber durch Quick und Normale Attacken nicht unterbrochen, Schaden bekommt man trotzdem.
Die Hack und Stichattacken oder Kopftreffer brechen den Zauber trotzdem immer und bei starken Angriffen immer, falls der Levelunterschied nicht zu groß ist.
Summonzauber haben nun auch Hyperarmor gegen Projectile, ausgenommen den Healzauber. Falls ein Kopftreffer gelandet wurde, bekommt der Zaubernde kein Hyperarmor.


Momentan habe ich auch meine angepasste Balanceanpassungen eingebracht.

- NPCs haben endlich Zielübungen absolviert, und können teilweise auch Gegner treffen die sich in eine Richtung bewegen.
- Bogenschießen ist nun etwas schneller, wenn man die Perks lernt (+30% - +60%), oder wenn NPCs das Level der "WarriorLevelCap" oder "EliteLevelCap" erreichen
- Nahkampfattacken haben nun mehr Reichweite
- Damageoutput und Kaltulationen von Rüstungswerten wurde angepasst
- Verwandlungen wurden verbessert und erweitert, so dass diese nützlicher sind
- *NEU* Vieles ist nun auch anpassbar durch die newbalance.ini im "Gothic 3/Ini"-Verzeichnis
- Wenn NPCs und der Spieler wenig Ausdauer besitzen, machen diese weniger Schaden
- Wenn der Spieler oder NPCs schlafen gelegt werden, verlieren diese ihre Waffen nicht mehr, sondern werden auf ihrem Rücken ausgerüstet
- Scharfe Waffen können nun den Waffen schaden Prozentual erhöhen, wenn es eingestellt wurde, besitzt aber immer mindestens +10 Schaden im modus
- Gesegnete Waffen machen 20% mehr Schaden gegen Böse Kreaturen
- Gegner rennen auf entfernte Ziele zu, anstatt zu joggen
- Viele weitere kleine Anpassungen

- Anpassung der Ausdauerwiederherstellung für Spieler und NPCs
- Anpassbar durch die newbalance.ini-Datei

Zauber "Böses Vernichten" kann nun auch gegen Drachen gewirkt werden.

- Geändertes Stunverhalten von Spieler und NPC:
- TODO: *Rechnung doku wird noch erstellt*
- Im Grunde genommen werden starke Spieler oder NPCs nicht mehr richtig von den Schwachen gestunnt.
- 1H machen nur weniger Stun Schaden als 2H bei normalen Angriffen
- Monster haben keinen Rage-Stun resistenz mehr, heißt die können nun immer gestunnt werden
- Dafür haben Große Monster ( z.B Drachen, Troll, Oger usw.) mehr Stun-Resistenz, vor allem wenn diese einen Starken Angriff durchführen

- Powerattacken ignorieren 10% % Rüstung zusätzlich (alle Nahkampfwaffen)
- Hackattacken ignorieren 15% Rüstung zusätzlich (alle Äxte/2H)
- Quickattacken sind nun weniger Effektiv gegen Gegner mit Rüstung (7.5% weniger Effizient gegen Rüstung)

- NPCs verwenden nur mehrere Bolzen und Pfeilarten, je nach Powerlevel und nach Abstammung (hier ist die Political Alignment gemeint)

- In der Alternativen KI wurde wieder das alte Block-Treffer Verhalten eingeführt. -> Der Block ist nicht mehr unrealistisch Starr.

- Auch wurde hier wieder dem Spieler die Erlaubnis gegeben den Block länger als 2.5 Sekunden zu halten

- Ein Perfekt Block Möglichkeit wurde in das Spiel eingeführt!
- Wenn ein Angegriffener, kurz bevor die Attacke diesen trifft, blockt, wird der Gegner gestunnt und der Angegriffene bekommt keine Ausdauer- / Lebensabzüge
- Dabei bekommt der Gegner erhöhten Schaden (*1.5)

- Mehr und angepasste Resistenzen für bestimmte Spezien:
Stark: Schaden / 2
Schwach: Schaden * 1.6
Leicht Schwach: Schaden * 1.2
Leicht Stark: Schaden * 0.8
Immun: 5 Schaden, und kein Stun

- Skelette und Golems sind schwach gegen Hiebschaden

- Golems sind stark gegen Klingenschaden
- Skelette sind leich stark gegen Klingenschaden

- Skelette, Eisgolems und Trolle können nur mit Feuer, oder Sprenpfeilen richtig verletzt werden
- Trolle sind bei sonstigen Pfeilschaden stark
- Feuergolems und Golems sind gegen Pfeilschaden immun (halt außer die Kopfnusspfeile)

- Feuerwarane, Feuergolems und Drachen sind gegen Feuerschaden immun
- Eisgolems und Zombies sind gegen Feuerschaden schwach
- Demonen sind gegen Feuerschaden stark
- Eisdrachen sind gegen Feuerschaden schwach
- Magier (NPCs) sind leich stark gegen Feuerschaden

- Eingefrorene Einheiten sind immun gegen Eisschaden
- Feuergolems sind schwach gegen Eisschaden
- Zombies und Skelette sind stark gegen Eisschaden
- Eisgolems sind immun gegen Eisschaden
- Eisdrachen sind gegen Eisschaden immun
- Magier (NPCs) sind leich stark gegen Eisschaden 

- Golems sind weiterhin schwach gegen Blitzschaden
- SteinDrachen sind gegen Blitzschaden schwach
- Magier (NPCs) sind leich stark gegen Blitzschaden 

- Waffen haben für den PC_Hero unterschiedliche Attributsbonis, je nach dem welche Waffe man spielt:
- Stärke Waffen bekommen wie sonst auch den halben Stärke-Wert als Bonusschaden
- 2H Waffen bekommen 0.55*STR als Bonusschaden
- Äxte und Spitzhacken bekommen 0.6*STR als Bonusschaden
- Waffen die Geschicklichkeit erfordern:
- Waffen die als Haupattribut Geschicklichkeit benötigen (DEX) bekommen 0.2*STR + 0.4*DEX als Bonusschaden
- Werden zwei 1H geführt, bekommt man 0.3*STR + 0.35*DEX als Bonussschaden
- Waffen, die Intelligenz erforden, oder Stäbe, erhalten 0.2*STR + 0.4*INT + 15 als Bonusschaden.

- Änderung an Magischen Waffen und dem Statuseffekten (Vereist, Brennend)
- Die Waffen die brennend oder vereist sind, haben nun eine Schance von 25% (Bei Power-Attacken 37.5%) den jeweiligen Effect zu erzeugen, der sonst nur bei sehr wenig HP aktiviert wurde.
- Falls der Held den jeweiligen Perk (Resist_Heat, Resist_Cold) besitzt, oder ein NPC einen Powerlevel größer gleich dem "EliteLevelCap" ist, dann gibt es eine 50% Chance, dass der Effekt nicht aktiviert wird.
- Ansonsten wird wie normal bei normalen Zauber immer der jeweilige Effekt erzeugt (je nach Schadenstyp) oder falls es ein Projektil-Zauber ist und ein aufgeladener Angriff stattfindet.

- Der Monsterschaden kann in der Ini-Datei "monsterdamage.ini" im Ini Ordner angepasst werden. Diese gelten nur für nicht beschworene Monster. Beträgt ohne Ini 0.5*Schaden

Wer diese neue Kampf-Balancing-Anpassungen nicht möchte, der sollte einfach die Datei in "Gothic 3"/scripts/Script_NewBalance.dll löschen.

Ich werde vermutlich noch paar Änderungen einbauen.

Würde mich gern um Feedback freuen Hab es selber noch nicht im Playthrough probiert.