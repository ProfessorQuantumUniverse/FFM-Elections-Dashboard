/**
 * Frankfurt Elections Dashboard - Sample Data
 * Fallback data for testing and when API is unavailable
 */

const SAMPLE_DATA = {
    // Stadtverordnetenwahl - Gemeinde Level
    svGemeinde: [{
        "datum": "15.03.2026",
        "wahl": "Stadtverordnetenwahl",
        "ags": "06412000",
        "gebiet-nr": "0",
        "gebiet-name": "Stadt Frankfurt am Main",
        "max-schnellmeldungen": 453,
        "anz-schnellmeldungen": 453,
        "A1": 428567,
        "A2": 75432,
        "A3": 0,
        "A": 503999,
        "B": 241923,
        "B1": 78456,
        "C": 4521,
        "D": 18147225,
        // Party results
        "D1": 4125678,  // CDU
        "D2": 2987456,  // AfD
        "D3": 3456789,  // SPD
        "D4": 2876543,  // GRÜNE
        "D5": 1234567,  // FDP
        "D6": 987654,   // LINKE
        "D7": 654321,   // Volt
        "D8": 432198,   // BFF
        "D9": 234567,   // PARTEI
        "D10": 123456,  // ÖkoLinX
        "D11": 98765,   // EUROPA LISTE
        "D12": 76543,   // Frankfurter
        "D13": 234567,  // BIG
        "D14": 45678,   // Gartenpartei
        "D15": 34567,   // Piraten
        "D16": 187654,  // FREIE WÄHLER
        "D17": 65432,   // DieFrankfurter
        "D18": 23456,   // MERA25
        "D19": 34567,   // Tierschutz
        "D20": 12345,   // Global Unity
        "D21": 45678,   // Frankfurt-Sozial!
        "D22": 178932,  // BSW
        // Unchanged votes
        "unveraendert_1": 2987456,
        "unveraendert_2": 2345678,
        "unveraendert_3": 2456789,
        "unveraendert_4": 1876543,
        "unveraendert_5": 876543,
        "unveraendert_6": 654321,
        "unveraendert_7": 432100,
        "unveraendert_8": 298765,
        // Changed votes
        "veraendert_1": 765432,
        "veraendert_2": 432198,
        "veraendert_3": 654321,
        "veraendert_4": 654321,
        "veraendert_5": 234567,
        "veraendert_6": 234567,
        "veraendert_7": 154321,
        "veraendert_8": 87654,
        // Panaschierte
        "panasch_1": 372790,
        "panasch_2": 209580,
        "panasch_3": 345679,
        "panasch_4": 345679,
        "panasch_5": 123457,
        "panasch_6": 98766,
        "panasch_7": 67900,
        "panasch_8": 45779
    }],
    
    // Stadtverordnetenwahl - Ortsbezirke Level
    svOrtsbezirke: [
        { "gebiet-nr": "1", "gebiet-name": "Innenstadt I", "A": 28456, "B": 14523, "B1": 5234, "C": 234, "D": 1089225, "D1": 245678, "D2": 123456, "D3": 198765, "D4": 234567, "D5": 87654, "D6": 65432, "D7": 45678, "D8": 32145, "D9": 12345, "D10": 8765, "max-schnellmeldungen": 32, "anz-schnellmeldungen": 32 },
        { "gebiet-nr": "2", "gebiet-name": "Innenstadt II", "A": 32145, "B": 15876, "B1": 5876, "C": 287, "D": 1190700, "D1": 276543, "D2": 134567, "D3": 234567, "D4": 256789, "D5": 98765, "D6": 76543, "D7": 54321, "D8": 34567, "D9": 14567, "D10": 9876, "max-schnellmeldungen": 35, "anz-schnellmeldungen": 35 },
        { "gebiet-nr": "3", "gebiet-name": "Innenstadt III", "A": 29876, "B": 14234, "B1": 4987, "C": 256, "D": 1067550, "D1": 234567, "D2": 123456, "D3": 198765, "D4": 245678, "D5": 76543, "D6": 65432, "D7": 43210, "D8": 32145, "D9": 12345, "D10": 8765, "max-schnellmeldungen": 30, "anz-schnellmeldungen": 30 },
        { "gebiet-nr": "4", "gebiet-name": "Bornheim/Ostend", "A": 54321, "B": 28765, "B1": 9876, "C": 456, "D": 2157375, "D1": 456789, "D2": 234567, "D3": 398765, "D4": 512345, "D5": 176543, "D6": 143210, "D7": 98765, "D8": 56789, "D9": 23456, "D10": 17654, "max-schnellmeldungen": 52, "anz-schnellmeldungen": 52 },
        { "gebiet-nr": "5", "gebiet-name": "Süd", "A": 67890, "B": 32145, "B1": 11234, "C": 523, "D": 2410875, "D1": 534567, "D2": 345678, "D3": 456789, "D4": 476543, "D5": 198765, "D6": 165432, "D7": 87654, "D8": 65432, "D9": 34567, "D10": 19876, "max-schnellmeldungen": 65, "anz-schnellmeldungen": 65 },
        { "gebiet-nr": "6", "gebiet-name": "West", "A": 43210, "B": 19876, "B1": 6543, "C": 356, "D": 1490700, "D1": 345678, "D2": 198765, "D3": 276543, "D4": 234567, "D5": 123456, "D6": 98765, "D7": 65432, "D8": 54321, "D9": 21345, "D10": 13456, "max-schnellmeldungen": 42, "anz-schnellmeldungen": 42 },
        { "gebiet-nr": "7", "gebiet-name": "Mitte-West", "A": 38765, "B": 18234, "B1": 5987, "C": 312, "D": 1367550, "D1": 312345, "D2": 176543, "D3": 245678, "D4": 287654, "D5": 109876, "D6": 87654, "D7": 56789, "D8": 43210, "D9": 17654, "D10": 11234, "max-schnellmeldungen": 38, "anz-schnellmeldungen": 38 },
        { "gebiet-nr": "8", "gebiet-name": "Nord-West", "A": 35678, "B": 17654, "B1": 5432, "C": 298, "D": 1324050, "D1": 345678, "D2": 156789, "D3": 234567, "D4": 265432, "D5": 98765, "D6": 76543, "D7": 54321, "D8": 39876, "D9": 15678, "D10": 10234, "max-schnellmeldungen": 36, "anz-schnellmeldungen": 36 },
        { "gebiet-nr": "9", "gebiet-name": "Mitte-Nord", "A": 41234, "B": 20123, "B1": 6789, "C": 345, "D": 1509225, "D1": 356789, "D2": 187654, "D3": 276543, "D4": 312345, "D5": 119876, "D6": 98765, "D7": 67890, "D8": 45678, "D9": 19876, "D10": 12345, "max-schnellmeldungen": 40, "anz-schnellmeldungen": 40 },
        { "gebiet-nr": "10", "gebiet-name": "Nord-Ost", "A": 52345, "B": 26789, "B1": 8765, "C": 421, "D": 2009175, "D1": 456789, "D2": 234567, "D3": 356789, "D4": 398765, "D5": 165432, "D6": 132109, "D7": 87654, "D8": 67890, "D9": 26789, "D10": 17654, "max-schnellmeldungen": 50, "anz-schnellmeldungen": 50 },
        { "gebiet-nr": "11", "gebiet-name": "Ost", "A": 48765, "B": 23456, "B1": 7654, "C": 389, "D": 1759200, "D1": 398765, "D2": 219876, "D3": 312345, "D4": 356789, "D5": 143210, "D6": 109876, "D7": 76543, "D8": 56789, "D9": 23456, "D10": 14567, "max-schnellmeldungen": 46, "anz-schnellmeldungen": 46 },
        { "gebiet-nr": "12", "gebiet-name": "Kalbach/Riedberg", "A": 23456, "B": 13210, "B1": 3987, "C": 198, "D": 990750, "D1": 298765, "D2": 98765, "D3": 165432, "D4": 187654, "D5": 87654, "D6": 45678, "D7": 34567, "D8": 23456, "D9": 12345, "D10": 7654, "max-schnellmeldungen": 22, "anz-schnellmeldungen": 22 },
        { "gebiet-nr": "13", "gebiet-name": "Nieder-Erlenbach", "A": 8765, "B": 4987, "B1": 1234, "C": 87, "D": 374250, "D1": 109876, "D2": 45678, "D3": 65432, "D4": 67890, "D5": 32145, "D6": 17654, "D7": 12345, "D8": 9876, "D9": 5678, "D10": 3456, "max-schnellmeldungen": 8, "anz-schnellmeldungen": 8 },
        { "gebiet-nr": "14", "gebiet-name": "Harheim", "A": 6543, "B": 3765, "B1": 987, "C": 65, "D": 282750, "D1": 87654, "D2": 34567, "D3": 45678, "D4": 54321, "D5": 23456, "D6": 12345, "D7": 9876, "D8": 7654, "D9": 4321, "D10": 2345, "max-schnellmeldungen": 6, "anz-schnellmeldungen": 6 },
        { "gebiet-nr": "15", "gebiet-name": "Nieder-Eschbach", "A": 12345, "B": 6789, "B1": 1876, "C": 112, "D": 509175, "D1": 143210, "D2": 65432, "D3": 87654, "D4": 98765, "D5": 43210, "D6": 23456, "D7": 17654, "D8": 13456, "D9": 7654, "D10": 4567, "max-schnellmeldungen": 12, "anz-schnellmeldungen": 12 },
        { "gebiet-nr": "16", "gebiet-name": "Bergen-Enkheim", "A": 18765, "B": 9876, "B1": 2876, "C": 156, "D": 740700, "D1": 198765, "D2": 98765, "D3": 132145, "D4": 143210, "D5": 65432, "D6": 34567, "D7": 26789, "D8": 19876, "D9": 10234, "D10": 6543, "max-schnellmeldungen": 18, "anz-schnellmeldungen": 18 }
    ],
    
    // Stadtverordnetenwahl Trend
    svTrend: [{
        "datum": "15.03.2026",
        "wahl": "Stadtverordnetenwahl (Trendwahl)",
        "ags": "06412000",
        "gebiet-nr": "0",
        "gebiet-name": "Stadt Frankfurt am Main",
        "max-schnellmeldungen": 453,
        "anz-schnellmeldungen": 453,
        "A1": 428567,
        "A2": 75432,
        "A": 503999,
        "B": 241923,
        "B1": 78456,
        "Stapel1": 156789,
        "Stapel2": 4521,
        "Stapel4": 80613,
        "Trend_1": 35678,  // CDU
        "Trend_2": 25432,  // AfD
        "Trend_3": 28765,  // SPD
        "Trend_4": 24567,  // GRÜNE
        "Trend_5": 12345,  // FDP
        "Trend_6": 8765,   // LINKE
        "Trend_7": 5432,   // Volt
        "Trend_8": 3987,   // BFF
        "Trend_9": 2345,   // PARTEI
        "Trend_10": 1234   // ÖkoLinX
    }],
    
    // Ausländerbeiratswahl - Gemeinde Level
    abGemeinde: [{
        "datum": "15.03.2026",
        "wahl": "Ausländerbeiratswahl",
        "ags": "06412000",
        "gebiet-nr": "0",
        "gebiet-name": "Stadt Frankfurt am Main",
        "max-schnellmeldungen": 453,
        "anz-schnellmeldungen": 453,
        "A1": 156789,
        "A2": 23456,
        "A": 180245,
        "B": 23456,
        "B1": 8765,
        "C": 456,
        "D": 1725450,
        // Party results (26 lists)
        "D1": 45678,   // SERBISCHE LISTE
        "D2": 32145,   // DieFrankfurter
        "D3": 87654,   // AIV
        "D4": 54321,   // IFL
        "D5": 123456,  // CDU
        "D6": 34567,   // Liberales Deutschland
        "D7": 176543,  // GRÜNE
        "D8": 43210,   // Frankfurter
        "D9": 23456,   // Ukrainische-Diaspora
        "D10": 198765, // SPD
        "D11": 21345,  // Global Unity
        "D12": 156789, // BIG
        "D13": 34567,  // DABI
        "D14": 45678,  // WIR IN FFM
        "D15": 65432,  // Mezopotamya
        "D16": 43210,  // PAU
        "D17": 32145,  // BHARAT
        "D18": 54321,  // FREIE WÄHLER
        "D19": 87654,  // FDP
        "D20": 76543,  // Anadolu
        "D21": 23456,  // Afghanische Liste
        "D22": 45678,  // BFF
        "D23": 34567,  // DAJ ZNAK
        "D24": 21345,  // Chinesische Liste
        "D25": 65432,  // Volt
        "D26": 43210   // LINKE
    }],
    
    // Sample Wahlbezirke (subset)
    svWahlbezirke: [
        { "gebiet-nr": "001", "gebiet-name": "Altstadt Nord", "A": 2345, "B": 1234, "B1": 456, "C": 23, "D": 92550, "max-schnellmeldungen": 1, "anz-schnellmeldungen": 1 },
        { "gebiet-nr": "002", "gebiet-name": "Altstadt Süd", "A": 2567, "B": 1345, "B1": 487, "C": 28, "D": 100875, "max-schnellmeldungen": 1, "anz-schnellmeldungen": 1 },
        { "gebiet-nr": "003", "gebiet-name": "Bahnhofsviertel", "A": 1876, "B": 876, "B1": 298, "C": 19, "D": 65700, "max-schnellmeldungen": 1, "anz-schnellmeldungen": 1 },
        { "gebiet-nr": "010", "gebiet-name": "Gallus Nord", "A": 3456, "B": 1654, "B1": 543, "C": 34, "D": 124050, "max-schnellmeldungen": 1, "anz-schnellmeldungen": 1 },
        { "gebiet-nr": "011", "gebiet-name": "Gallus Süd", "A": 2987, "B": 1432, "B1": 476, "C": 29, "D": 107400, "max-schnellmeldungen": 1, "anz-schnellmeldungen": 1 },
        { "gebiet-nr": "020", "gebiet-name": "Bockenheim West", "A": 4123, "B": 2198, "B1": 687, "C": 41, "D": 164850, "max-schnellmeldungen": 1, "anz-schnellmeldungen": 1 },
        { "gebiet-nr": "021", "gebiet-name": "Bockenheim Ost", "A": 3876, "B": 2012, "B1": 654, "C": 38, "D": 150900, "max-schnellmeldungen": 1, "anz-schnellmeldungen": 1 },
        { "gebiet-nr": "030", "gebiet-name": "Westend Nord", "A": 5234, "B": 2876, "B1": 876, "C": 52, "D": 215700, "max-schnellmeldungen": 1, "anz-schnellmeldungen": 1 },
        { "gebiet-nr": "031", "gebiet-name": "Westend Süd", "A": 4987, "B": 2654, "B1": 798, "C": 48, "D": 199050, "max-schnellmeldungen": 1, "anz-schnellmeldungen": 1 },
        { "gebiet-nr": "040", "gebiet-name": "Nordend West", "A": 4567, "B": 2432, "B1": 734, "C": 45, "D": 182400, "max-schnellmeldungen": 1, "anz-schnellmeldungen": 1 }
    ],

    // Ortsbeiratswahl - Sample data per district (one aggregated row per district)
    obDistricts: {
        'Innenstadt-I': [
            { "gebiet-nr": "101", "gebiet-name": "Altstadt Nord", "A": 3200, "B": 1760, "B1": 620, "C": 32, "D": 132000, "max-schnellmeldungen": 4, "anz-schnellmeldungen": 4,
              "D1": 32400, "D2": 11200, "D3": 19800, "D4": 26600, "D5": 11000, "D6": 8200, "D7": 3200, "D8": 5800, "D9": 4200, "D10": 3400, "D11": 2600, "D12": 3600 },
            { "gebiet-nr": "102", "gebiet-name": "Altstadt Süd", "A": 2900, "B": 1598, "B1": 563, "C": 29, "D": 119850, "max-schnellmeldungen": 4, "anz-schnellmeldungen": 4,
              "D1": 28000, "D2": 10200, "D3": 17800, "D4": 24400, "D5": 10200, "D6": 7600, "D7": 3000, "D8": 5400, "D9": 3800, "D10": 3100, "D11": 2400, "D12": 3950 }
        ],
        'Innenstadt-II': [
            { "gebiet-nr": "201", "gebiet-name": "Bahnhofsviertel", "A": 3500, "B": 1925, "B1": 680, "C": 35, "D": 144375, "max-schnellmeldungen": 5, "anz-schnellmeldungen": 5,
              "D1": 36000, "D2": 13500, "D3": 22000, "D4": 29000, "D5": 13000, "D6": 9500, "D7": 6000, "D8": 4500, "D9": 3750, "D10": 3625, "D11": 3500 }
        ],
        'Innenstadt-III': [
            { "gebiet-nr": "301", "gebiet-name": "Gutleut", "A": 3100, "B": 1705, "B1": 600, "C": 31, "D": 127875, "max-schnellmeldungen": 4, "anz-schnellmeldungen": 4,
              "D1": 30000, "D2": 11000, "D3": 18500, "D4": 26000, "D5": 10500, "D6": 8000, "D7": 4500, "D8": 3500, "D9": 3000, "D10": 2900, "D11": 2875, "D12": 2500, "D13": 2100 }
        ],
        'Bornheim-Ostend': [
            { "gebiet-nr": "401", "gebiet-name": "Bornheim West", "A": 6800, "B": 3740, "B1": 1320, "C": 68, "D": 280500, "max-schnellmeldungen": 8, "anz-schnellmeldungen": 8,
              "D1": 62000, "D2": 28000, "D3": 50000, "D4": 68000, "D5": 22000, "D6": 16000, "D7": 9500, "D8": 7500, "D9": 5500, "D10": 4200, "D11": 2800, "D12": 2400, "D13": 2100 }
        ],
        'Sued': [
            { "gebiet-nr": "501", "gebiet-name": "Sachsenhausen Nord", "A": 7200, "B": 3960, "B1": 1400, "C": 72, "D": 297000, "max-schnellmeldungen": 9, "anz-schnellmeldungen": 9,
              "D1": 68000, "D2": 32000, "D3": 55000, "D4": 72000, "D5": 24000, "D6": 17000, "D7": 10000, "D8": 6500, "D9": 4500, "D10": 2500, "D11": 2200, "D12": 1800, "D13": 1000 }
        ],
        'West': [
            { "gebiet-nr": "601", "gebiet-name": "Bockenheim West", "A": 5400, "B": 2970, "B1": 1050, "C": 54, "D": 222750, "max-schnellmeldungen": 7, "anz-schnellmeldungen": 7,
              "D1": 50000, "D2": 22000, "D3": 38000, "D4": 46000, "D5": 18000, "D6": 13000, "D7": 9000, "D8": 5000, "D9": 3500, "D10": 3000, "D11": 2500, "D12": 4500, "D13": 3750, "D14": 2500, "D15": 2000 }
        ],
        'Mitte-West': [
            { "gebiet-nr": "701", "gebiet-name": "Westend Nord", "A": 4800, "B": 2640, "B1": 930, "C": 48, "D": 198000, "max-schnellmeldungen": 6, "anz-schnellmeldungen": 6,
              "D1": 46000, "D2": 18000, "D3": 32000, "D4": 48000, "D5": 16000, "D6": 11000, "D7": 8000, "D8": 5500, "D9": 3000, "D10": 3500, "D11": 3000, "D12": 4000 }
        ],
        'Nord-West': [
            { "gebiet-nr": "801", "gebiet-name": "Nordend West", "A": 4200, "B": 2310, "B1": 810, "C": 42, "D": 173250, "max-schnellmeldungen": 5, "anz-schnellmeldungen": 5,
              "D1": 48000, "D3": 30000, "D4": 42000, "D5": 16000, "D6": 10000, "D7": 7000, "D8": 6000, "D9": 6250 }
        ],
        'Mitte-Nord': [
            { "gebiet-nr": "901", "gebiet-name": "Nordend Ost", "A": 4600, "B": 2530, "B1": 890, "C": 46, "D": 189750, "max-schnellmeldungen": 6, "anz-schnellmeldungen": 6,
              "D1": 46000, "D2": 19000, "D3": 33000, "D4": 46000, "D5": 17000, "D6": 11000, "D7": 8750, "D8": 5000, "D9": 4000 }
        ],
        'Nord-Ost': [
            { "gebiet-nr": "1001", "gebiet-name": "Dornbusch", "A": 5800, "B": 3190, "B1": 1120, "C": 58, "D": 239250, "max-schnellmeldungen": 7, "anz-schnellmeldungen": 7,
              "D1": 58000, "D2": 24000, "D3": 40000, "D4": 52000, "D5": 20000, "D6": 14000, "D7": 8000, "D8": 7000, "D9": 5000, "D10": 3500, "D11": 4750, "D12": 3000 }
        ],
        'Ost': [
            { "gebiet-nr": "1101", "gebiet-name": "Bornheim Ost", "A": 5400, "B": 2970, "B1": 1050, "C": 54, "D": 222750, "max-schnellmeldungen": 7, "anz-schnellmeldungen": 7,
              "D1": 52000, "D2": 22000, "D3": 38000, "D4": 50000, "D5": 18000, "D6": 13000, "D7": 10000, "D8": 5750, "D9": 6000, "D10": 5000 }
        ],
        'Kalbach-Riedberg': [
            { "gebiet-nr": "1201", "gebiet-name": "Kalbach", "A": 2800, "B": 1540, "B1": 540, "C": 28, "D": 115500, "max-schnellmeldungen": 3, "anz-schnellmeldungen": 3,
              "D1": 38000, "D3": 20000, "D4": 22000, "D5": 10000, "D6": 5500, "D7": 6000, "D8": 4000, "D9": 2500, "D10": 3500, "D11": 3500 }
        ],
        'Nieder-Erlenbach': [
            { "gebiet-nr": "1301", "gebiet-name": "Nieder-Erlenbach", "A": 1100, "B": 660, "B1": 180, "C": 11, "D": 49500, "max-schnellmeldungen": 1, "anz-schnellmeldungen": 1,
              "D1": 18000, "D3": 10000, "D4": 8500, "D5": 5000, "D6": 4000, "D7": 4000 }
        ],
        'Harheim': [
            { "gebiet-nr": "1401", "gebiet-name": "Harheim", "A": 900, "B": 540, "B1": 140, "C": 9, "D": 40500, "max-schnellmeldungen": 1, "anz-schnellmeldungen": 1,
              "D1": 15000, "D3": 8000, "D4": 7000, "D5": 4000, "D6": 3500, "D7": 3000 }
        ],
        'Nieder-Eschbach': [
            { "gebiet-nr": "1501", "gebiet-name": "Nieder-Eschbach", "A": 1600, "B": 960, "B1": 260, "C": 16, "D": 72000, "max-schnellmeldungen": 2, "anz-schnellmeldungen": 2,
              "D1": 24000, "D3": 14000, "D4": 12000, "D5": 7000, "D6": 6000, "D7": 4500, "D8": 4500 }
        ],
        'Bergen-Enkheim': [
            { "gebiet-nr": "1601", "gebiet-name": "Bergen", "A": 2400, "B": 1320, "B1": 420, "C": 24, "D": 99000, "max-schnellmeldungen": 2, "anz-schnellmeldungen": 2,
              "D1": 32000, "D3": 18000, "D4": 16000, "D5": 9000, "D6": 8000, "D7": 5500, "D8": 5500, "D9": 5000 }
        ]
    }
};

// Make sample data available globally
window.SAMPLE_DATA = SAMPLE_DATA;

// Modify the DataLoader to use sample data as fallback
if (typeof DataLoader !== 'undefined') {
    // Helper to mark that sample data was used
    function _markSampleUsed(loader, label) {
        loader.usedSampleData = true;
        console.info(`[Demo-Daten] Verwende Demo-Daten für: ${label}`);
    }

    const originalLoadSVGemeinde = DataLoader.prototype.loadSVGemeinde;
    DataLoader.prototype.loadSVGemeinde = async function() {
        try {
            const data = await originalLoadSVGemeinde.call(this);
            if (data && data.length > 0) return data;
            throw new Error('Empty data');
        } catch (e) {
            _markSampleUsed(this, 'SV Gemeinde');
            return SAMPLE_DATA.svGemeinde;
        }
    };
    
    const originalLoadSVOrtsbezirke = DataLoader.prototype.loadSVOrtsbezirke;
    DataLoader.prototype.loadSVOrtsbezirke = async function() {
        try {
            const data = await originalLoadSVOrtsbezirke.call(this);
            if (data && data.length > 0) return data;
            throw new Error('Empty data');
        } catch (e) {
            _markSampleUsed(this, 'SV Ortsbezirke');
            return SAMPLE_DATA.svOrtsbezirke;
        }
    };
    
    const originalLoadSVWahlbezirke = DataLoader.prototype.loadSVWahlbezirke;
    DataLoader.prototype.loadSVWahlbezirke = async function() {
        try {
            const data = await originalLoadSVWahlbezirke.call(this);
            if (data && data.length > 0) return data;
            throw new Error('Empty data');
        } catch (e) {
            _markSampleUsed(this, 'SV Wahlbezirke');
            return SAMPLE_DATA.svWahlbezirke;
        }
    };
    
    const originalLoadSVTrend = DataLoader.prototype.loadSVTrendGemeinde;
    DataLoader.prototype.loadSVTrendGemeinde = async function() {
        try {
            const data = await originalLoadSVTrend.call(this);
            if (data && data.length > 0) return data;
            throw new Error('Empty data');
        } catch (e) {
            _markSampleUsed(this, 'SV Trend');
            return SAMPLE_DATA.svTrend;
        }
    };
    
    const originalLoadABGemeinde = DataLoader.prototype.loadABGemeinde;
    DataLoader.prototype.loadABGemeinde = async function() {
        try {
            const data = await originalLoadABGemeinde.call(this);
            if (data && data.length > 0) return data;
            throw new Error('Empty data');
        } catch (e) {
            _markSampleUsed(this, 'AB Gemeinde');
            return SAMPLE_DATA.abGemeinde;
        }
    };

    const originalLoadOBDistrict = DataLoader.prototype.loadOBDistrict;
    DataLoader.prototype.loadOBDistrict = async function(districtSlug) {
        try {
            const data = await originalLoadOBDistrict.call(this, districtSlug);
            if (data && data.length > 0) return data;
            throw new Error('Empty data');
        } catch (e) {
            const fallback = SAMPLE_DATA.obDistricts[districtSlug];
            if (fallback) {
                _markSampleUsed(this, `OB ${districtSlug}`);
                return fallback;
            }
            console.warn(`Kein Demo-Datensatz für OB-Bezirk: ${districtSlug}`);
            return [];
        }
    };
}
