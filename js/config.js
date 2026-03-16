/**
 * Frankfurt Elections Dashboard - Configuration
 * Contains all constants, party data, and API endpoints
 */

const CONFIG = {
    // Base URL for election data CSV files (downloaded at deploy time to avoid CORS issues)
    BASE_URL: './data',
    
    // Election date
    ELECTION_DATE: '2026-03-15',
    
    // AGS (Amtlicher Gemeindeschlüssel) for Frankfurt am Main
    AGS: '06412000',
    
    // Data file endpoints (names from open_data.json on the votemanager server)
    ENDPOINTS: {
        // Wahllokale und Straßen
        WAHLLOKALE: 'opendata-wahllokale.csv',
        STRASSEN: 'opendata-strassen.csv',
        
        // Stadtverordnetenwahl (Trendwahl)
        SV_TREND_GEMEINDE: 'Open-Data-06412000-Stadtverordnetenwahl-_Trendwahl_-Gemeinde.csv',
        SV_TREND_ORTSBEZIRKE: 'Open-Data-06412000-Stadtverordnetenwahl-_Trendwahl_-Ortsbezirk.csv',
        SV_TREND_ORTSTEILE: 'Open-Data-06412000-Stadtverordnetenwahl-_Trendwahl_-Ortsteil.csv',
        SV_TREND_GRUPPIERUNGEN: 'Open-Data-06412000-Stadtverordnetenwahl-_Trendwahl_-Gruppierung.csv',
        SV_TREND_WAHLBEZIRKE: 'Open-Data-06412000-Stadtverordnetenwahl-_Trendwahl_-Wahlbezirk.csv',
        
        // Stadtverordnetenwahl
        SV_GEMEINDE: 'Open-Data-06412000-Stadtverordnetenwahl-Gemeinde.csv',
        SV_ORTSBEZIRKE: 'Open-Data-06412000-Stadtverordnetenwahl-Ortsbezirk.csv',
        SV_ORTSTEILE: 'Open-Data-06412000-Stadtverordnetenwahl-Ortsteil.csv',
        SV_GRUPPIERUNGEN: 'Open-Data-06412000-Stadtverordnetenwahl-Gruppierung.csv',
        SV_WAHLBEZIRKE: 'Open-Data-06412000-Stadtverordnetenwahl-Wahlbezirk.csv',
        
        // Ortsbeiratswahlen
        OB_TREND_WAHLBEZIRKE: 'Open-Data-06412000-Ortsbeiratswahl-_Trendwahl_-',
        OB_WAHLBEZIRKE: 'Open-Data-06412000-Ortsbeiratswahl-',
        
        // Ausländerbeiratswahl
        AB_GEMEINDE: 'Open-Data-06412000-Auslaenderbeiratswahl-Gemeinde.csv',
        AB_ORTSBEZIRKE: 'Open-Data-06412000-Auslaenderbeiratswahl-Ortsbezirk.csv',
        AB_ORTSTEILE: 'Open-Data-06412000-Auslaenderbeiratswahl-Ortsteil.csv',
        AB_GRUPPIERUNGEN: 'Open-Data-06412000-Auslaenderbeiratswahl-Gruppierung.csv',
        AB_WAHLBEZIRKE: 'Open-Data-06412000-Auslaenderbeiratswahl-Wahlbezirk.csv'
    },
    
    // Ortsbezirke in Frankfurt
    ORTSBEZIRKE: [
        { id: 1, name: 'Innenstadt I', slug: 'Innenstadt-I' },
        { id: 2, name: 'Innenstadt II', slug: 'Innenstadt-II' },
        { id: 3, name: 'Innenstadt III', slug: 'Innenstadt-III' },
        { id: 4, name: 'Bornheim/Ostend', slug: 'Bornheim-Ostend' },
        { id: 5, name: 'Süd', slug: 'Sued' },
        { id: 6, name: 'West', slug: 'West' },
        { id: 7, name: 'Mitte-West', slug: 'Mitte-West' },
        { id: 8, name: 'Nord-West', slug: 'Nord-West' },
        { id: 9, name: 'Mitte-Nord', slug: 'Mitte-Nord' },
        { id: 10, name: 'Nord-Ost', slug: 'Nord-Ost' },
        { id: 11, name: 'Ost', slug: 'Ost' },
        { id: 12, name: 'Kalbach/Riedberg', slug: 'Kalbach-Riedberg' },
        { id: 13, name: 'Nieder-Erlenbach', slug: 'Nieder-Erlenbach' },
        { id: 14, name: 'Harheim', slug: 'Harheim' },
        { id: 15, name: 'Nieder-Eschbach', slug: 'Nieder-Eschbach' },
        { id: 16, name: 'Bergen-Enkheim', slug: 'Bergen-Enkheim' }
    ],
    
    // Party definitions for Stadtverordnetenwahl
    PARTIES_SV: {
        D1: { name: 'CDU', fullName: 'Christlich Demokratische Union Deutschlands', color: '#000000' },
        D2: { name: 'AfD', fullName: 'Alternative für Deutschland', color: '#009ee0' },
        D3: { name: 'SPD', fullName: 'Sozialdemokratische Partei Deutschlands', color: '#e3000f' },
        D4: { name: 'GRÜNE', fullName: 'BÜNDNIS 90/DIE GRÜNEN', color: '#46962b' },
        D5: { name: 'FDP', fullName: 'Freie Demokratische Partei', color: '#ffed00' },
        D6: { name: 'LINKE', fullName: 'Die Linke', color: '#be3075' },
        D7: { name: 'Volt', fullName: 'Volt Deutschland', color: '#562883' },
        D8: { name: 'BFF', fullName: 'Bürger Für Frankfurt', color: '#ff6600' },
        D9: { name: 'PARTEI', fullName: 'Partei für Arbeit, Rechtsstaat, Tierschutz, Elitenförderung und basisdemokratische Initiative', color: '#b5152b' },
        D10: { name: 'ÖkoLinX', fullName: 'ÖkoLinX', color: '#ff5c5c' },
        D11: { name: 'EUROPA LISTE', fullName: 'EUROPA LISTE FÜR FRANKFURT', color: '#003399' },
        D12: { name: 'Frankfurter', fullName: 'Ich bin ein Frankfurter', color: '#ffa500' },
        D13: { name: 'BIG', fullName: 'Bündnis für Innovation & Gerechtigkeit', color: '#00aa00' },
        D14: { name: 'Gartenpartei', fullName: 'Gartenpartei Frankfurt am Main', color: '#228b22' },
        D15: { name: 'Piraten', fullName: 'Piratenpartei Deutschland', color: '#ff8800' },
        D16: { name: 'FREIE WÄHLER', fullName: 'FREIE WÄHLER', color: '#0066cc' },
        D17: { name: 'DieFrankfurter', fullName: 'DieFrankfurter', color: '#cc6600' },
        D18: { name: 'MERA25', fullName: 'MERA25 - Gemeinsam für Frieden, Solidarität und Freiheit', color: '#ff0066' },
        D19: { name: 'Tierschutz', fullName: 'PARTEI MENSCH UMWELT TIERSCHUTZ', color: '#00bfff' },
        D20: { name: 'Global Unity', fullName: 'Global Unity in Germany', color: '#9932cc' },
        D21: { name: 'Frankfurt-Sozial!', fullName: 'Frankfurt-Sozial!', color: '#ff4500' },
        D22: { name: 'BSW', fullName: 'Bündnis Sahra Wagenknecht - Vernunft und Gerechtigkeit', color: '#8b0000' }
    },
    
    // Ausländerbeiratswahl parties
    PARTIES_AB: {
        D1: { name: 'SERBISCHE LISTE', color: '#1e90ff' },
        D2: { name: 'DieFrankfurter', color: '#cc6600' },
        D3: { name: 'AIV', fullName: 'Ausländische Interessenvertretung', color: '#32cd32' },
        D4: { name: 'IFL', fullName: 'Internationale Freie Liste', color: '#ff69b4' },
        D5: { name: 'CDU', color: '#000000' },
        D6: { name: 'Liberales Deutschland', color: '#ffd700' },
        D7: { name: 'GRÜNE', color: '#46962b' },
        D8: { name: 'Frankfurter', fullName: 'Ich bin ein Frankfurter', color: '#ffa500' },
        D9: { name: 'Ukrainische-Diaspora', color: '#0057b7' },
        D10: { name: 'SPD', color: '#e3000f' },
        D11: { name: 'Global Unity', color: '#9932cc' },
        D12: { name: 'BIG', color: '#00aa00' },
        D13: { name: 'DABI', fullName: 'Deutsche und Ausländer für Bildung, Empowerment und Integration', color: '#20b2aa' },
        D14: { name: 'WIR IN FFM', fullName: 'WIR IN FRANKFURT', color: '#ff6347' },
        D15: { name: 'Mezopotamya', color: '#daa520' },
        D16: { name: 'PAU', fullName: 'Progressive Ausländer Union', color: '#4169e1' },
        D17: { name: 'BHARAT', color: '#ff7f50' },
        D18: { name: 'FREIE WÄHLER', color: '#0066cc' },
        D19: { name: 'FDP', color: '#ffed00' },
        D20: { name: 'Anadolu', color: '#dc143c' },
        D21: { name: 'Afghanische Liste', color: '#228b22' },
        D22: { name: 'BFF', color: '#ff6600' },
        D23: { name: 'DAJ ZNAK', fullName: 'DAJ ZNAK Polnische Dialoginitiative für Frankfurt', color: '#dc143c' },
        D24: { name: 'Chinesische Liste', color: '#de2910' },
        D25: { name: 'Volt', color: '#562883' },
        D26: { name: 'LINKE', color: '#be3075' }
    },
    
    // Per-district party definitions for Ortsbeiratswahl
    // Sourced from OpenDataDocumentation.txt - each district has different party lists
    PARTIES_OB: {
        'Innenstadt-I': {
            D1:  { name: 'CDU',          fullName: 'Christlich Demokratische Union Deutschlands',                                                              color: '#000000' },
            D2:  { name: 'AfD',          fullName: 'Alternative für Deutschland',                                                                              color: '#009ee0' },
            D3:  { name: 'SPD',          fullName: 'Sozialdemokratische Partei Deutschlands',                                                                  color: '#e3000f' },
            D4:  { name: 'GRÜNE',        fullName: 'BÜNDNIS 90/DIE GRÜNEN',                                                                                   color: '#46962b' },
            D5:  { name: 'FDP',          fullName: 'Freie Demokratische Partei',                                                                               color: '#ffed00' },
            D6:  { name: 'LINKE',        fullName: 'Die Linke',                                                                                                color: '#be3075' },
            D7:  { name: 'ÖkoLinX',      fullName: 'ÖkoLinX',                                                                                                 color: '#ff5c5c' },
            D8:  { name: 'BFF',          fullName: 'Bürger Für Frankfurt',                                                                                     color: '#ff6600' },
            D9:  { name: 'DieFrankfurter', fullName: 'DieFrankfurter',                                                                                        color: '#cc6600' },
            D10: { name: 'PARTEI',       fullName: 'Partei für Arbeit, Rechtsstaat, Tierschutz, Elitenförderung und basisdemokratische Initiative',            color: '#b5152b' },
            D11: { name: 'FREIE WÄHLER', fullName: 'FREIE WÄHLER',                                                                                            color: '#0066cc' },
            D12: { name: 'Volt',         fullName: 'Volt Deutschland',                                                                                         color: '#562883' }
        },
        'Innenstadt-II': {
            D1:  { name: 'CDU',          fullName: 'Christlich Demokratische Union Deutschlands',                                                              color: '#000000' },
            D2:  { name: 'AfD',          fullName: 'Alternative für Deutschland',                                                                              color: '#009ee0' },
            D3:  { name: 'SPD',          fullName: 'Sozialdemokratische Partei Deutschlands',                                                                  color: '#e3000f' },
            D4:  { name: 'GRÜNE',        fullName: 'BÜNDNIS 90/DIE GRÜNEN',                                                                                   color: '#46962b' },
            D5:  { name: 'FDP',          fullName: 'Freie Demokratische Partei',                                                                               color: '#ffed00' },
            D6:  { name: 'LINKE',        fullName: 'Die Linke',                                                                                                color: '#be3075' },
            D7:  { name: 'BFF',          fullName: 'Bürger Für Frankfurt',                                                                                     color: '#ff6600' },
            D8:  { name: 'ÖkoLinX',      fullName: 'ÖkoLinX',                                                                                                 color: '#ff5c5c' },
            D9:  { name: 'PARTEI',       fullName: 'Partei für Arbeit, Rechtsstaat, Tierschutz, Elitenförderung und basisdemokratische Initiative',            color: '#b5152b' },
            D10: { name: 'Volt',         fullName: 'Volt Deutschland',                                                                                         color: '#562883' },
            D11: { name: 'FREIE WÄHLER', fullName: 'FREIE WÄHLER',                                                                                            color: '#0066cc' }
        },
        'Innenstadt-III': {
            D1:  { name: 'CDU',          fullName: 'Christlich Demokratische Union Deutschlands',                                                              color: '#000000' },
            D2:  { name: 'AfD',          fullName: 'Alternative für Deutschland',                                                                              color: '#009ee0' },
            D3:  { name: 'SPD',          fullName: 'Sozialdemokratische Partei Deutschlands',                                                                  color: '#e3000f' },
            D4:  { name: 'GRÜNE',        fullName: 'BÜNDNIS 90/DIE GRÜNEN',                                                                                   color: '#46962b' },
            D5:  { name: 'FDP',          fullName: 'Freie Demokratische Partei',                                                                               color: '#ffed00' },
            D6:  { name: 'LINKE',        fullName: 'Die Linke',                                                                                                color: '#be3075' },
            D7:  { name: 'Volt',         fullName: 'Volt Deutschland',                                                                                         color: '#562883' },
            D8:  { name: 'ÖkoLinX',      fullName: 'ÖkoLinX',                                                                                                 color: '#ff5c5c' },
            D9:  { name: 'DieFrankfurter', fullName: 'DieFrankfurter',                                                                                        color: '#cc6600' },
            D10: { name: 'PARTEI',       fullName: 'Partei für Arbeit, Rechtsstaat, Tierschutz, Elitenförderung und basisdemokratische Initiative',            color: '#b5152b' },
            D11: { name: 'BFF',          fullName: 'Bürger Für Frankfurt',                                                                                     color: '#ff6600' },
            D12: { name: 'FREIE WÄHLER', fullName: 'FREIE WÄHLER',                                                                                            color: '#0066cc' },
            D13: { name: 'Gartenpartei', fullName: 'Gartenpartei Frankfurt am Main',                                                                           color: '#228b22' }
        },
        'Bornheim-Ostend': {
            D1:  { name: 'CDU',          fullName: 'Christlich Demokratische Union Deutschlands',                                                              color: '#000000' },
            D2:  { name: 'AfD',          fullName: 'Alternative für Deutschland',                                                                              color: '#009ee0' },
            D3:  { name: 'SPD',          fullName: 'Sozialdemokratische Partei Deutschlands',                                                                  color: '#e3000f' },
            D4:  { name: 'GRÜNE',        fullName: 'BÜNDNIS 90/DIE GRÜNEN',                                                                                   color: '#46962b' },
            D5:  { name: 'FDP',          fullName: 'Freie Demokratische Partei',                                                                               color: '#ffed00' },
            D6:  { name: 'LINKE',        fullName: 'Die Linke',                                                                                                color: '#be3075' },
            D7:  { name: 'Volt',         fullName: 'Volt Deutschland',                                                                                         color: '#562883' },
            D8:  { name: 'DieFrankfurter', fullName: 'DieFrankfurter',                                                                                        color: '#cc6600' },
            D9:  { name: 'ÖkoLinX',      fullName: 'ÖkoLinX',                                                                                                 color: '#ff5c5c' },
            D10: { name: 'PARTEI',       fullName: 'Partei für Arbeit, Rechtsstaat, Tierschutz, Elitenförderung und basisdemokratische Initiative',            color: '#b5152b' },
            D11: { name: 'Gartenpartei', fullName: 'Gartenpartei Frankfurt am Main',                                                                           color: '#228b22' },
            D12: { name: 'BFF',          fullName: 'Bürger Für Frankfurt',                                                                                     color: '#ff6600' },
            D13: { name: 'FREIE WÄHLER', fullName: 'FREIE WÄHLER',                                                                                            color: '#0066cc' }
        },
        'Sued': {
            D1:  { name: 'CDU',          fullName: 'Christlich Demokratische Union Deutschlands',                                                              color: '#000000' },
            D2:  { name: 'AfD',          fullName: 'Alternative für Deutschland',                                                                              color: '#009ee0' },
            D3:  { name: 'SPD',          fullName: 'Sozialdemokratische Partei Deutschlands',                                                                  color: '#e3000f' },
            D4:  { name: 'GRÜNE',        fullName: 'BÜNDNIS 90/DIE GRÜNEN',                                                                                   color: '#46962b' },
            D5:  { name: 'FDP',          fullName: 'Freie Demokratische Partei',                                                                               color: '#ffed00' },
            D6:  { name: 'LINKE',        fullName: 'Die Linke',                                                                                                color: '#be3075' },
            D7:  { name: 'BFF',          fullName: 'Bürger Für Frankfurt',                                                                                     color: '#ff6600' },
            D8:  { name: 'DieFrankfurter', fullName: 'DieFrankfurter',                                                                                        color: '#cc6600' },
            D9:  { name: 'ÖkoLinX',      fullName: 'ÖkoLinX',                                                                                                 color: '#ff5c5c' },
            D10: { name: 'BIG',          fullName: 'Bündnis für Innovation & Gerechtigkeit',                                                                   color: '#00aa00' },
            D11: { name: 'FREIE WÄHLER', fullName: 'FREIE WÄHLER',                                                                                            color: '#0066cc' },
            D12: { name: 'EUROPA LISTE', fullName: 'EUROPA LISTE FÜR FRANKFURT',                                                                               color: '#003399' },
            D13: { name: 'PARTEI',       fullName: 'Partei für Arbeit, Rechtsstaat, Tierschutz, Elitenförderung und basisdemokratische Initiative',            color: '#b5152b' }
        },
        'West': {
            D1:  { name: 'CDU',          fullName: 'Christlich Demokratische Union Deutschlands',                                                              color: '#000000' },
            D2:  { name: 'AfD',          fullName: 'Alternative für Deutschland',                                                                              color: '#009ee0' },
            D3:  { name: 'SPD',          fullName: 'Sozialdemokratische Partei Deutschlands',                                                                  color: '#e3000f' },
            D4:  { name: 'GRÜNE',        fullName: 'BÜNDNIS 90/DIE GRÜNEN',                                                                                   color: '#46962b' },
            D5:  { name: 'FDP',          fullName: 'Freie Demokratische Partei',                                                                               color: '#ffed00' },
            D6:  { name: 'LINKE',        fullName: 'Die Linke',                                                                                                color: '#be3075' },
            D7:  { name: 'BFF',          fullName: 'Bürger Für Frankfurt',                                                                                     color: '#ff6600' },
            D8:  { name: 'PARTEI',       fullName: 'Partei für Arbeit, Rechtsstaat, Tierschutz, Elitenförderung und basisdemokratische Initiative',            color: '#b5152b' },
            D9:  { name: 'Fortschritt',  fullName: 'Partei des Fortschritts',                                                                                  color: '#8b4513' },
            D10: { name: 'FFM-Sozial!',  fullName: 'Frankfurt-Sozial!',                                                                                        color: '#ff4500' },
            D11: { name: 'BIG',          fullName: 'Bündnis für Innovation & Gerechtigkeit',                                                                   color: '#00aa00' },
            D12: { name: 'DieFrankfurter', fullName: 'DieFrankfurter',                                                                                        color: '#cc6600' },
            D13: { name: 'Volt',         fullName: 'Volt Deutschland',                                                                                         color: '#562883' },
            D14: { name: 'EUROPA LISTE', fullName: 'EUROPA LISTE FÜR FRANKFURT',                                                                               color: '#003399' },
            D15: { name: 'FREIE WÄHLER', fullName: 'FREIE WÄHLER',                                                                                            color: '#0066cc' }
        },
        'Mitte-West': {
            D1:  { name: 'CDU',          fullName: 'Christlich Demokratische Union Deutschlands',                                                              color: '#000000' },
            D2:  { name: 'AfD',          fullName: 'Alternative für Deutschland',                                                                              color: '#009ee0' },
            D3:  { name: 'SPD',          fullName: 'Sozialdemokratische Partei Deutschlands',                                                                  color: '#e3000f' },
            D4:  { name: 'GRÜNE',        fullName: 'BÜNDNIS 90/DIE GRÜNEN',                                                                                   color: '#46962b' },
            D5:  { name: 'FDP',          fullName: 'Freie Demokratische Partei',                                                                               color: '#ffed00' },
            D6:  { name: 'farbechten',   fullName: 'die farbechten / Die Linke',                                                                               color: '#be3075' },
            D7:  { name: 'BFF',          fullName: 'Bürger Für Frankfurt',                                                                                     color: '#ff6600' },
            D8:  { name: 'FREIE WÄHLER', fullName: 'FREIE WÄHLER',                                                                                            color: '#0066cc' },
            D9:  { name: 'Gem. Mitte-W', fullName: 'Gemeinsam für Mitte-West',                                                                                 color: '#aaaaaa' },
            D10: { name: 'ÖkoLinX',      fullName: 'ÖkoLinX',                                                                                                 color: '#ff5c5c' },
            D11: { name: 'PARTEI',       fullName: 'Partei für Arbeit, Rechtsstaat, Tierschutz, Elitenförderung und basisdemokratische Initiative',            color: '#b5152b' },
            D12: { name: 'EUROPA LISTE', fullName: 'EUROPA LISTE FÜR FRANKFURT',                                                                               color: '#003399' }
        },
        // Nord-West: AfD did not submit a list for this district's Ortsbeiratswahl (no D2 per documentation)
        'Nord-West': {
            D1:  { name: 'CDU',          fullName: 'Christlich Demokratische Union Deutschlands',                                                              color: '#000000' },
            D3:  { name: 'SPD',          fullName: 'Sozialdemokratische Partei Deutschlands',                                                                  color: '#e3000f' },
            D4:  { name: 'GRÜNE',        fullName: 'BÜNDNIS 90/DIE GRÜNEN',                                                                                   color: '#46962b' },
            D5:  { name: 'FDP',          fullName: 'Freie Demokratische Partei',                                                                               color: '#ffed00' },
            D6:  { name: 'LINKE',        fullName: 'Die Linke',                                                                                                color: '#be3075' },
            D7:  { name: 'FREIE WÄHLER', fullName: 'FREIE WÄHLER',                                                                                            color: '#0066cc' },
            D8:  { name: 'EUROPA LISTE', fullName: 'EUROPA LISTE FÜR FRANKFURT',                                                                               color: '#003399' },
            D9:  { name: 'BFF',          fullName: 'Bürger Für Frankfurt',                                                                                     color: '#ff6600' }
        },
        'Mitte-Nord': {
            D1:  { name: 'CDU',          fullName: 'Christlich Demokratische Union Deutschlands',                                                              color: '#000000' },
            D2:  { name: 'AfD',          fullName: 'Alternative für Deutschland',                                                                              color: '#009ee0' },
            D3:  { name: 'SPD',          fullName: 'Sozialdemokratische Partei Deutschlands',                                                                  color: '#e3000f' },
            D4:  { name: 'GRÜNE',        fullName: 'BÜNDNIS 90/DIE GRÜNEN',                                                                                   color: '#46962b' },
            D5:  { name: 'FDP',          fullName: 'Freie Demokratische Partei',                                                                               color: '#ffed00' },
            D6:  { name: 'LINKE',        fullName: 'Die Linke',                                                                                                color: '#be3075' },
            D7:  { name: 'BFF',          fullName: 'Bürger Für Frankfurt',                                                                                     color: '#ff6600' },
            D8:  { name: 'FREIE WÄHLER', fullName: 'FREIE WÄHLER',                                                                                            color: '#0066cc' },
            D9:  { name: 'Volt',         fullName: 'Volt Deutschland',                                                                                         color: '#562883' }
        },
        'Nord-Ost': {
            D1:  { name: 'CDU',          fullName: 'Christlich Demokratische Union Deutschlands',                                                              color: '#000000' },
            D2:  { name: 'AfD',          fullName: 'Alternative für Deutschland',                                                                              color: '#009ee0' },
            D3:  { name: 'SPD',          fullName: 'Sozialdemokratische Partei Deutschlands',                                                                  color: '#e3000f' },
            D4:  { name: 'GRÜNE',        fullName: 'BÜNDNIS 90/DIE GRÜNEN',                                                                                   color: '#46962b' },
            D5:  { name: 'FDP',          fullName: 'Freie Demokratische Partei',                                                                               color: '#ffed00' },
            D6:  { name: 'LINKE',        fullName: 'Die Linke',                                                                                                color: '#be3075' },
            D7:  { name: 'DieFrankfurter', fullName: 'DieFrankfurter',                                                                                        color: '#cc6600' },
            D8:  { name: 'FREIE WÄHLER', fullName: 'FREIE WÄHLER',                                                                                            color: '#0066cc' },
            D9:  { name: 'EUROPA LISTE', fullName: 'EUROPA LISTE FÜR FRANKFURT',                                                                               color: '#003399' },
            D10: { name: 'FFM-Sozial!',  fullName: 'Frankfurt-Sozial!',                                                                                        color: '#ff4500' },
            D11: { name: 'BFF',          fullName: 'Bürger Für Frankfurt',                                                                                     color: '#ff6600' },
            D12: { name: 'Volt',         fullName: 'Volt Deutschland',                                                                                         color: '#562883' }
        },
        'Ost': {
            D1:  { name: 'CDU',          fullName: 'Christlich Demokratische Union Deutschlands',                                                              color: '#000000' },
            D2:  { name: 'AfD',          fullName: 'Alternative für Deutschland',                                                                              color: '#009ee0' },
            D3:  { name: 'SPD',          fullName: 'Sozialdemokratische Partei Deutschlands',                                                                  color: '#e3000f' },
            D4:  { name: 'GRÜNE',        fullName: 'BÜNDNIS 90/DIE GRÜNEN',                                                                                   color: '#46962b' },
            D5:  { name: 'FDP',          fullName: 'Freie Demokratische Partei',                                                                               color: '#ffed00' },
            D6:  { name: 'LINKE',        fullName: 'Die Linke',                                                                                                color: '#be3075' },
            D7:  { name: 'BFF',          fullName: 'Bürger Für Frankfurt',                                                                                     color: '#ff6600' },
            D8:  { name: 'FFM-Sozial!',  fullName: 'Frankfurt-Sozial!',                                                                                        color: '#ff4500' },
            D9:  { name: 'FREIE WÄHLER', fullName: 'FREIE WÄHLER',                                                                                            color: '#0066cc' },
            D10: { name: 'DieFrankfurter', fullName: 'DieFrankfurter',                                                                                        color: '#cc6600' }
        },
        // Kalbach-Riedberg: AfD did not submit a list for this district's Ortsbeiratswahl (no D2 per documentation)
        'Kalbach-Riedberg': {
            D1:  { name: 'CDU',          fullName: 'Christlich Demokratische Union Deutschlands',                                                              color: '#000000' },
            D3:  { name: 'SPD',          fullName: 'Sozialdemokratische Partei Deutschlands',                                                                  color: '#e3000f' },
            D4:  { name: 'GRÜNE',        fullName: 'BÜNDNIS 90/DIE GRÜNEN',                                                                                   color: '#46962b' },
            D5:  { name: 'FDP',          fullName: 'Freie Demokratische Partei',                                                                               color: '#ffed00' },
            D6:  { name: 'Volt',         fullName: 'Volt Deutschland',                                                                                         color: '#562883' },
            D7:  { name: 'LINKE',        fullName: 'Die Linke',                                                                                                color: '#be3075' },
            D8:  { name: 'BFF',          fullName: 'Bürger Für Frankfurt',                                                                                     color: '#ff6600' },
            D9:  { name: 'PARTEI',       fullName: 'Partei für Arbeit, Rechtsstaat, Tierschutz, Elitenförderung und basisdemokratische Initiative',            color: '#b5152b' },
            D10: { name: 'DieFrankfurter', fullName: 'DieFrankfurter',                                                                                        color: '#cc6600' },
            D11: { name: 'FREIE WÄHLER', fullName: 'FREIE WÄHLER',                                                                                            color: '#0066cc' }
        },
        // Nieder-Erlenbach, Harheim, Nieder-Eschbach, Bergen-Enkheim: AfD did not submit lists for these
        // districts' Ortsbeiratswahl (no D2 per documentation)
        'Nieder-Erlenbach': {
            D1:  { name: 'CDU',          fullName: 'Christlich Demokratische Union Deutschlands',                                                              color: '#000000' },
            D3:  { name: 'SPD',          fullName: 'Sozialdemokratische Partei Deutschlands',                                                                  color: '#e3000f' },
            D4:  { name: 'GRÜNE',        fullName: 'BÜNDNIS 90/DIE GRÜNEN',                                                                                   color: '#46962b' },
            D5:  { name: 'FDP',          fullName: 'Freie Demokratische Partei',                                                                               color: '#ffed00' },
            D6:  { name: 'BFF',          fullName: 'Bürger Für Frankfurt',                                                                                     color: '#ff6600' },
            D7:  { name: 'FREIE WÄHLER', fullName: 'FREIE WÄHLER',                                                                                            color: '#0066cc' }
        },
        'Harheim': {
            D1:  { name: 'CDU',          fullName: 'Christlich Demokratische Union Deutschlands',                                                              color: '#000000' },
            D3:  { name: 'SPD',          fullName: 'Sozialdemokratische Partei Deutschlands',                                                                  color: '#e3000f' },
            D4:  { name: 'GRÜNE',        fullName: 'BÜNDNIS 90/DIE GRÜNEN',                                                                                   color: '#46962b' },
            D5:  { name: 'FDP',          fullName: 'Freie Demokratische Partei',                                                                               color: '#ffed00' },
            D6:  { name: 'BFF',          fullName: 'Bürger Für Frankfurt',                                                                                     color: '#ff6600' },
            D7:  { name: 'FREIE WÄHLER', fullName: 'FREIE WÄHLER',                                                                                            color: '#0066cc' }
        },
        'Nieder-Eschbach': {
            D1:  { name: 'CDU',          fullName: 'Christlich Demokratische Union Deutschlands',                                                              color: '#000000' },
            D3:  { name: 'SPD',          fullName: 'Sozialdemokratische Partei Deutschlands',                                                                  color: '#e3000f' },
            D4:  { name: 'GRÜNE',        fullName: 'BÜNDNIS 90/DIE GRÜNEN',                                                                                   color: '#46962b' },
            D5:  { name: 'FDP',          fullName: 'Freie Demokratische Partei',                                                                               color: '#ffed00' },
            D6:  { name: 'BFF',          fullName: 'Bürger Für Frankfurt',                                                                                     color: '#ff6600' },
            D7:  { name: 'LINKE',        fullName: 'Die Linke',                                                                                                color: '#be3075' },
            D8:  { name: 'FREIE WÄHLER', fullName: 'FREIE WÄHLER',                                                                                            color: '#0066cc' }
        },
        'Bergen-Enkheim': {
            D1:  { name: 'CDU',          fullName: 'Christlich Demokratische Union Deutschlands',                                                              color: '#000000' },
            D3:  { name: 'SPD',          fullName: 'Sozialdemokratische Partei Deutschlands',                                                                  color: '#e3000f' },
            D4:  { name: 'GRÜNE',        fullName: 'BÜNDNIS 90/DIE GRÜNEN',                                                                                   color: '#46962b' },
            D5:  { name: 'FDP',          fullName: 'Freie Demokratische Partei',                                                                               color: '#ffed00' },
            D6:  { name: 'WIR B-E',      fullName: 'WIR BERGEN-ENKHEIMER',                                                                                    color: '#ff8800' },
            D7:  { name: 'LINKE',        fullName: 'Die Linke',                                                                                                color: '#be3075' },
            D8:  { name: 'BFF',          fullName: 'Bürger Für Frankfurt',                                                                                     color: '#ff6600' },
            D9:  { name: 'FREIE WÄHLER', fullName: 'FREIE WÄHLER',                                                                                            color: '#0066cc' }
        }
    },

    // Chart colors palette
    CHART_COLORS: [
        '#003366', '#e3000f', '#46962b', '#000000', '#ffed00',
        '#be3075', '#562883', '#ff6600', '#009ee0', '#ff8800',
        '#0066cc', '#8b0000', '#228b22', '#9932cc', '#00bfff',
        '#ff4500', '#1e90ff', '#32cd32', '#dc143c', '#daa520',
        '#4169e1', '#20b2aa', '#ff69b4'
    ],
    
    // GeoJSON coordinates for Frankfurt districts (approximate centers)
    DISTRICT_COORDS: {
        'Innenstadt I': [50.1109, 8.6821],
        'Innenstadt II': [50.1200, 8.6850],
        'Innenstadt III': [50.1150, 8.6750],
        'Bornheim/Ostend': [50.1200, 8.7100],
        'Süd': [50.0950, 8.6700],
        'West': [50.1100, 8.6200],
        'Mitte-West': [50.1150, 8.6400],
        'Nord-West': [50.1400, 8.6100],
        'Mitte-Nord': [50.1350, 8.6500],
        'Nord-Ost': [50.1500, 8.7000],
        'Ost': [50.1300, 8.7300],
        'Kalbach/Riedberg': [50.1800, 8.6300],
        'Nieder-Erlenbach': [50.1900, 8.7100],
        'Harheim': [50.1850, 8.6800],
        'Nieder-Eschbach': [50.1750, 8.6700],
        'Bergen-Enkheim': [50.1400, 8.7600]
    }
};

// Party color helper
function getPartyColor(partyKey, electionType = 'sv') {
    const parties = electionType === 'ab' ? CONFIG.PARTIES_AB : CONFIG.PARTIES_SV;
    return parties[partyKey]?.color || '#808080';
}

// Get party name helper
function getPartyName(partyKey, electionType = 'sv', short = true) {
    const parties = electionType === 'ab' ? CONFIG.PARTIES_AB : CONFIG.PARTIES_SV;
    if (short) {
        return parties[partyKey]?.name || partyKey;
    }
    return parties[partyKey]?.fullName || parties[partyKey]?.name || partyKey;
}

// Format number with German locale
function formatNumber(num) {
    if (num === null || num === undefined || isNaN(num)) return '-';
    return new Intl.NumberFormat('de-DE').format(num);
}

// Format percentage
function formatPercent(num, decimals = 1) {
    if (num === null || num === undefined || isNaN(num)) return '-';
    return num.toFixed(decimals) + ' %';
}

// Calculate percentage
function calcPercent(part, total) {
    if (!total || total === 0) return 0;
    return (part / total) * 100;
}

// Export for use in other files
window.CONFIG = CONFIG;
window.getPartyColor = getPartyColor;
window.getPartyName = getPartyName;
window.formatNumber = formatNumber;
window.formatPercent = formatPercent;
window.calcPercent = calcPercent;
