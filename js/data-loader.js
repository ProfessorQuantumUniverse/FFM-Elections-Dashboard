/**
 * Frankfurt Elections Dashboard - Data Loader
 * Handles fetching and parsing CSV data from the election API
 */

class DataLoader {
    constructor() {
        this.cache = new Map();
        this.loadingPromises = new Map();
    }

    /**
     * Fetch and parse a CSV file from the API
     * @param {string} filename - The CSV filename to fetch
     * @param {boolean} useCache - Whether to use cached data
     * @returns {Promise<Array>} Parsed CSV data as array of objects
     */
    async fetchCSV(filename, useCache = true) {
        const url = `${CONFIG.BASE_URL}/${filename}`;
        
        // Check cache
        if (useCache && this.cache.has(url)) {
            return this.cache.get(url);
        }
        
        // Check if already loading
        if (this.loadingPromises.has(url)) {
            return this.loadingPromises.get(url);
        }
        
        // Create loading promise
        const loadPromise = this._loadCSV(url);
        this.loadingPromises.set(url, loadPromise);
        
        try {
            const data = await loadPromise;
            this.cache.set(url, data);
            return data;
        } finally {
            this.loadingPromises.delete(url);
        }
    }

    async _loadCSV(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            const text = await response.text();
            return this.parseCSV(text);
        } catch (error) {
            console.error(`Error fetching ${url}:`, error);
            throw error;
        }
    }

    /**
     * Parse CSV text into array of objects
     * @param {string} csvText - Raw CSV text
     * @returns {Array} Array of objects with headers as keys
     */
    parseCSV(csvText) {
        const lines = csvText.trim().split('\n');
        if (lines.length < 2) return [];
        
        // Parse header - CSV uses semicolon as delimiter
        const headers = this.parseCSVLine(lines[0]);
        
        // Parse data rows
        const data = [];
        for (let i = 1; i < lines.length; i++) {
            const values = this.parseCSVLine(lines[i]);
            if (values.length === headers.length) {
                const row = {};
                headers.forEach((header, index) => {
                    let value = values[index];
                    // Try to parse as number
                    const numValue = parseFloat(value);
                    if (!isNaN(numValue) && value.trim() !== '') {
                        value = numValue;
                    }
                    row[header] = value;
                });
                data.push(row);
            }
        }
        
        return data;
    }

    /**
     * Parse a single CSV line handling quoted values
     * @param {string} line - CSV line
     * @returns {Array} Array of values
     */
    parseCSVLine(line) {
        const values = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ';' && !inQuotes) {
                values.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        values.push(current.trim());
        
        return values;
    }

    // ==========================================
    // Specific data loading methods
    // ==========================================

    /**
     * Load Stadtverordnetenwahl results at city level
     */
    async loadSVGemeinde() {
        return this.fetchCSV(CONFIG.ENDPOINTS.SV_GEMEINDE);
    }

    /**
     * Load Stadtverordnetenwahl trend results at city level
     */
    async loadSVTrendGemeinde() {
        return this.fetchCSV(CONFIG.ENDPOINTS.SV_TREND_GEMEINDE);
    }

    /**
     * Load Stadtverordnetenwahl results by Ortsbezirke
     */
    async loadSVOrtsbezirke() {
        return this.fetchCSV(CONFIG.ENDPOINTS.SV_ORTSBEZIRKE);
    }

    /**
     * Load Stadtverordnetenwahl results by Ortsteile
     */
    async loadSVOrtsteile() {
        return this.fetchCSV(CONFIG.ENDPOINTS.SV_ORTSTEILE);
    }

    /**
     * Load Stadtverordnetenwahl results by Wahlbezirke
     */
    async loadSVWahlbezirke() {
        return this.fetchCSV(CONFIG.ENDPOINTS.SV_WAHLBEZIRKE);
    }

    /**
     * Load Stadtverordnetenwahl trend results by Wahlbezirke
     */
    async loadSVTrendWahlbezirke() {
        return this.fetchCSV(CONFIG.ENDPOINTS.SV_TREND_WAHLBEZIRKE);
    }

    /**
     * Load Ortsbeiratswahl results for a specific district
     * @param {string} districtSlug - District slug (e.g., 'Innenstadt-I')
     */
    async loadOBDistrict(districtSlug) {
        const filename = `${CONFIG.ENDPOINTS.OB_WAHLBEZIRKE}${districtSlug}-Wahlbezirke.csv`;
        return this.fetchCSV(filename);
    }

    /**
     * Load Ortsbeiratswahl trend results for a specific district
     * @param {string} districtSlug - District slug
     */
    async loadOBTrendDistrict(districtSlug) {
        const filename = `${CONFIG.ENDPOINTS.OB_TREND_WAHLBEZIRKE}${districtSlug}-Wahlbezirke.csv`;
        return this.fetchCSV(filename);
    }

    /**
     * Load Ausländerbeiratswahl results at city level
     */
    async loadABGemeinde() {
        return this.fetchCSV(CONFIG.ENDPOINTS.AB_GEMEINDE);
    }

    /**
     * Load Ausländerbeiratswahl results by Ortsbezirke
     */
    async loadABOrtsbezirke() {
        return this.fetchCSV(CONFIG.ENDPOINTS.AB_ORTSBEZIRKE);
    }

    /**
     * Load Ausländerbeiratswahl results by Wahlbezirke
     */
    async loadABWahlbezirke() {
        return this.fetchCSV(CONFIG.ENDPOINTS.AB_WAHLBEZIRKE);
    }

    /**
     * Load polling station information
     */
    async loadWahllokale() {
        return this.fetchCSV(CONFIG.ENDPOINTS.WAHLLOKALE);
    }

    /**
     * Load street directory
     */
    async loadStrassen() {
        return this.fetchCSV(CONFIG.ENDPOINTS.STRASSEN);
    }

    // ==========================================
    // Data aggregation helpers
    // ==========================================

    /**
     * Extract party results from a data row
     * @param {Object} row - Data row
     * @param {Object} partyDefs - Party definitions object
     * @returns {Array} Array of party results
     */
    extractPartyResults(row, partyDefs = CONFIG.PARTIES_SV) {
        const results = [];
        
        for (const [key, party] of Object.entries(partyDefs)) {
            const votes = row[key] || 0;
            const unchanged = row[`unveraendert_${key.substring(1)}`] || 0;
            const changed = row[`veraendert_${key.substring(1)}`] || 0;
            const panasch = row[`panasch_${key.substring(1)}`] || 0;
            
            results.push({
                key,
                name: party.name,
                fullName: party.fullName || party.name,
                color: party.color,
                votes: votes,
                unchanged: unchanged,
                changed: changed,
                panasch: panasch
            });
        }
        
        return results.filter(r => r.votes > 0).sort((a, b) => b.votes - a.votes);
    }

    /**
     * Calculate key metrics from a data row
     * @param {Object} row - Data row
     * @returns {Object} Metrics object
     */
    calculateMetrics(row) {
        const eligible = row['A'] || 0;
        const voters = row['B'] || 0;
        const valid = row['D'] || 0;
        const invalid = row['C'] || 0;
        
        return {
            eligible,
            voters,
            valid,
            invalid,
            turnout: eligible > 0 ? (voters / eligible) * 100 : 0,
            validRate: voters > 0 ? (valid / voters) * 100 : 0,
            invalidRate: voters > 0 ? (invalid / voters) * 100 : 0,
            reported: row['anz-schnellmeldungen'] || 0,
            expected: row['max-schnellmeldungen'] || 0
        };
    }

    /**
     * Get the leading party from results
     * @param {Array} partyResults - Array of party results
     * @returns {Object} Leading party info
     */
    getLeadingParty(partyResults) {
        if (!partyResults || partyResults.length === 0) return null;
        return partyResults[0];
    }

    /**
     * Calculate total votes from party results
     * @param {Array} partyResults - Array of party results
     * @returns {number} Total votes
     */
    getTotalVotes(partyResults) {
        return partyResults.reduce((sum, p) => sum + (p.votes || 0), 0);
    }

    /**
     * Add percentage to party results
     * @param {Array} partyResults - Array of party results
     * @returns {Array} Party results with percentages
     */
    addPercentages(partyResults) {
        const total = this.getTotalVotes(partyResults);
        return partyResults.map(p => ({
            ...p,
            percent: total > 0 ? (p.votes / total) * 100 : 0
        }));
    }

    /**
     * Extract candidate results for a party
     * @param {Object} row - Data row
     * @param {string} partyKey - Party key (e.g., 'D1')
     * @returns {Array} Array of candidate vote counts
     */
    extractCandidateResults(row, partyKey) {
        const candidates = [];
        const prefix = `${partyKey}_`;
        
        for (const [key, value] of Object.entries(row)) {
            if (key.startsWith(prefix)) {
                const listPos = parseInt(key.substring(prefix.length));
                if (!isNaN(listPos)) {
                    candidates.push({
                        position: listPos,
                        votes: value
                    });
                }
            }
        }
        
        return candidates.sort((a, b) => a.position - b.position);
    }
}

// Create global instance
window.dataLoader = new DataLoader();
