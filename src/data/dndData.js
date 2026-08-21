// D&D 101 — Core Data
export const DND_DATA = {

  races: [
    {
      id: "human",
      name: "Human",
      emoji: "👤",
      icon: "H",
      tagline: "Adaptable and ambitious",
      description: "The most common race in most D&D worlds, humans are known for their versatility, ambition, and diversity. They adapt to nearly any role.",
      statBonuses: { STR: 1, DEX: 1, CON: 1, INT: 1, WIS: 1, CHA: 1 },
      traits: [
        { name: "Versatile", desc: "+1 to all six ability scores at character creation." },
        { name: "Extra Language", desc: "You can speak, read, and write one extra language of your choice." },
        { name: "Extra Feat (Variant)", desc: "With the variant rule, gain a Feat and a skill proficiency instead of the stat boosts." }
      ],
      size: "Medium", speed: 30,
      bestClasses: ["Fighter", "Paladin", "Rogue", "Wizard"],
      color: "#8b7355"
    },
    {
      id: "elf",
      name: "Elf",
      icon: "E",
      tagline: "Ancient, graceful, perceptive",
      description: "Elves are a magical people of otherworldly grace. They have pointed ears, slender frames, and live for centuries—accumulating deep knowledge and skill.",
      statBonuses: { DEX: 2 },
      subRaces: [
        { name: "High Elf", bonuses: { INT: 1 }, extra: "One wizard cantrip" },
        { name: "Wood Elf", bonuses: { WIS: 1 }, extra: "Mask of the Wild (hide in natural settings)" },
        { name: "Drow", bonuses: { CHA: 1 }, extra: "Sunlight Sensitivity, superior Darkvision" }
      ],
      traits: [
        { name: "Darkvision", desc: "See in dim light as if bright, darkness as dim light, up to 60 ft." },
        { name: "Keen Senses", desc: "Proficiency in the Perception skill." },
        { name: "Fey Ancestry", desc: "Advantage on saving throws against being charmed; immune to magical sleep." },
        { name: "Trance", desc: "Elves don't sleep—they meditate deeply for 4 hours instead." }
      ],
      size: "Medium", speed: 30,
      bestClasses: ["Ranger", "Rogue", "Wizard", "Druid"],
      color: "#4a7c59"
    },
    {
      id: "dwarf",
      name: "Dwarf",
      icon: "D",
      tagline: "Tough, steadfast, resilient",
      description: "Dwarves are a stalwart people known for their mastery of stone and metalwork, deep loyalty to their clans, and legendary stubbornness.",
      statBonuses: { CON: 2 },
      subRaces: [
        { name: "Hill Dwarf", bonuses: { WIS: 1 }, extra: "+1 HP per level" },
        { name: "Mountain Dwarf", bonuses: { STR: 2 }, extra: "Light and medium armor proficiency" }
      ],
      traits: [
        { name: "Darkvision", desc: "60 ft darkvision." },
        { name: "Dwarven Resilience", desc: "Advantage on saves vs. poison; resistance to poison damage." },
        { name: "Stonecunning", desc: "Double proficiency bonus on History checks related to stonework." },
        { name: "Combat Training", desc: "Proficient with battleaxe, handaxe, throwing hammer, and warhammer." }
      ],
      size: "Medium", speed: 25,
      bestClasses: ["Fighter", "Paladin", "Cleric", "Barbarian"],
      color: "#7a5c3a"
    },
    {
      id: "halfling",
      name: "Halfling",
      icon: "Hf",
      tagline: "Lucky, nimble, brave",
      description: "Halflings are a small folk who value the comforts of home—but who often find themselves on grand adventures thanks to their natural luck and courage.",
      statBonuses: { DEX: 2 },
      subRaces: [
        { name: "Lightfoot", bonuses: { CHA: 1 }, extra: "Naturally Stealthy—hide behind larger creatures" },
        { name: "Stout", bonuses: { CON: 1 }, extra: "Stout Resilience (like Dwarven Resilience vs. poison)" }
      ],
      traits: [
        { name: "Lucky", desc: "When you roll a 1 on an attack, ability check, or save, reroll and use the new roll." },
        { name: "Brave", desc: "Advantage on saves against being frightened." },
        { name: "Halfling Nimbleness", desc: "Move through the space of any creature larger than you." }
      ],
      size: "Small", speed: 25,
      bestClasses: ["Rogue", "Bard", "Ranger", "Monk"],
      color: "#6b8e5a"
    },
    {
      id: "half-elf",
      name: "Half-Elf",
      icon: "HE",
      tagline: "Charismatic and adaptable",
      description: "Half-elves combine the best of both human adaptability and elven grace. Often charming diplomats, they move comfortably between the two worlds.",
      statBonuses: { CHA: 2 },
      extraBonuses: "+1 to two other ability scores of your choice",
      traits: [
        { name: "Darkvision", desc: "60 ft darkvision." },
        { name: "Fey Ancestry", desc: "Advantage on charm saves; immune to magical sleep." },
        { name: "Skill Versatility", desc: "Proficiency in two skills of your choice." }
      ],
      size: "Medium", speed: 30,
      bestClasses: ["Bard", "Paladin", "Sorcerer", "Warlock"],
      color: "#7a6e9e"
    },
    {
      id: "half-orc",
      name: "Half-Orc",
      icon: "HO",
      tagline: "Fierce and unrelenting",
      description: "Half-orcs inherit the physical power and fierce determination of their orcish heritage, making them formidable warriors who refuse to stay down.",
      statBonuses: { STR: 2, CON: 1 },
      traits: [
        { name: "Darkvision", desc: "60 ft darkvision." },
        { name: "Menacing", desc: "Proficiency in the Intimidation skill." },
        { name: "Relentless Endurance", desc: "Once per long rest, drop to 1 HP instead of 0." },
        { name: "Savage Attacks", desc: "On a critical hit with a melee weapon, add one extra damage die." }
      ],
      size: "Medium", speed: 30,
      bestClasses: ["Barbarian", "Fighter", "Paladin", "Ranger"],
      color: "#6b7a3a"
    },
    {
      id: "tiefling",
      name: "Tiefling",
      icon: "T",
      tagline: "Infernal heritage, iron will",
      description: "Bearing horns, a tail, and glowing eyes as marks of their infernal bloodline, tieflings face distrust—but wield innate magical power and formidable charisma.",
      statBonuses: { INT: 1, CHA: 2 },
      traits: [
        { name: "Darkvision", desc: "60 ft darkvision." },
        { name: "Hellish Resistance", desc: "Resistance to fire damage." },
        { name: "Infernal Legacy", desc: "Know Thaumaturgy cantrip; at 3rd level Hellish Rebuke; at 5th level Darkness." }
      ],
      size: "Medium", speed: 30,
      bestClasses: ["Warlock", "Sorcerer", "Bard", "Paladin"],
      color: "#8b3a3a"
    },
    {
      id: "dragonborn",
      name: "Dragonborn",
      icon: "Dr",
      tagline: "Draconic power and pride",
      description: "Dragonborn are proud warriors who bear the blood of dragons. They can breathe destructive energy and resist the damage type of their draconic ancestry.",
      statBonuses: { STR: 2, CHA: 1 },
      traits: [
        { name: "Breath Weapon", desc: "Exhale destructive energy (your ancestry type). Recharges on short or long rest." },
        { name: "Damage Resistance", desc: "Resistance to the damage type of your draconic ancestry." },
        { name: "Draconic Ancestry", desc: "Choose a dragon type: Black (acid), Blue (lightning), Gold (fire), Silver (cold), etc." }
      ],
      size: "Medium", speed: 30,
      bestClasses: ["Paladin", "Fighter", "Sorcerer", "Barbarian"],
      color: "#8b5a1a"
    },
    {
      id: "gnome",
      name: "Gnome",
      icon: "G",
      tagline: "Clever, curious, inventive",
      description: "Gnomes are small, energetic folk with an insatiable curiosity. Their natural intelligence and magic resistance make them excellent scholars and tinkerers.",
      statBonuses: { INT: 2 },
      subRaces: [
        { name: "Forest Gnome", bonuses: { DEX: 1 }, extra: "Speak with small animals; Minor Illusion cantrip" },
        { name: "Rock Gnome", bonuses: { CON: 1 }, extra: "Artificer's Lore, Tinker—create small gadgets" }
      ],
      traits: [
        { name: "Darkvision", desc: "60 ft darkvision." },
        { name: "Gnome Cunning", desc: "Advantage on INT, WIS, and CHA saving throws against magic." }
      ],
      size: "Small", speed: 25,
      bestClasses: ["Wizard", "Artificer", "Bard", "Cleric"],
      color: "#5a7a8b"
    }
  ],

  classes: [
    {
      id: "fighter",
      name: "Fighter",
      icon: "⚔",
      tagline: "Master of martial combat",
      description: "Fighters are versatile warriors proficient with all armor and weapons. Whether you prefer heavy armor and shields or dual-wielding blades, the Fighter excels at direct combat.",
      hitDie: "d10",
      primaryAbility: ["STR", "DEX"],
      savingThrows: ["STR", "CON"],
      armorProf: "All armor, shields",
      weaponProf: "Simple and martial weapons",
      keyFeatures: [
        { level: 1, name: "Fighting Style", desc: "Choose a style: Archery, Defense, Dueling, Great Weapon Fighting, Protection, or Two-Weapon Fighting." },
        { level: 1, name: "Second Wind", desc: "Bonus action to regain 1d10 + Fighter level HP. Recharges on short rest." },
        { level: 2, name: "Action Surge", desc: "Take one additional action on your turn. Once per short rest (twice at level 17)." },
        { level: 3, name: "Martial Archetype", desc: "Choose a subclass: Battle Master, Champion, Eldritch Knight, etc." },
        { level: 5, name: "Extra Attack", desc: "Attack twice when you take the Attack action." }
      ],
      difficulty: "Beginner", role: "Frontline Damage / Tank",
      color: "#c8743a"
    },
    {
      id: "wizard",
      name: "Wizard",
      icon: "✦",
      tagline: "Arcane scholar, master of spells",
      description: "Wizards study arcane magic from spellbooks, accumulating an enormous breadth of spells. Fragile but devastatingly powerful at range.",
      hitDie: "d6",
      primaryAbility: ["INT"],
      savingThrows: ["INT", "WIS"],
      armorProf: "None",
      weaponProf: "Daggers, darts, slings, quarterstaffs, light crossbows",
      keyFeatures: [
        { level: 1, name: "Spellcasting (INT)", desc: "Prepare spells from your spellbook. Cast using spell slots. Intelligence is your spellcasting ability." },
        { level: 1, name: "Arcane Recovery", desc: "Recover spell slots totaling half your level (rounded up) on a short rest." },
        { level: 2, name: "Arcane Tradition", desc: "Choose a school of magic: Evocation, Abjuration, Illusion, Necromancy, Divination, etc." },
        { level: 5, name: "3rd-Level Spells", desc: "Unlock powerful spells like Fireball and Counterspell." }
      ],
      difficulty: "Advanced", role: "Ranged Control / Damage",
      color: "#4a6fa5"
    },
    {
      id: "rogue",
      name: "Rogue",
      icon: "◆",
      tagline: "Cunning striker and infiltrator",
      description: "Rogues rely on skill, stealth, and their foes' vulnerabilities to deal precise, devastating blows—then escape unseen. Masters of out-of-combat utility too.",
      hitDie: "d8",
      primaryAbility: ["DEX"],
      savingThrows: ["DEX", "INT"],
      armorProf: "Light armor",
      weaponProf: "Simple weapons, hand crossbows, longswords, rapiers, shortswords",
      keyFeatures: [
        { level: 1, name: "Expertise", desc: "Double proficiency bonus on two skills of your choice." },
        { level: 1, name: "Sneak Attack", desc: "Once per turn, deal extra damage (1d6, scaling) when you have advantage or an ally adjacent to the target." },
        { level: 1, name: "Thieves' Cant", desc: "Know a secret rogue language and set of signals." },
        { level: 2, name: "Cunning Action", desc: "Bonus action to Dash, Disengage, or Hide every turn." },
        { level: 5, name: "Uncanny Dodge", desc: "Use reaction to halve damage from one attack per round." }
      ],
      difficulty: "Intermediate", role: "Striker / Utility / Scout",
      color: "#2a4a3a"
    },
    {
      id: "barbarian",
      name: "Barbarian",
      icon: "◉",
      tagline: "Primal fury, unstoppable force",
      description: "Barbarians enter a battle Rage that makes them fearsome, damage-resistant, and incredibly powerful. Simple, brutal, and hugely effective.",
      hitDie: "d12",
      primaryAbility: ["STR"],
      savingThrows: ["STR", "CON"],
      armorProf: "Light and medium armor, shields",
      weaponProf: "Simple and martial weapons",
      keyFeatures: [
        { level: 1, name: "Rage", desc: "Bonus action to enter Rage: +2 damage on STR attacks, resistance to physical damage, advantage on STR checks. Lasts 1 min." },
        { level: 1, name: "Unarmored Defense", desc: "Without armor, AC = 10 + DEX mod + CON mod." },
        { level: 2, name: "Reckless Attack", desc: "Give attackers advantage against you to gain advantage on your own attack roll." },
        { level: 3, name: "Primal Path", desc: "Choose subclass: Berserker, Totem Warrior, Storm Herald, etc." },
        { level: 5, name: "Extra Attack + Fast Movement", desc: "Attack twice per action; +10 ft movement when not wearing heavy armor." }
      ],
      difficulty: "Beginner", role: "Frontline Tank / Damage",
      color: "#8b2a1a"
    },
    {
      id: "bard",
      name: "Bard",
      icon: "♪",
      tagline: "Inspiring performer and jack-of-all-trades",
      description: "Bards use the power of music and story to inspire allies, debilitate enemies, and cast spells. The ultimate support character who can do almost anything.",
      hitDie: "d8",
      primaryAbility: ["CHA"],
      savingThrows: ["DEX", "CHA"],
      armorProf: "Light armor",
      weaponProf: "Simple weapons, hand crossbows, longswords, rapiers, shortswords",
      keyFeatures: [
        { level: 1, name: "Bardic Inspiration", desc: "Bonus action: give an ally a d6 die to add to one roll. Scales with level." },
        { level: 1, name: "Spellcasting (CHA)", desc: "Cast spells from the Bard list. Charisma is your spellcasting ability." },
        { level: 2, name: "Jack of All Trades", desc: "Add half proficiency bonus to any ability check you're not already proficient in." },
        { level: 3, name: "Bard College", desc: "Choose subclass: Lore, Valor, Glamour, Swords, Whispers, etc." },
        { level: 5, name: "Font of Inspiration", desc: "Regain Bardic Inspiration on short rests. Inspiration die becomes d8." }
      ],
      difficulty: "Intermediate", role: "Support / Utility / Control",
      color: "#6b3a8b"
    },
    {
      id: "cleric",
      name: "Cleric",
      icon: "✛",
      tagline: "Divine champion and healer",
      description: "Clerics are powerful divine spellcasters who serve their deity. They can heal, buff, debuff, and wear heavy armor—often the backbone of any party.",
      hitDie: "d8",
      primaryAbility: ["WIS"],
      savingThrows: ["WIS", "CHA"],
      armorProf: "All armor, shields",
      weaponProf: "Simple weapons",
      keyFeatures: [
        { level: 1, name: "Spellcasting (WIS)", desc: "Prepare divine spells each day. Wisdom is your spellcasting ability." },
        { level: 1, name: "Divine Domain", desc: "Choose a domain: Life, Light, War, Trickery, Knowledge, Nature, Tempest, etc. Grants bonus spells and features." },
        { level: 2, name: "Channel Divinity", desc: "Use divine power for special effects (e.g., Turn Undead or domain-specific ability). Recharges on short rest." },
        { level: 5, name: "Destroy Undead", desc: "Undead of CR 1/2 or lower are destroyed outright by your Turn Undead." }
      ],
      difficulty: "Intermediate", role: "Healer / Support / Tank",
      color: "#8b7a1a"
    },
    {
      id: "paladin",
      name: "Paladin",
      icon: "✦",
      tagline: "Holy warrior with sacred oaths",
      description: "Paladins combine martial prowess with divine magic, bound by a sacred oath. They smite evil, protect allies, and inspire their party through sheer force of conviction.",
      hitDie: "d10",
      primaryAbility: ["STR", "CHA"],
      savingThrows: ["WIS", "CHA"],
      armorProf: "All armor, shields",
      weaponProf: "Simple and martial weapons",
      keyFeatures: [
        { level: 1, name: "Divine Sense", desc: "Detect undead, fiends, and celestials within 60 ft." },
        { level: 1, name: "Lay on Hands", desc: "Pool of HP equal to 5 × Paladin level; touch to heal any amount from that pool." },
        { level: 2, name: "Divine Smite", desc: "Expend a spell slot on a hit: deal extra 2d8 radiant damage (+ 1d8 per slot level above 1st)." },
        { level: 2, name: "Spellcasting (CHA)", desc: "Prepare paladin spells. Charisma is your spellcasting ability." },
        { level: 3, name: "Sacred Oath", desc: "Choose your oath: Devotion, Ancients, Vengeance, Conquest, etc. Unlocks oath spells + Channel Divinity." }
      ],
      difficulty: "Intermediate", role: "Frontline / Healer / Damage",
      color: "#c8a93a"
    },
    {
      id: "ranger",
      name: "Ranger",
      icon: "◎",
      tagline: "Skilled hunter of the wild",
      description: "Rangers are hunters and trackers who blend martial skill with nature magic. They excel in their favored terrain and against their chosen foes.",
      hitDie: "d10",
      primaryAbility: ["DEX", "WIS"],
      savingThrows: ["STR", "DEX"],
      armorProf: "Light and medium armor, shields",
      weaponProf: "Simple and martial weapons",
      keyFeatures: [
        { level: 1, name: "Favored Enemy", desc: "Choose a creature type; bonus to track, recall info, and advantage on some checks against them." },
        { level: 1, name: "Natural Explorer", desc: "Choose a favored terrain; gain benefits while traveling and surviving there." },
        { level: 2, name: "Spellcasting (WIS)", desc: "Cast ranger spells from the ranger list. Wisdom is your spellcasting ability." },
        { level: 3, name: "Ranger Archetype", desc: "Choose: Hunter, Beast Master, Gloom Stalker, Horizon Walker, etc." },
        { level: 5, name: "Extra Attack", desc: "Attack twice when you take the Attack action." }
      ],
      difficulty: "Intermediate", role: "Ranged Damage / Scout / Utility",
      color: "#3a6b3a"
    },
    {
      id: "druid",
      name: "Druid",
      icon: "❧",
      tagline: "Shapeshifter and nature's guardian",
      description: "Druids are nature priests who commune with the wild. They cast powerful nature magic and can transform into animals using Wild Shape.",
      hitDie: "d8",
      primaryAbility: ["WIS"],
      savingThrows: ["INT", "WIS"],
      armorProf: "Light and medium armor (no metal), shields",
      weaponProf: "Clubs, daggers, darts, javelins, maces, quarterstaffs, scimitars, sickles, slings, spears",
      keyFeatures: [
        { level: 1, name: "Druidic", desc: "Know the secret Druidic language." },
        { level: 1, name: "Spellcasting (WIS)", desc: "Prepare nature spells. Wisdom is your spellcasting ability." },
        { level: 2, name: "Wild Shape", desc: "Transform into a beast you've seen. CR limit scales with level. Twice per short rest." },
        { level: 2, name: "Druid Circle", desc: "Choose subclass: Circle of the Land, Moon, Spores, Stars, Wildfire, etc." }
      ],
      difficulty: "Intermediate", role: "Shapeshifter / Caster / Utility",
      color: "#4a7a2a"
    },
    {
      id: "monk",
      name: "Monk",
      icon: "◈",
      tagline: "Disciplined martial artist",
      description: "Monks channel their inner Ki to perform extraordinary feats. Fast, mobile, and deadly with their fists—they don't need weapons or armor.",
      hitDie: "d8",
      primaryAbility: ["DEX", "WIS"],
      savingThrows: ["STR", "DEX"],
      armorProf: "None",
      weaponProf: "Simple weapons, shortswords",
      keyFeatures: [
        { level: 1, name: "Unarmored Defense", desc: "AC = 10 + DEX mod + WIS mod when wearing no armor." },
        { level: 1, name: "Martial Arts", desc: "Use DEX for unarmed strikes; unarmed strike damage scales (d4→d10) with level." },
        { level: 2, name: "Ki", desc: "Pool of Ki points = your level. Spend for Flurry of Blows, Patient Defense, Step of the Wind." },
        { level: 2, name: "Unarmored Movement", desc: "Speed bonus (+10 ft, scaling). Later walk on water and walls." },
        { level: 3, name: "Monastic Tradition", desc: "Choose: Way of the Open Hand, Shadow, Four Elements, Kensei, etc." }
      ],
      difficulty: "Advanced", role: "Skirmisher / Mobile Damage",
      color: "#3a6b7a"
    },
    {
      id: "sorcerer",
      name: "Sorcerer",
      icon: "✧",
      tagline: "Innate magic, raw power",
      description: "Sorcerers have magic in their blood—they don't learn it, they are born with it. They cast fewer spells than wizards but can manipulate them with Metamagic.",
      hitDie: "d6",
      primaryAbility: ["CHA"],
      savingThrows: ["CON", "CHA"],
      armorProf: "None",
      weaponProf: "Daggers, darts, slings, quarterstaffs, light crossbows",
      keyFeatures: [
        { level: 1, name: "Spellcasting (CHA)", desc: "Spells are innate—no spellbook. Charisma is your spellcasting ability." },
        { level: 1, name: "Sorcerous Origin", desc: "Choose your bloodline: Draconic, Wild Magic, Divine Soul, Storm, Shadow, etc." },
        { level: 2, name: "Font of Magic / Sorcery Points", desc: "Pool of sorcery points = your level. Convert to/from spell slots or fuel Metamagic." },
        { level: 3, name: "Metamagic", desc: "Modify spells: Twinned, Quickened, Heightened, Subtle, Distant, Empowered, Extended, Careful." }
      ],
      difficulty: "Intermediate", role: "Blaster / Control",
      color: "#8b3a6b"
    },
    {
      id: "warlock",
      name: "Warlock",
      icon: "◬",
      tagline: "Pact-bound power from beyond",
      description: "Warlocks gain magic through a pact with an otherworldly patron. They have few spell slots but regain them on short rests—plus powerful Eldritch Invocations.",
      hitDie: "d8",
      primaryAbility: ["CHA"],
      savingThrows: ["WIS", "CHA"],
      armorProf: "Light armor",
      weaponProf: "Simple weapons",
      keyFeatures: [
        { level: 1, name: "Otherworldly Patron", desc: "Choose your patron: The Fiend, The Great Old One, The Archfey, The Celestial, etc." },
        { level: 1, name: "Pact Magic (CHA)", desc: "1-2 spell slots (max level) that recharge on short rest. Charisma is your spellcasting ability." },
        { level: 2, name: "Eldritch Invocations", desc: "Gain magical boons—e.g. see in darkness, use Eldritch Blast at-will for big damage, fly, etc." },
        { level: 3, name: "Pact Boon", desc: "Choose: Pact of the Blade (weapon), Chain (familiar), or Tome (cantrips + rituals)." }
      ],
      difficulty: "Intermediate", role: "Blaster / Utility / Control",
      color: "#4a2a6b"
    }
  ],

  abilityScores: [
    {
      id: "STR",
      name: "Strength",
      abbr: "STR",
      color: "#c8743a",
      icon: "◉",
      description: "Raw physical power. Determines how hard you hit, how much you can carry, and how well you can grapple, push, and climb.",
      uses: [
        "Melee weapon attacks and damage (usually)",
        "Athletics skill (climb, jump, swim, grapple)",
        "Carrying capacity and lifting/pushing limits",
        "Breaking objects or forcing doors"
      ],
      skills: ["Athletics"],
      savingThrow: "Resist being pushed, knocked prone, or physically restrained"
    },
    {
      id: "DEX",
      name: "Dexterity",
      abbr: "DEX",
      color: "#4a7a2a",
      icon: "◆",
      description: "Agility, reflexes, and balance. Affects your armor class, ranged attacks, and many physical skills.",
      uses: [
        "Ranged weapon attacks and damage",
        "Finesse melee weapons (rapiers, daggers)",
        "Armor Class when wearing light/medium armor",
        "Initiative roll at the start of combat"
      ],
      skills: ["Acrobatics", "Sleight of Hand", "Stealth"],
      savingThrow: "Dodge fireballs, traps, and area effects"
    },
    {
      id: "CON",
      name: "Constitution",
      abbr: "CON",
      color: "#8b2a1a",
      icon: "◎",
      description: "Endurance and vitality. Affects your hit points and your ability to maintain concentration on spells under stress.",
      uses: [
        "Hit point maximum (CON mod × level added to total HP)",
        "Concentration saves when you take damage while casting",
        "Withstanding disease, poison, and exhaustion"
      ],
      skills: [],
      savingThrow: "Resist poison, disease, death effects"
    },
    {
      id: "INT",
      name: "Intelligence",
      abbr: "INT",
      color: "#4a6fa5",
      icon: "✦",
      description: "Reasoning, memory, and knowledge. The core stat for Wizards and many knowledge-based skills.",
      uses: [
        "Wizard spellcasting ability",
        "Knowledge skills: recall facts, recognize symbols, identify creatures",
        "Investigation: examine evidence and deduce conclusions"
      ],
      skills: ["Arcana", "History", "Investigation", "Nature", "Religion"],
      savingThrow: "Resist mind-reading and knowledge extraction"
    },
    {
      id: "WIS",
      name: "Wisdom",
      abbr: "WIS",
      color: "#4a7c59",
      icon: "❧",
      description: "Perception, intuition, and connection to the world. The core stat for Clerics, Druids, Rangers, and Monks.",
      uses: [
        "Cleric, Druid, Ranger, and Monk spellcasting",
        "Perception: notice things (the most used skill in D&D)",
        "Insight: read people's emotions and intentions",
        "Survival: navigate, hunt, and endure the wilderness"
      ],
      skills: ["Animal Handling", "Insight", "Medicine", "Perception", "Survival"],
      savingThrow: "Resist charm, fear, illusions, and mind control"
    },
    {
      id: "CHA",
      name: "Charisma",
      abbr: "CHA",
      color: "#6b3a8b",
      icon: "♪",
      description: "Force of personality and social grace. Essential for Bards, Paladins, Sorcerers, and Warlocks—and for any character who talks their way out of trouble.",
      uses: [
        "Bard, Paladin, Sorcerer, and Warlock spellcasting",
        "Persuasion, Deception, Intimidation, Performance",
        "Maintaining a disguise or persona",
        "Leading and inspiring others"
      ],
      skills: ["Deception", "Intimidation", "Performance", "Persuasion"],
      savingThrow: "Resist banishment and effects that target your soul"
    }
  ],

  spells: [
    { name: "Fireball", level: 3, school: "Evocation", castingTime: "1 action", range: "150 ft", components: "V, S, M", duration: "Instant", classes: ["Wizard","Sorcerer"], desc: "A bright streak explodes into a 20-ft radius sphere of fire. Each creature makes a DEX save or takes 8d6 fire damage (half on success).",
      roll: { type: "save", save: "DEX", damage: "8d6 fire", upcast: "+1d6 per slot above 3rd" },
      diceNote: "Targets roll 1d20 + DEX modifier vs. your spell save DC (8 + proficiency + spellcasting modifier). You roll 8d6 for damage; success = half damage." },

    { name: "Magic Missile", level: 1, school: "Evocation", castingTime: "1 action", range: "120 ft", components: "V, S", duration: "Instant", classes: ["Wizard","Sorcerer"], desc: "Create 3 darts of magical force. Each dart hits automatically for 1d4+1 force damage. Upcasting adds more darts.",
      roll: { type: "auto", damage: "1d4+1 per dart × 3", upcast: "+1 dart per slot above 1st" },
      diceNote: "No attack roll needed — darts hit automatically. Roll 1d4+1 for each of the 3 darts (or roll 3d4+3 total)." },

    { name: "Thunderwave", level: 1, school: "Evocation", castingTime: "1 action", range: "Self (15-ft cube)", components: "V, S", duration: "Instant", classes: ["Wizard","Druid","Bard","Sorcerer"], desc: "A wave of thunder blasts out. Each creature in a 15-ft cube takes 2d8 thunder damage (CON save for half) and is pushed 10 ft.",
      roll: { type: "save", save: "CON", damage: "2d8 thunder", upcast: "+1d8 per slot above 1st" },
      diceNote: "Targets roll 1d20 + CON modifier vs. your spell save DC. You roll 2d8 for damage; success = half damage." },

    { name: "Cure Wounds", level: 1, school: "Evocation", castingTime: "1 action", range: "Touch", components: "V, S", duration: "Instant", classes: ["Cleric","Druid","Paladin","Ranger","Bard"], desc: "Touch a creature to restore 1d8 + spellcasting modifier HP. No effect on undead or constructs.",
      roll: { type: "heal", healing: "1d8 + spell mod", upcast: "+1d8 per slot above 1st" },
      diceNote: "No roll to hit (touch). Roll 1d8 and add your spellcasting modifier (WIS for Cleric/Druid, CHA for Bard/Paladin)." },

    { name: "Healing Word", level: 1, school: "Evocation", castingTime: "1 bonus action", range: "60 ft", components: "V", duration: "Instant", classes: ["Cleric","Druid","Bard"], desc: "Restore 1d4 + spellcasting modifier HP to a creature you can see. Can be cast as a bonus action.",
      roll: { type: "heal", healing: "1d4 + spell mod", upcast: "+1d4 per slot above 1st" },
      diceNote: "Roll 1d4 + your spellcasting modifier. Great for picking up downed allies — costs only a Bonus Action." },

    { name: "Counterspell", level: 3, school: "Abjuration", castingTime: "1 reaction", range: "60 ft", components: "S", duration: "Instant", classes: ["Wizard","Sorcerer","Warlock"], desc: "Interrupt a spell being cast. Automatically cancels spells of level 3 or lower; higher level spells require an ability check.",
      roll: { type: "conditional", note: "Only if target spell is 4th level+" },
      diceNote: "No roll if target spell ≤ level 3 (auto-cancel). Higher spells: roll 1d20 + spellcasting modifier vs. DC 10 + spell's level. Success cancels the spell." },

    { name: "Shield", level: 1, school: "Abjuration", castingTime: "1 reaction", range: "Self", components: "V, S", duration: "1 round", classes: ["Wizard","Sorcerer"], desc: "React to an incoming attack to gain +5 AC until your next turn (potentially causing the attack to miss).",
      roll: { type: "buff", effect: "+5 AC" },
      diceNote: "No roll. Trigger when targeted by an attack — +5 AC applies retroactively, so it can turn a hit into a miss." },

    { name: "Misty Step", level: 2, school: "Conjuration", castingTime: "1 bonus action", range: "Self", components: "V", duration: "Instant", classes: ["Wizard","Sorcerer","Warlock","Paladin"], desc: "Teleport up to 30 ft to an unoccupied space you can see. Fast, reliable short-range teleportation.",
      roll: { type: "utility", effect: "30 ft teleport" },
      diceNote: "No roll. Just teleport up to 30 ft. Useful for escaping melee or repositioning." },

    { name: "Hypnotic Pattern", level: 3, school: "Illusion", castingTime: "1 action", range: "120 ft", components: "S, M", duration: "Concentration, 1 min", classes: ["Wizard","Sorcerer","Warlock","Bard"], desc: "Create a twisting, colorful pattern. Each creature in a 30-ft cube that sees it must succeed on a WIS save or be incapacitated.",
      roll: { type: "save", save: "WIS", effect: "Incapacitated 1 min" },
      diceNote: "Targets roll 1d20 + WIS modifier vs. your spell save DC. On fail: incapacitated and speed 0 until the spell ends or they take damage. No damage rolls." },

    { name: "Hold Person", level: 2, school: "Enchantment", castingTime: "1 action", range: "60 ft", components: "V, S, M", duration: "Concentration, 1 min", classes: ["Wizard","Cleric","Druid","Bard","Warlock","Sorcerer"], desc: "Paralyze a humanoid. Attacks against a paralyzed creature have advantage and hits within 5 ft are critical hits.",
      roll: { type: "save", save: "WIS", effect: "Paralyzed", upcast: "+1 target per slot above 2nd" },
      diceNote: "Target rolls 1d20 + WIS modifier vs. your spell save DC at cast and at the end of each of their turns. Paralyzed = attacks vs. them have advantage; melee hits are auto-crits." },

    { name: "Speak with Dead", level: 3, school: "Necromancy", castingTime: "1 action", range: "10 ft", components: "V, S, M", duration: "10 minutes", classes: ["Cleric","Bard"], desc: "Grant limited speech to a corpse. Ask up to 5 questions; the spirit only knows what it knew in life.",
      roll: { type: "utility", effect: "5 questions" },
      diceNote: "No roll. The corpse can refuse or lie — the DM roleplays the spirit's answers." },

    { name: "Detect Magic", level: 1, school: "Divination", castingTime: "1 action (ritual)", range: "Self (30 ft)", components: "V, S", duration: "Concentration, 10 min", classes: ["Wizard","Cleric","Druid","Bard","Paladin","Ranger","Sorcerer","Warlock"], desc: "Sense the presence of magic within 30 ft. You can see a faint aura around magical objects and learn the school of magic.",
      roll: { type: "utility", effect: "Detects magic 30 ft" },
      diceNote: "No roll. As a ritual, you can cast it without using a spell slot if you have 10 extra minutes." },

    { name: "Polymorph", level: 4, school: "Transmutation", castingTime: "1 action", range: "60 ft", components: "V, S, M", duration: "Concentration, 1 hr", classes: ["Wizard","Druid","Sorcerer","Bard"], desc: "Transform a creature into a new form. Can be used offensively (turn enemy into harmless animal) or to give an ally a powerful beast form.",
      roll: { type: "save", save: "WIS", effect: "Beast form (CR ≤ target level)" },
      diceNote: "Unwilling target rolls 1d20 + WIS modifier vs. your spell save DC. Willing allies skip the save. New form's HP replaces theirs temporarily." },

    { name: "Eldritch Blast", level: 0, school: "Evocation", castingTime: "1 action", range: "120 ft", components: "V, S", duration: "Instant", classes: ["Warlock"], desc: "Warlock's signature cantrip. Shoot 1-4 beams (scaling with level) of crackling energy, each dealing 1d10 force damage. Can be customized with Invocations.",
      roll: { type: "attack", attack: "1d20 + CHA + prof", damage: "1d10 force per beam", upcast: "1 beam at L1, 2 at L5, 3 at L11, 4 at L17" },
      diceNote: "Roll 1d20 + CHA mod + proficiency for EACH beam separately. On a hit, roll 1d10 force damage. Each beam can target a different creature." }
  ],

  actions: [
    {
      category: "Combat Actions",
      items: [
        { name: "Attack", type: "Action", dice: ["1d20 + mod", "weapon die"], diceNote: "Roll d20 + ability mod + proficiency to hit. On hit, roll the weapon's damage die (e.g. 1d8 longsword) + ability mod.", desc: "Make one or more weapon attacks (or unarmed strikes). Number of attacks scales with class and level.", example: "Swing your sword at a goblin." },
        { name: "Cast a Spell", type: "Action / Bonus / Reaction", dice: ["varies"], diceNote: "Each spell has its own dice. Attack spells: 1d20 + mod to hit. Save spells: target rolls 1d20 vs. your spell save DC. Damage varies (e.g. Fireball is 8d6).", desc: "Cast a spell with a casting time of 1 action (or bonus action / reaction for some spells). Expends a spell slot.", example: "Cast Fireball at a cluster of enemies." },
        { name: "Dash", type: "Action", desc: "Double your movement speed for the turn by using your action to sprint.", example: "Sprint 60 ft to reach a fleeing enemy." },
        { name: "Disengage", type: "Action", desc: "Your movement doesn't provoke opportunity attacks for the rest of the turn.", example: "Safely back away from an enemy without getting hit." },
        { name: "Dodge", type: "Action", desc: "Until your next turn, all attack rolls against you have disadvantage, and you have advantage on DEX saves.", example: "Focus on avoiding attacks while allies deal damage." },
        { name: "Help", type: "Action", desc: "Aid an ally in attacking a creature or performing a task—the ally gains advantage on their next roll.", example: "Distract an enemy so your rogue friend has advantage." },
        { name: "Hide", type: "Action", dice: ["1d20 + DEX (Stealth)"], diceNote: "Roll 1d20 + DEX modifier + proficiency (if Stealth-proficient). Compare to enemies' Passive Perception or a contested check.", desc: "Make a Stealth check. If successful, you're hidden—attacks against you have disadvantage and you can attack with advantage.", example: "Duck behind a pillar and prepare to ambush." },
        { name: "Ready", type: "Action", desc: "Prepare an action to trigger under specific conditions. Set a trigger and a reaction to execute when it occurs.", example: "Ready to shoot the enemy the moment it opens the door." },
        { name: "Search", type: "Action", dice: ["1d20 + WIS/INT"], diceNote: "Roll 1d20 + WIS (Perception) to notice something, or + INT (Investigation) to deduce something. Add proficiency if applicable.", desc: "Make a Perception or Investigation check to find something.", example: "Search the room for traps or secret doors." },
        { name: "Use an Object", type: "Action", desc: "Interact with a second object on your turn (first is free), or use an item that requires more care.", example: "Drink a potion or pick a lock." },
        { name: "Grapple", type: "Action (Attack)", dice: ["contested 1d20"], diceNote: "You roll 1d20 + STR (Athletics) vs. target's 1d20 + STR (Athletics) or DEX (Acrobatics)—their choice. Higher total wins.", desc: "Use one of your attacks to grapple a creature (STR Athletics vs. opponent's Athletics or Acrobatics). Grappled creatures have 0 speed.", example: "Grab an enemy to hold them in place." },
        { name: "Shove", type: "Action (Attack)", dice: ["contested 1d20"], diceNote: "You roll 1d20 + STR (Athletics) vs. target's STR (Athletics) or DEX (Acrobatics). On success, push 5 ft or knock prone.", desc: "Use one attack to push a creature 5 ft or knock it prone (STR Athletics vs. opponent's Athletics or Acrobatics).", example: "Push an enemy off a ledge or knock them down." }
      ]
    },
    {
      category: "Bonus Actions",
      items: [
        { name: "Off-Hand Attack", type: "Bonus Action", dice: ["1d20 + mod", "weapon die"], diceNote: "Same as the main Attack roll, but don't add your ability modifier to damage (unless negative).", desc: "After attacking with a light melee weapon, make a second attack with a different light melee weapon (no damage modifier).", example: "Attack with a shortsword, then attack again with a dagger." },
        { name: "Cunning Action (Rogue)", type: "Bonus Action", desc: "Rogues can Dash, Disengage, or Hide as a bonus action.", example: "Hide after attacking, making the next attack with advantage." },
        { name: "Rage (Barbarian)", type: "Bonus Action", desc: "Enter a battle Rage for +2 damage, physical resistance, and advantage on STR checks/saves.", example: "Fly into a rage before charging into melee." },
        { name: "Second Wind (Fighter)", type: "Bonus Action", dice: ["1d10 + level"], diceNote: "Roll 1d10 and add your Fighter level to determine HP regained.", desc: "Regain 1d10 + Fighter level HP once per short rest.", example: "Heal yourself mid-fight without needing a healer nearby." },
        { name: "Healing Word (Spell)", type: "Bonus Action", dice: ["1d4 + mod"], diceNote: "Roll 1d4 and add your spellcasting modifier (WIS for Cleric/Druid, CHA for Bard). Scales with spell slot level.", desc: "Heal an ally within 60 ft for 1d4 + spellcasting mod HP. Excellent for picking up downed allies.", example: "Snap an ally back to consciousness from across the battlefield." }
      ]
    },
    {
      category: "Reactions",
      items: [
        { name: "Opportunity Attack", type: "Reaction", dice: ["1d20 + mod", "weapon die"], diceNote: "A single melee attack roll, same as a normal attack. Doesn't use your Action.", desc: "When a creature you can see leaves your reach, use your reaction to make one melee attack against it.", example: "Strike a fleeing enemy as they try to run away." },
        { name: "Shield (Spell)", type: "Reaction", desc: "React to being attacked; gain +5 AC until your next turn (potentially making the attack miss).", example: "Flash a magical barrier the instant before an arrow hits." },
        { name: "Counterspell", type: "Reaction", dice: ["1d20 + casting mod (sometimes)"], diceNote: "If the target spell's level is ≤ 3, no roll needed. For higher level spells, make an ability check: 1d20 + spellcasting modifier vs. DC 10 + spell level.", desc: "Interrupt a spell being cast by a creature you can see within 60 ft.", example: "Prevent the enemy wizard from casting Fireball on your party." },
        { name: "Uncanny Dodge (Rogue)", type: "Reaction", desc: "Halve the damage of one attack per round from an attacker you can see.", example: "Roll with the blow and take only half damage." }
      ]
    },
    {
      category: "Free & Movement",
      items: [
        { name: "Free Object Interaction", type: "Free", desc: "Once per turn, interact with one object for free (open a door, draw a weapon, pick up an item).", example: "Draw your sword as part of your movement, then attack." },
        { name: "Movement", type: "Free", desc: "Move up to your speed in any direction, splitting it before/during/after actions. Difficult terrain costs double movement.", example: "Move 15 ft, attack, then move another 15 ft." },
        { name: "Talk / Communicate", type: "Free", desc: "Speak a few words as part of your turn (brief, in character).", example: "Shout a battle cry or give an ally a quick warning." }
      ]
    }
  ],

  rounds: {
    overview: "A round of combat in D&D lasts about 6 seconds in the game world. Every creature involved in the fight takes one turn per round, in initiative order. The round ends when everyone has acted, then a new round begins.",
    initiative: {
      title: "Initiative",
      desc: "At the start of combat, everyone rolls 1d20 + their DEX modifier. The DM lists everyone from highest to lowest—that's the order you'll take turns in, every round, until combat ends.",
      dice: "1d20 + DEX modifier",
      tip: "Higher DEX = act sooner. Ties between PCs and monsters: the DM decides or a re-roll."
    },
    turnFlow: [
      { step: 1, name: "Decide your goal", desc: "Look at the battlefield. Who's hurting? Where are the enemies? What does your character want this round?" },
      { step: 2, name: "Move (up to your Speed)", desc: "You can move up to your Speed in feet (most races: 30 ft). You can split this movement—move a little, attack, then move again. Difficult terrain costs double." },
      { step: 3, name: "Take one Action", desc: "This is your main thing for the turn: Attack, Cast a Spell, Dash, Dodge, Hide, Help, etc. You only get ONE per turn (unless a feature like Action Surge gives more)." },
      { step: 4, name: "Maybe a Bonus Action", desc: "Only if you have a feature or spell that uses one (e.g. Rogue's Cunning Action, Healing Word, Two-Weapon Fighting). Not every turn has one." },
      { step: 5, name: "Free Object Interaction", desc: "Once per turn, you can interact with one object for free—draw a weapon, open a door, pick up a torch. A second interaction would cost your Action (Use an Object)." },
      { step: 6, name: "End your turn", desc: "Anything ongoing happens (saving throws against poison, conditions ending, etc.). Then play passes to the next person in initiative order." }
    ],
    reactionsNote: "Reactions are special: you get ONE per round, and you can use it on ANYONE's turn, including your own. Examples: Opportunity Attack when an enemy leaves your reach, Counterspell when a wizard starts casting, the Shield spell when you're hit. Once used, you can't react again until the start of your next turn.",
    movementRules: [
      { name: "Splitting movement", desc: "You don't have to move all at once. Move 10 ft, attack, then move another 20 ft if you want." },
      { name: "Difficult terrain", desc: "Mud, rubble, dense brush, etc. costs 2 ft of movement per 1 ft traveled." },
      { name: "Standing up from prone", desc: "Costs half your movement." },
      { name: "Climbing & swimming", desc: "Also costs double movement unless you have a special speed for it." },
      { name: "Dash action", desc: "Use your Action to double your movement for the turn (so 30 ft speed = 60 ft total)." }
    ],
    commonQuestions: [
      { q: "Can I move, then attack, then move again?", a: "Yes! You can split your movement around your Action however you like." },
      { q: "Does moving cost an Action?", a: "No. Moving up to your Speed is FREE every turn. Only sprinting beyond your Speed (the Dash action) uses your Action." },
      { q: "How far can I walk per turn?", a: "Your Speed in feet. Most races: 30 ft. Dwarves & halflings: 25 ft. Some elves: 35 ft. Dash doubles this for one turn." },
      { q: "Can I do two Actions in one turn?", a: "Normally no. The Fighter's Action Surge feature is a notable exception—it lets you take a second Action." },
      { q: "What's the difference between an Action and a Bonus Action?", a: "An Action is your one main thing per turn. A Bonus Action is a SECONDARY thing, only available when a specific spell or class feature provides one. You can't 'spend' your Action to get a Bonus Action." },
      { q: "Can I drink a potion AND attack?", a: "Yes, but the potion uses your Action (it's a 'Use an Object'). Unless your DM rules drinking a potion as a Bonus Action (a common house rule)." },
      { q: "What if I do nothing on my turn?", a: "You can also choose to do nothing—or use your action to Ready an action for a specific trigger." }
    ]
  },

  pairings: {
    // [raceId][classId] = { synergy: 1-5, summary, highlights }
    "human": {
      "fighter": { synergy: 5, summary: "The classic hero archetype. Extra feat (Variant Human) + Action Surge = a combat powerhouse right from level 1.", highlights: ["Variant Feat: Great Weapon Master or Polearm Master", "All stats boosted for versatility", "Strongest early-game fighter build"] },
      "wizard": { synergy: 4, summary: "Flexible stats let you boost INT and CON. The extra skill and feat open roleplay and survivability options.", highlights: ["Feat: War Caster (maintain concentration)", "Well-rounded for social & arcane challenges", "Extra language for world exploration"] },
      "rogue": { synergy: 4, summary: "Extra skill proficiency amplifies Expertise. Variant feat (Alert or Lucky) shores up weaknesses.", highlights: ["More skills than any other race/class combo", "Feat: Skulker or Alert for better ambushes"] },
      "paladin": { synergy: 5, summary: "Variant human Feat (War Caster or Sentinel) makes Paladin even stronger from the start.", highlights: ["Sentinel + Smite = devastating melee control", "Stat boosts keep STR, CHA, and CON viable"] },
      "barbarian": { synergy: 4, summary: "Bonus stats across the board keep multiple combat stats viable.", highlights: ["Variant feat: Tough for massive HP pool", "Flexibility to build STR + CON + decent WIS"] },
      "bard": { synergy: 4, summary: "Extra skills and feat give Bards the social and utility coverage they thrive on.", highlights: ["Feat: Actor or Inspiring Leader", "Most skilled character in the game"] },
      "cleric": { synergy: 4, summary: "Flexible stat boosts accommodate any Domain's needs. Extra feat for War Caster.", highlights: ["Feat: War Caster for concentration spells in heavy armor", "All-rounder for any domain"] },
      "ranger": { synergy: 3, summary: "Solid generalist; Variant feat enhances combat specialty.", highlights: ["Feat: Sharpshooter for archer builds", "Extra skill covers wilderness and social needs"] },
      "druid": { synergy: 3, summary: "Extra stats and feat help the normally fragile druid survive.", highlights: ["Feat: War Caster for concentration spells", "Extra language useful for nature roleplay"] },
      "monk": { synergy: 4, summary: "Variant feat fills Monk's gaps; extra skill supports out-of-combat utility.", highlights: ["Feat: Mobile for even more movement", "Well-rounded for DEX + WIS balance"] },
      "sorcerer": { synergy: 3, summary: "Variant feat shores up concentration and survivability.", highlights: ["Feat: War Caster or Resilient (CON)", "Flexible for any Sorcerous Origin"] },
      "warlock": { synergy: 4, summary: "Variant feat + bonus skill = versatile Warlock who excels in and out of combat.", highlights: ["Feat: Elven Accuracy equivalent via Actor", "Extra language for social charade builds"] }
    },
    "elf": {
      "fighter": { synergy: 3, summary: "DEX bonus makes an agile fighter (Archery or two-weapon style) work well.", highlights: ["High Elf: INT for Eldritch Knight", "Wood Elf: WIS + stealth for guerrilla fighter"] },
      "wizard": { synergy: 5, summary: "High Elf bonus INT + Wizard INT = a potent scholar. One free cantrip is a bonus for versatility.", highlights: ["High Elf cantrip: Booming Blade or Green-Flame Blade", "Perception proficiency = hard to surprise", "Trance means less 'real' downtime"] },
      "rogue": { synergy: 5, summary: "Wood Elf: DEX + stealth + mask of the wild = the definitive sneaky rogue.", highlights: ["Mask of the Wild for urban/natural stealth", "Perception + Stealth proficiencies built in", "Ideal for Assassin or Arcane Trickster"] },
      "ranger": { synergy: 5, summary: "Wood Elf + Ranger is a D&D classic. DEX, WIS, stealth, and speed perfectly match Ranger needs.", highlights: ["Perfect stat synergy", "Mask of the Wild for ambushes", "High Elf with Ranger spells: great arcane archer"] },
      "cleric": { synergy: 3, summary: "Elf Clerics are uncommon but functional, especially with Wood Elf WIS bonus.", highlights: ["Wood Elf: WIS for spellcasting", "Fey Ancestry protects the squishy divine caster"] },
      "druid": { synergy: 4, summary: "Wood Elf WIS + nature theme = a thematic and powerful Druid.", highlights: ["WIS for spellcasting", "Mask of the Wild for natural stealth", "Speed bonus helps the often-slow druid"] },
      "monk": { synergy: 4, summary: "DEX + WIS (High Elf INT or Wood Elf WIS) both feed Monk. Fey Ancestry adds charm immunity.", highlights: ["High speed works great with Monk movement", "Unarmored Defense needs DEX + WIS—Elf provides both"] },
      "bard": { synergy: 3, summary: "High Elf's cantrip adds a touch of magic to the Bard's toolkit.", highlights: ["Perception proficiency = high Passive Perception", "Free cantrip supplements Bard's spell list"] },
      "barbarian": { synergy: 2, summary: "Elves are typically more suited to finesse combat; Barbarian wants STR.", highlights: ["Works with DEX-focused Barbarian build", "Fey Ancestry protects against charm in Rage"] },
      "paladin": { synergy: 3, summary: "High Elf Paladin is a stylish arcane knight, though STR may need boosting.", highlights: ["High Elf free cantrip pairs with smite", "Charisma needs boosting; plan ASIs carefully"] },
      "sorcerer": { synergy: 3, summary: "Drow Elf + Sorcerer (Draconic) is a powerful combo, though INT/CHA may conflict for High Elf.", highlights: ["Drow: innate spells + sorcerer spells = broad spell list", "Drow Sorcerer: Spider Climb, Darkness, Faerie Fire"] },
      "warlock": { synergy: 3, summary: "Drow Elf's innate magic complements Warlock's Eldritch Invocations.", highlights: ["Drow: Darkness invocation synergy", "Fey Ancestry protects the often-weak Warlock"] }
    },
    "dwarf": {
      "fighter": { synergy: 4, summary: "Mountain Dwarf STR + CON = a heavily armored tank with great HP.", highlights: ["Mountain Dwarf: armor proficiency + STR", "Dwarven Resilience for poison-heavy encounters"] },
      "cleric": { synergy: 5, summary: "Hill Dwarf WIS + CON is the quintessential Cleric chassis—tough, wise, and divinely potent.", highlights: ["Hill Dwarf: +1 WIS + bonus HP per level", "Extra HP + CON = hardest-to-kill healer", "War Domain + heavy armor = combat cleric"] },
      "barbarian": { synergy: 4, summary: "Mountain Dwarf STR + CON = massive HP and great attack rolls.", highlights: ["STR 2, CON 2 = best Barbarian stat boosts", "Poison resistance pairs well with reckless combat"] },
      "paladin": { synergy: 4, summary: "CON helps concentration; STR (Mountain) drives melee smites.", highlights: ["Mountain Dwarf: STR + CON + armor = tank Paladin", "Dwarven Resilience adds robustness"] },
      "wizard": { synergy: 2, summary: "Functional but CON/STR bonuses don't help Wizards much. Survivability is the main benefit.", highlights: ["CON bonus helps concentration saves", "Dwarven Resilience adds a layer of hardiness"] },
      "rogue": { synergy: 2, summary: "Dwarves have racial proficiencies that help, but speed of 25 and no DEX bonus are limiting.", highlights: ["Stone Cunning for dungeon heists", "CON bonus for survivability in tight spots"] },
      "ranger": { synergy: 2, summary: "Functional but not optimal—Rangers want DEX and WIS more than STR.", highlights: ["Mountain Dwarf can do STR-based melee Ranger", "CON helps when concentration spells are targeted"] },
      "monk": { synergy: 2, summary: "Dwarves don't get DEX or WIS bonuses, which are the two key stats for Monks.", highlights: ["25 ft speed is a significant handicap for Monks", "Poison resistance is always useful"] },
      "bard": { synergy: 2, summary: "Dwarf Bards are unusual but memorable—a gruff storyteller with unusual survivability.", highlights: ["Unusual combo = memorable character", "Dwarven Resilience is a nice defensive bonus"] },
      "druid": { synergy: 3, summary: "Hill Dwarf WIS synergizes nicely; the metal armor restriction is moot since Druids avoid it anyway.", highlights: ["Hill Dwarf: +1 WIS for spellcasting", "CON helps druid survive Wild Shape transitions"] },
      "sorcerer": { synergy: 2, summary: "CON saves help maintain concentration but CHA is the Sorcerer's key stat.", highlights: ["CON helps Sorcerer weather concentration checks", "Resilient personality archetype"] },
      "warlock": { synergy: 2, summary: "Thematic oddity; CON helps, but the key Warlock stat is CHA.", highlights: ["CON saves useful for concentration", "Unusual theme with any patron"] }
    },
    "halfling": {
      "rogue": { synergy: 5, summary: "Lucky + DEX + Brave = the best rogue race in the game. Re-rolling 1s is extremely powerful for Sneak Attack.", highlights: ["Lucky prevents catastrophic misses", "Nimbleness: hide behind allies", "Lightfoot: Naturally Stealthy stacks with Rogue's Hide"] },
      "fighter": { synergy: 3, summary: "DEX-based fighter (Archery, Dueling with finesse) works well. Lucky makes crits very consistent.", highlights: ["Lucky prevents rolling 1s on attacks", "Small size can be hindrance for heavy weapons"] },
      "bard": { synergy: 4, summary: "Lightfoot CHA + DEX + Lucky = a charming, hard-to-hit Bard who never fumbles.", highlights: ["Lucky: never fumble a Persuasion check", "Brave: immune to fear effects Bards often face"] },
      "monk": { synergy: 4, summary: "DEX + Lucky + Brave = a surprisingly sturdy Monk who rarely fails at critical moments.", highlights: ["Lucky: re-roll bad ki saves", "Halfling speed of 25 is offset by Monk movement bonus"] },
      "druid": { synergy: 3, summary: "Stout CON bonus helps concentration; Lucky shores up Wild Shape saves.", highlights: ["Stout: CON bonus helps druid spells", "Lucky: re-roll bad concentration saves"] },
      "ranger": { synergy: 3, summary: "DEX and Lucky make for a reliable archer ranger.", highlights: ["Lucky: consistent ranged attacks", "Small size works fine with bows"] },
      "wizard": { synergy: 2, summary: "INT is not boosted, but Lucky and Brave add great defensive value.", highlights: ["Lucky: re-roll critical concentration saves", "Brave: resist fear effects in dangerous situations"] },
      "cleric": { synergy: 2, summary: "Functional but not optimal—Clerics want WIS primarily.", highlights: ["Stout: CON helps concentration and HP", "Lucky: safety net for key saves"] },
      "sorcerer": { synergy: 3, summary: "Lightfoot CHA + Lucky = surprisingly capable Sorcerer.", highlights: ["Lucky: never critically miscast", "Lightfoot CHA bonus helps social sorcery"] },
      "warlock": { synergy: 3, summary: "Lightfoot CHA + Lucky = a compact but capable Warlock.", highlights: ["CHA boost from Lightfoot", "Lucky: reliable Eldritch Blast hits"] },
      "paladin": { synergy: 2, summary: "Halfling size works against heavy weapon Paladins, but a DEX Paladin (finesse sword) is viable.", highlights: ["Lucky: never miss a Smite attack", "CHA boost (Lightfoot) for spellcasting and aura"] },
      "barbarian": { synergy: 2, summary: "Halfling Barbarian is unconventional but Lucky is exceptional for Reckless Attack.", highlights: ["Lucky with Reckless Attack: near-guaranteed hits", "Low STR pool requires careful stat allocation"] }
    },
    "half-elf": {
      "bard": { synergy: 5, summary: "Half-Elf is THE Bard race. +2 CHA, +2 other stats of choice, two free skills, and Fey Ancestry combine perfectly.", highlights: ["+2 CHA directly boosts spellcasting & Inspiration", "Two free skills = most-skilled Bard possible", "DEX + CON via flexible +1s solve all survivability issues"] },
      "warlock": { synergy: 5, summary: "+2 CHA + flexible stats + two free skills makes Half-Elf the top Warlock race.", highlights: ["+2 CHA = stronger Eldritch Blast and saves", "Two skills for roleplay utility", "Fey Ancestry: charm resistance protects key actions"] },
      "sorcerer": { synergy: 5, summary: "+2 CHA is the ideal Sorcerer boost. Two free skills + flexible stats cover every remaining gap.", highlights: ["+2 CHA directly fuels spellcasting", "Flexible +1s: boost CON for concentration + DEX for AC", "Most well-rounded Sorcerer chassis"] },
      "paladin": { synergy: 5, summary: "Half-Elf solves Paladin's stat problem: STR for melee + CHA for spells, both covered.", highlights: ["+2 CHA for Aura of Protection + spellcasting", "Flexible +1s can hit STR and CON", "Two skills = more roleplay options for a face character"] },
      "fighter": { synergy: 3, summary: "Flexible +1s allow a DEX or STR build; CHA opens Eldritch Knight or social utility.", highlights: ["CHA for social situations", "Eldritch Knight: dump INT, boost CHA for a unique build"] },
      "rogue": { synergy: 4, summary: "Two bonus skills + DEX +1 + Fey Ancestry = a socially-adept, survivable Rogue.", highlights: ["Two extra skills pair with Expertise", "Arcane Trickster INT can be boosted via flexible stat"] },
      "wizard": { synergy: 2, summary: "INT not boosted, but the flexible stats allow a decent INT + CON setup.", highlights: ["Flexible +1s: one in INT, one in CON", "Fey Ancestry for charm immunity"] },
      "cleric": { synergy: 3, summary: "Flexible +1 in WIS + CHA bonus for social Clerics (Life, Twilight, Peace domains).", highlights: ["WIS +1 keeps spellcasting strong", "CHA useful for Twilight or Peace Domain roleplay"] },
      "druid": { synergy: 3, summary: "Flexible +1 in WIS + nature-adjacent traits make for a serviceable Druid.", highlights: ["WIS boost for spellcasting", "Two extra skills for wilderness utility"] },
      "barbarian": { synergy: 2, summary: "CHA doesn't help Barbarians much, but flexible +1s can boost STR and CON.", highlights: ["Boost STR and CON; use CHA for roleplay", "Unusual combination with strong narrative potential"] },
      "monk": { synergy: 3, summary: "Flexible +1s for DEX + WIS is ideal Monk territory; two extra skills add utility.", highlights: ["Boost DEX + WIS, both key Monk stats", "Skills complement Monk's martial philosophy"] },
      "ranger": { synergy: 4, summary: "Flexible +1s for DEX + WIS, two skills covering tracking and survival—strong Ranger chassis.", highlights: ["DEX + WIS both key for Ranger", "Two skills fill wilderness proficiency gaps"] }
    },
    "half-orc": {
      "barbarian": { synergy: 5, summary: "STR + CON + Relentless Endurance + Savage Attacks = the most fearsome Barbarian combo.", highlights: ["Savage Attacks: crit damage pairs with Reckless Attack", "Relentless Endurance: survive from 0 HP once per rest", "+2 STR +1 CON matches Barbarian perfectly"] },
      "fighter": { synergy: 5, summary: "STR + CON + Savage Attacks make Half-Orc Fighter a brutal, hard-hitting frontliner.", highlights: ["Savage Attacks with Champion crits = explosive damage", "Relentless Endurance makes you nearly unkillable", "Menacing adds out-of-combat utility"] },
      "paladin": { synergy: 4, summary: "STR drives melee attacks, Savage Attacks enhance smite crits, and Relentless Endurance extends your paladin life.", highlights: ["Smite + Savage Attacks on crit = massive burst damage", "Relentless Endurance as additional near-death save"] },
      "ranger": { synergy: 3, summary: "Melee ranger benefits from STR; Relentless Endurance is a great safety net.", highlights: ["STR-based melee Ranger (Revised/Hunters)", "Menacing for Intimidation-based wilderness encounters"] },
      "cleric": { synergy: 3, summary: "War Cleric or Life Cleric can use STR for a melee combat role.", highlights: ["War Cleric: STR attacks + Relentless Endurance", "Menacing adds intimidation utility for a tough divine warrior"] },
      "monk": { synergy: 2, summary: "DEX and WIS are Monk stats; STR doesn't help. Relentless Endurance is the saving grace.", highlights: ["Relentless Endurance: useful given Monk's lower HP", "Not a natural fit but survivable"] },
      "rogue": { synergy: 2, summary: "Menacing (Intimidation) adds an interesting social angle; STR-based Rogue is uncommon but viable.", highlights: ["Menacing complements an Intimidation-focused build", "Relentless Endurance keeps the rogue from dying mid-heist"] },
      "wizard": { synergy: 1, summary: "STR and CON bonuses don't help Wizards directly. Survivability is the only gain.", highlights: ["Relentless Endurance gives a Wizard one free near-death save", "Thematic: Orc scholar archetype"] },
      "bard": { synergy: 2, summary: "Menacing Bard is a fun archetype—Intimidation proficiency + Charisma is a powerful combo.", highlights: ["Menacing: doubles down on Bard's Charisma skills", "Intimidation Bard: frighten enemies with performance"] },
      "sorcerer": { synergy: 2, summary: "CON helps concentration; Relentless Endurance gives the fragile Sorcerer a safety net.", highlights: ["CON bonus: great for Sorcerer concentration saves", "Relentless Endurance compensates for low Sorcerer HP"] },
      "warlock": { synergy: 2, summary: "A Hexblade Warlock can use STR instead of CHA for attacks (via Hexblade's Curse mechanic).", highlights: ["STR Hexblade is a viable melee Warlock build", "Relentless Endurance excellent for front-line Warlock"] },
      "druid": { synergy: 2, summary: "Wild Shape tanks can use the Relentless Endurance indirectly; WIS is still needed.", highlights: ["Relentless Endurance in beast form can be dramatic", "Thematic: Half-Orc nature shaman"] }
    },
    "tiefling": {
      "warlock": { synergy: 5, summary: "CHA + dark thematic synergy + infernal spells + Darkvision = Warlock perfection.", highlights: ["+2 CHA directly fuels Eldritch Blast and saves", "Hellish Resistance (fire) + Fiend patron = thematic synergy", "Innate spells expand Warlock's limited spell list"] },
      "sorcerer": { synergy: 5, summary: "CHA is Sorcerer's key stat; fire resistance and infernal spells round out the Draconic Bloodline theme.", highlights: ["+2 CHA = strongest possible Sorcerer start", "Hellish Resistance + Draconic (fire) = double fire resistance", "Infernal Legacy adds bonus cantrip and free spells"] },
      "bard": { synergy: 4, summary: "+2 CHA + Darkvision + infernal flavor makes for an unforgettable College of Whispers Bard.", highlights: ["+2 CHA for Inspiration and Spells", "College of Whispers: thematic dark performer", "Darkvision: always see the audience"] },
      "paladin": { synergy: 4, summary: "Oathbreaker Paladin + Tiefling = the iconic anti-hero. CHA boosts both Smite spells and Aura.", highlights: ["+2 CHA for Aura of Protection and Divine Smite slots", "+1 INT for Eldritch Strike if multiclassing", "Oathbreaker/Vengeance theme is a perfect fit"] },
      "rogue": { synergy: 3, summary: "Arcane Trickster can exploit Tiefling spells. Darkvision helps stealth greatly.", highlights: ["+1 INT for Arcane Trickster spellcasting", "Darkvision for stealth in dim environments", "Hellish Rebuke as reaction is great for Rogues"] },
      "wizard": { synergy: 3, summary: "+1 INT helps; Darkvision and innate spells give a Wizard more tools and survivability.", highlights: ["+1 INT bonus to spellcasting", "Infernal Legacy = extra spells without slots", "Thematic: a wizard who delves into forbidden knowledge"] },
      "fighter": { synergy: 2, summary: "Eldritch Knight can use the +1 INT; CHA helps social situations.", highlights: ["+1 INT for Eldritch Knight build", "Hellish Rebuke as a magical counterattack"] },
      "cleric": { synergy: 3, summary: "The tension between infernal heritage and divine calling is compelling. Trickery or Death domain fits.", highlights: ["Innate fire spells complement certain domains", "Darkvision for dungeon clerics"] },
      "barbarian": { synergy: 2, summary: "INT and CHA don't benefit Barbarians, but fire resistance stacks with Rage for incredible fire tanking.", highlights: ["Fire resistance + Rage physical resistance = extreme tank vs fire", "Thematic: rage-fueled infernal warrior"] },
      "druid": { synergy: 2, summary: "Unusual thematic combination; Darkvision and innate spells add some utility.", highlights: ["Unusual and memorable combination", "Darkvision useful for night druids"] },
      "monk": { synergy: 2, summary: "INT/CHA don't help Monks directly, but Darkvision + Hellish Rebuke add useful tools.", highlights: ["Hellish Rebuke as Monk reaction is powerful", "Thematic: Shadow Monk archetype"] },
      "ranger": { synergy: 2, summary: "Darkvision is excellent for Rangers operating at night; limited stat synergy otherwise.", highlights: ["Darkvision: ideal for night stalker builds", "Fire resistance useful against fire-using enemies"] }
    },
    "dragonborn": {
      "paladin": { synergy: 5, summary: "STR + CHA + Breath Weapon + draconic theme = the most iconic Paladin in D&D.", highlights: ["+2 STR for melee attacks", "+1 CHA for Aura of Protection and spellcasting", "Breath Weapon as AOE alternative to Smite"] },
      "fighter": { synergy: 4, summary: "STR + CHA makes an imposing, thematic fighter, especially a Champion with a Breath Weapon backup.", highlights: ["+2 STR = strong melee attacks", "Breath Weapon gives AOE option Fighters normally lack", "Intimidation from CHA is great for roleplay"] },
      "barbarian": { synergy: 4, summary: "STR + Breath Weapon creates a terrifying frontline. Breath Weapon on turn one sets up Raging follow-ups.", highlights: ["+2 STR for Rage-powered attacks", "Breath Weapon recharges on short rest (same as Rage uses)", "Damage resistance + Breath Weapon type resistance = dual protection"] },
      "sorcerer": { synergy: 5, summary: "Draconic Bloodline Sorcerer + Dragonborn of the same ancestry is a perfect thematic and mechanical match.", highlights: ["+1 CHA for spellcasting", "Draconic Resilience (Sorcerer) + Breath Weapon = draconic identity", "Same damage type for resistance and spells"] },
      "warlock": { synergy: 3, summary: "CHA helps Warlock; a dragon-pact Fiend or Great Old One with Dragonborn ancestry is thematic.", highlights: ["+1 CHA for Pact Magic", "Breath Weapon as bonus damage option"] },
      "bard": { synergy: 3, summary: "CHA boost helps Bardic Inspiration and spellcasting. Breath Weapon gives an unexpected AOE tool.", highlights: ["+1 CHA for Inspiration", "Breath Weapon: surprise AOE the enemy won't expect from a Bard"] },
      "ranger": { synergy: 2, summary: "STR Ranger works; Breath Weapon covers AOE gaps in the Ranger spell list.", highlights: ["STR melee Ranger build", "Breath Weapon compensates for limited Ranger AOE"] },
      "cleric": { synergy: 3, summary: "War/Dragon Domain Clerics benefit from STR in melee; Breath Weapon is a bonus.", highlights: ["War Cleric: STR melee attacks", "Breath Weapon: AOE option for a melee Cleric"] },
      "wizard": { synergy: 2, summary: "INT not boosted; mainly survivability and the Breath Weapon as a fallback.", highlights: ["Breath Weapon when spell slots run dry", "Thematic: scholarly dragon scion"] },
      "rogue": { synergy: 2, summary: "Unconventional; STR Rogue is unusual but Breath Weapon adds surprise value.", highlights: ["Breath Weapon when the heist goes wrong", "Intimidating Rogue archetype with CHA"] },
      "monk": { synergy: 2, summary: "STR doesn't help Monks; Breath Weapon is an interesting bonus action option.", highlights: ["Breath Weapon can substitute for Ki abilities", "Thematic: draconic martial artist"] },
      "druid": { synergy: 2, summary: "Nature + dragon is an unusual angle. Breath Weapon gives the Druid an extra combat option.", highlights: ["Druid's metal restriction pairs oddly with draconic pride", "Breath Weapon: useful when Wild Shape isn't ideal"] }
    },
    "gnome": {
      "wizard": { synergy: 5, summary: "INT + Gnome Cunning (advantage on all magic saves) + lore depth = the ultimate Wizard chassis.", highlights: ["+2 INT directly boosts spellcasting", "Gnome Cunning: advantage on INT/WIS/CHA saves vs. magic", "Darkvision for dungeon research"] },
      "artificer": { synergy: 5, summary: "Rock Gnome's Tinker and INT bonus thematically and mechanically align perfectly with the Artificer class.", highlights: ["Rock Gnome Tinker: free clockwork constructs", "+2 INT for infusion and spellcasting", "Most thematic race/class combo in D&D"] },
      "bard": { synergy: 4, summary: "Forest Gnome CHA + Gnome Cunning = a quick-witted Bard who laughs off magical effects.", highlights: ["+2 INT + Forest Gnome DEX for a nimble performer", "Gnome Cunning: resist almost any enchantment", "Minor Illusion cantrip augments Bard illusion toolkit"] },
      "cleric": { synergy: 3, summary: "Rock Gnome CON + INT doesn't align with WIS-based Clerics, but Gnome Cunning is a great defensive bonus.", highlights: ["Gnome Cunning protects the squishy Cleric", "Unusual combination with strong flavor (tinker-priest)"] },
      "rogue": { synergy: 3, summary: "Forest Gnome DEX + Minor Illusion + Gnome Cunning = a sneaky, magically-resistant Arcane Trickster.", highlights: ["Forest Gnome: DEX for sneak attack", "Minor Illusion: create free distractions for Sneak Attack"] },
      "druid": { synergy: 3, summary: "Forest Gnome speaks with animals natively—a perfect nature thematic. Gnome Cunning adds magical defense.", highlights: ["Forest Gnome: Speak with Animals + WIS for spells", "Thematic overlap with nature domain"] },
      "monk": { synergy: 2, summary: "INT doesn't help Monks directly but Gnome Cunning protects against magical stunning.", highlights: ["Gnome Cunning protects against WIS/INT/CHA saves", "Small size = nimble but DEX is more important than INT"] },
      "fighter": { synergy: 2, summary: "Gnome Cunning helps in magical combat; INT can power an Eldritch Knight.", highlights: ["Eldritch Knight: INT bonus directly useful", "Gnome Cunning makes you resilient against spellcasters"] },
      "sorcerer": { synergy: 2, summary: "INT bonus doesn't fuel Sorcerer (needs CHA), but Gnome Cunning is excellent for the fragile Sorcerer.", highlights: ["Gnome Cunning: best magical defense in the game", "Darkvision: see and cast spells in the dark"] },
      "barbarian": { synergy: 1, summary: "INT and CON (Rock) don't strongly support Barbarian, and 25 ft speed is a drawback.", highlights: ["Gnome Cunning doesn't apply while raging (INT-based)", "Rock Gnome CON is helpful for HP"] },
      "warlock": { synergy: 2, summary: "Gnome Cunning makes the Warlock more durable against magical countermeasures.", highlights: ["INT +2 for Great Old One Warlock flavor", "Gnome Cunning protects against enemy casters"] },
      "paladin": { synergy: 1, summary: "STR and CHA are both needed; INT bonus wastes.", highlights: ["Gnome Cunning is a good defensive trait", "Unconventional but memorable character concept"] }
    }
  }
};
