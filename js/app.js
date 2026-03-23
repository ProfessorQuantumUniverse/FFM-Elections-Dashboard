/**
 * Frankfurt Elections Dashboard - Main Application
 * Orchestrates all modules and handles user interactions
 */

class ElectionsDashboard {
    constructor() {
        this.currentTab = 'overview';
        this.currentSubTab = {};
        this.selectedOrtsbezirk = null;
        this.data = {
            svGemeinde: null,
            svOrtsbezirke: null,
            svWahlbezirke: null,
            svTrend: null,
            abGemeinde: null,
            abOrtsbezirke: null,
            ortsbeirat: new Map()
        };
        this.isLoading = true;
        this.mapAvailable = true;
    }

    /**
     * Initialize the dashboard
     */
    async init() {
        console.log('Initializing Frankfurt Elections Dashboard...');
        
        // Setup event listeners
        this.setupNavigation();
        this.setupSubNavigation();
        this.setupFilters();
        
        // Load initial data
        await this.loadInitialData();
        
        // Render overview
        await this.renderOverview();
        
        // Initialize map
        this.initMap();
        
        // Hide loading overlay
        this.hideLoading();
        
        console.log('Dashboard initialized successfully');
    }

    /**
     * Setup main navigation
     */
    setupNavigation() {
        const navTabs = document.querySelectorAll('.nav-tab');
        navTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.dataset.tab;
                this.switchTab(tabId);
            });
        });
    }

    /**
     * Switch to a tab
     */
    switchTab(tabId) {
        // Update nav
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabId);
        });
        
        // Update content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.toggle('active', content.id === tabId);
        });
        
        this.currentTab = tabId;
        
        // Load tab-specific data
        this.onTabChange(tabId);
    }

    /**
     * Handle tab change
     */
    async onTabChange(tabId) {
        switch (tabId) {
            case 'stadtverordnete':
                await this.renderStadtverordnete();
                break;
            case 'ortsbeirat':
                await this.renderOrtsbeirat();
                break;
            case 'auslaenderbeirat':
                await this.renderAuslaenderbeirat();
                break;
            case 'map':
                this.renderMap();
                break;
            case 'comparison':
                await this.renderComparison();
                break;
            case 'candidates':
                await this.renderCandidates();
                break;
            case 'analysis':
                await this.renderAnalysis();
                break;
        }
    }

    /**
     * Setup sub-navigation
     */
    setupSubNavigation() {
        document.querySelectorAll('.sub-nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const subTabId = btn.dataset.subtab;
                const parent = btn.closest('.tab-content');
                
                // Update buttons
                parent.querySelectorAll('.sub-nav-btn').forEach(b => {
                    b.classList.toggle('active', b.dataset.subtab === subTabId);
                });
                
                // Update content
                parent.querySelectorAll('.sub-tab-content').forEach(content => {
                    content.classList.toggle('active', content.id === subTabId);
                });
                
                this.currentSubTab[parent.id] = subTabId;
            });
        });
    }

    /**
     * Setup filters and controls
     */
    setupFilters() {
        // Map controls
        const mapDataType = document.getElementById('mapDataType');
        if (mapDataType) {
            mapDataType.addEventListener('change', () => {
                this.updateMapDisplay(mapDataType.value);
            });
        }
        
        // District comparison
        const compDistrictsBtn = document.getElementById('compDistrictsBtn');
        if (compDistrictsBtn) {
            compDistrictsBtn.addEventListener('click', () => {
                this.compareDistricts();
            });
        }
        
        // Candidate party selector
        const candParty = document.getElementById('candParty');
        if (candParty) {
            candParty.addEventListener('change', () => {
                this.loadCandidateData(candParty.value);
            });
        }
        
        // Sort controls
        const svDistrictSort = document.getElementById('svDistrictSort');
        if (svDistrictSort) {
            svDistrictSort.addEventListener('change', () => {
                this.sortDistrictChart(svDistrictSort.value);
            });
        }

        const svWardSort = document.getElementById('svWardSort');
        if (svWardSort) {
            svWardSort.addEventListener('change', () => {
                this.renderSVWardCharts();
            });
        }

        const svWardDistrictFilter = document.getElementById('svWardDistrictFilter');
        if (svWardDistrictFilter) {
            svWardDistrictFilter.addEventListener('change', () => {
                this.renderSVWardCharts();
            });
        }

        const mapElectionType = document.getElementById('mapElectionType');
        if (mapElectionType) {
            mapElectionType.addEventListener('change', () => {
                this.renderMap();
            });
        }
    }

    /**
     * Load initial data
     */
    async loadInitialData() {
        this.showLoading();
        
        try {
            // Reset sample data tracking before loading
            if (window.dataLoader) window.dataLoader.usedSampleData = false;

            // Load all primary data in parallel
            const [svGemeinde, svOrtsbezirke, svWahlbezirke, svTrend, abGemeinde] = await Promise.all([
                dataLoader.loadSVGemeinde().catch(e => { console.warn('SV Gemeinde failed:', e); return []; }),
                dataLoader.loadSVOrtsbezirke().catch(e => { console.warn('SV Ortsbezirke failed:', e); return []; }),
                dataLoader.loadSVWahlbezirke().catch(e => { console.warn('SV Wahlbezirke failed:', e); return []; }),
                dataLoader.loadSVTrendGemeinde().catch(e => { console.warn('SV Trend failed:', e); return []; }),
                dataLoader.loadABGemeinde().catch(e => { console.warn('AB Gemeinde failed:', e); return []; })
            ]);
            
            this.data.svGemeinde = svGemeinde;
            this.data.svOrtsbezirke = svOrtsbezirke;
            this.data.svWahlbezirke = svWahlbezirke;
            this.data.svTrend = svTrend;
            this.data.abGemeinde = abGemeinde;

            const usingSample = !!(window.dataLoader && window.dataLoader.usedSampleData);

            // Update status
            this.updateDataStatus(true, usingSample);
            
        } catch (error) {
            console.error('Error loading initial data:', error);
            this.showError('Fehler beim Laden der Wahldaten. Bitte später erneut versuchen.');
            this.updateDataStatus(false, true);
        }
    }

    /**
     * Update data status indicator
     * @param {boolean} success - Whether data loaded successfully
     * @param {boolean} usingSample - Whether sample/fallback data is being used
     */
    updateDataStatus(success, usingSample) {
        const statusEl = document.getElementById('dataStatus');
        if (statusEl) {
            if (success && !usingSample) {
                statusEl.innerHTML = '<i class="fas fa-check-circle"></i> Live-Daten';
                statusEl.style.color = '#48bb78';
            } else if (success && usingSample) {
                statusEl.innerHTML = '<i class="fas fa-database"></i> Demo-Daten';
                statusEl.style.color = '#ed8936';
                statusEl.title = 'Die Live-API war nicht erreichbar. Es werden Demo-Daten angezeigt.';
            } else {
                statusEl.innerHTML = '<i class="fas fa-exclamation-circle"></i> Offline-Modus';
                statusEl.style.color = '#e53e3e';
            }
        }
    }

    /**
     * Render Overview Tab
     */
    async renderOverview() {
        if (!this.data.svGemeinde || this.data.svGemeinde.length === 0) {
            console.warn('No SV Gemeinde data available');
            return;
        }
        
        const gemeinde = this.data.svGemeinde[0];
        const metrics = dataLoader.calculateMetrics(gemeinde);
        
        // Update metric cards
        document.getElementById('totalEligible').textContent = formatNumber(metrics.eligible);
        document.getElementById('totalVoters').textContent = formatNumber(metrics.voters);
        document.getElementById('turnoutPercent').textContent = formatPercent(metrics.turnout);
        document.getElementById('validVotes').textContent = formatNumber(metrics.valid);
        document.getElementById('invalidVotes').textContent = formatNumber(metrics.invalid);
        document.getElementById('districtsReported').textContent = `${metrics.reported} / ${metrics.expected}`;
        
        // Extract and chart party results
        const partyResults = dataLoader.addPercentages(
            dataLoader.extractPartyResults(gemeinde, CONFIG.PARTIES_SV)
        );
        
        // Overview party bar chart (top 10)
        const top10 = partyResults.slice(0, 10);
        chartManager.createPartyBarChart('overviewPartyChart', top10);
        
        // Pie chart (top 8 + others)
        const pieData = this.groupSmallParties(partyResults, 8);
        chartManager.createPieChart('overviewPieChart', pieData);
        
        // Turnout type chart
        const voterTypes = [
            { name: 'Normale Wähler', votes: metrics.voters - (gemeinde['B1'] || 0), color: '#003366' },
            { name: 'Mit Wahlschein', votes: gemeinde['B1'] || 0, color: '#48bb78' },
            { name: 'Nichtwähler', votes: metrics.eligible - metrics.voters, color: '#e2e8f0' }
        ];
        chartManager.createPieChart('turnoutTypeChart', voterTypes);
        
        // Overview table
        this.renderOverviewTable();
    }

    /**
     * Render overview table with all elections
     */
    renderOverviewTable() {
        const tbody = document.getElementById('overviewTableBody');
        if (!tbody) return;
        
        const rows = [];
        
        // Stadtverordnetenwahl
        if (this.data.svGemeinde && this.data.svGemeinde[0]) {
            const sv = this.data.svGemeinde[0];
            const metrics = dataLoader.calculateMetrics(sv);
            rows.push({
                name: 'Stadtverordnetenwahl',
                ...metrics,
                status: metrics.reported >= metrics.expected ? 'complete' : 'counting'
            });
        }
        
        // Ausländerbeiratswahl
        if (this.data.abGemeinde && this.data.abGemeinde[0]) {
            const ab = this.data.abGemeinde[0];
            const metrics = dataLoader.calculateMetrics(ab);
            rows.push({
                name: 'Ausländerbeiratswahl',
                ...metrics,
                status: metrics.reported >= metrics.expected ? 'complete' : 'counting'
            });
        }
        
        tbody.innerHTML = rows.map(row => `
            <tr>
                <td><strong>${row.name}</strong></td>
                <td>${formatNumber(row.eligible)}</td>
                <td>${formatNumber(row.voters)}</td>
                <td><strong>${formatPercent(row.turnout)}</strong></td>
                <td>${formatNumber(row.valid)}</td>
                <td>${formatNumber(row.invalid)}</td>
                <td>
                    <span class="status-badge ${row.status}">
                        ${row.status === 'complete' ? '<i class="fas fa-check"></i> Ausgezählt' : '<i class="fas fa-spinner fa-spin"></i> Auszählung'}
                    </span>
                </td>
            </tr>
        `).join('');
    }

    /**
     * Render Stadtverordnetenwahl Tab
     */
    async renderStadtverordnete() {
        if (!this.data.svGemeinde || this.data.svGemeinde.length === 0) return;
        
        const gemeinde = this.data.svGemeinde[0];
        const partyResults = dataLoader.addPercentages(
            dataLoader.extractPartyResults(gemeinde, CONFIG.PARTIES_SV)
        );
        
        // Party bar chart
        chartManager.createPartyVerticalBarChart('svPartyBarChart', partyResults.slice(0, 12));
        
        // Pie chart
        const pieData = this.groupSmallParties(partyResults, 8);
        chartManager.createPieChart('svPartyPieChart', pieData);
        
        // Changed votes chart
        chartManager.createStackedBarChart('svChangedChart', partyResults.slice(0, 8));
        
        // Party table
        this.renderPartyTable('svPartyTableBody', partyResults);
        
        // District charts
        await this.renderSVDistrictCharts();
        
        // Ward charts
        await this.renderSVWardCharts();
        
        // Trend comparison
        await this.renderTrendComparison();
    }

    /**
     * Render SV District Charts
     */
    async renderSVDistrictCharts() {
        if (!this.data.svOrtsbezirke || this.data.svOrtsbezirke.length === 0) return;
        
        const districts = this.data.svOrtsbezirke.map(row => {
            const metrics = dataLoader.calculateMetrics(row);
            const partyResults = dataLoader.addPercentages(
                dataLoader.extractPartyResults(row, CONFIG.PARTIES_SV)
            );
            const winner = partyResults[0] || null;
            
            return {
                name: row['gebiet-name'],
                ...metrics,
                winner,
                partyResults
            };
        });
        
        // Turnout chart
        chartManager.createTurnoutChart('svDistrictTurnoutChart', districts);
        
        // Leading party chart
        const leaderData = {
            labels: districts.map(d => d.name),
            datasets: districts.map((d, i) => ({
                label: d.winner?.name || 'N/A',
                data: Array(districts.length).fill(0),
                backgroundColor: d.winner?.color || '#808080'
            }))
        };
        
        // District table
        this.renderDistrictTable('svDistrictTableBody', districts);
        
        // Populate filter dropdowns
        this.populateDistrictDropdowns(districts);
    }

    /**
     * Render SV Ward Charts
     */
    async renderSVWardCharts() {
        if (!this.data.svWahlbezirke || this.data.svWahlbezirke.length === 0) return;
        
        const allWards = this.data.svWahlbezirke.map(row => {
            const metrics = dataLoader.calculateMetrics(row);
            return {
                number: row['gebiet-nr'],
                name: row['gebiet-name'],
                ...metrics
            };
        });
        let wards = [...allWards];

        const districtFilter = document.getElementById('svWardDistrictFilter')?.value || 'all';
        if (districtFilter !== 'all') {
            const filterNorm = String(districtFilter).toLowerCase();
            const filtered = wards.filter(w => String(w.name || '').toLowerCase().includes(filterNorm));
            if (filtered.length > 0) {
                wards = filtered;
            }
        }

        const sortMode = document.getElementById('svWardSort')?.value || 'number';
        if (sortMode === 'turnout-desc') {
            wards.sort((a, b) => b.turnout - a.turnout);
        } else if (sortMode === 'turnout-asc') {
            wards.sort((a, b) => a.turnout - b.turnout);
        } else {
            wards.sort((a, b) => Number(a.number) - Number(b.number));
        }
        
        // Ward turnout chart (sample - too many wards)
        const sampleWards = wards.length > 25 ? wards.filter((_, i) => i % 10 === 0) : wards;
        chartManager.createTurnoutChart('svWardTurnoutChart', sampleWards);
        
        // Ward table
        this.renderWardTable('svWardTableBody', wards);
    }

    /**
     * Render Trend Comparison
     * Uses the separate Trend file if available; otherwise falls back to
     * the Trend_<pos> columns embedded in the final Stadtverordnetenwahl file.
     */
    async renderTrendComparison() {
        if (!this.data.svGemeinde || !this.data.svGemeinde[0]) return;

        const final = this.data.svGemeinde[0];

        // Try separate trend file first; fall back to Trend_N cols in the final file
        const trend = (this.data.svTrend && this.data.svTrend[0]) ? this.data.svTrend[0] : final;

        const finalResults = dataLoader.addPercentages(
            dataLoader.extractPartyResults(final, CONFIG.PARTIES_SV)
        );
        
        // For trend, we need to use the Trend columns
        const trendResults = [];
        for (const [key, party] of Object.entries(CONFIG.PARTIES_SV)) {
            const trendKey = `Trend_${key.substring(1)}`;
            const votes = trend[trendKey] || 0;
            if (votes > 0) {
                trendResults.push({
                    key,
                    name: party.name,
                    color: party.color,
                    votes
                });
            }
        }

        const trendWithPercent = dataLoader.addPercentages(trendResults);
        
        // Create comparison chart
        const labels = finalResults.slice(0, 10).map(p => p.name);
        const datasets = [
            {
                label: 'Trend (Stapel 1)',
                data: labels.map(name => {
                    const p = trendWithPercent.find(x => x.name === name);
                    return p ? p.percent : 0;
                }),
                color: 'rgba(237, 137, 54, 0.8)'
            },
            {
                label: 'Endergebnis',
                data: labels.map(name => {
                    const p = finalResults.find(x => x.name === name);
                    return p ? p.percent : 0;
                }),
                color: 'rgba(0, 51, 102, 0.8)'
            }
        ];
        
        chartManager.createComparisonChart('svTrendCompareChart', labels, datasets);
    }

    /**
     * Render Ortsbeirat Tab
     */
    async renderOrtsbeirat() {
        // Generate district buttons
        const buttonsContainer = document.getElementById('ortsbezirkButtons');
        if (buttonsContainer && buttonsContainer.children.length === 0) {
            CONFIG.ORTSBEZIRKE.forEach(district => {
                const btn = document.createElement('button');
                btn.className = 'district-btn';
                btn.dataset.district = district.slug;
                btn.textContent = district.name;
                btn.addEventListener('click', () => this.selectOrtsbezirk(district));
                buttonsContainer.appendChild(btn);
            });
        }
        
        // Render all districts turnout comparison
        await this.renderAllOrtsbezirkeTurnout();
        
        // Select first district by default
        if (!this.selectedOrtsbezirk) {
            this.selectOrtsbezirk(CONFIG.ORTSBEZIRKE[0]);
        }
    }

    /**
     * Select an Ortsbezirk
     */
    async selectOrtsbezirk(district) {
        this.selectedOrtsbezirk = district;
        
        // Update button states
        document.querySelectorAll('.district-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.district === district.slug);
        });
        
        // Load district data
        try {
            let districtData = this.data.ortsbeirat.get(district.slug);
            if (!districtData) {
                districtData = await dataLoader.loadOBDistrict(district.slug);
                this.data.ortsbeirat.set(district.slug, districtData);
                // Update status in case sample data was used for this district
                const usingSample = !!(window.dataLoader && window.dataLoader.usedSampleData);
                this.updateDataStatus(true, usingSample);
            }
            
            this.renderOrtsbezirkData(district, districtData);
        } catch (error) {
            console.error(`Error loading Ortsbeirat data for ${district.name}:`, error);
        }
    }

    /**
     * Render Ortsbezirk data
     */
    renderOrtsbezirkData(district, data) {
        if (!data || data.length === 0) return;
        
        // Aggregate data for the district (sum all Wahlbezirke)
        const aggregated = this.aggregateWahlbezirke(data);
        const metrics = dataLoader.calculateMetrics(aggregated);
        
        // Update stats
        document.getElementById('obDistrictTitle').innerHTML = 
            `<i class="fas fa-chart-bar"></i> ${district.name} - Ergebnis`;
        document.getElementById('obEligible').textContent = formatNumber(metrics.eligible);
        document.getElementById('obVoters').textContent = formatNumber(metrics.voters);
        document.getElementById('obTurnout').textContent = formatPercent(metrics.turnout);
        document.getElementById('obValid').textContent = formatNumber(metrics.valid);
        
        // Extract party results using district-specific party config
        const partyResults = this.extractOrtsbeiratPartyResults(aggregated, district);
        const withPercent = dataLoader.addPercentages(partyResults);
        
        // Charts
        chartManager.createPartyVerticalBarChart('obPartyChart', withPercent.slice(0, 10));
        chartManager.createPieChart('obPieChart', this.groupSmallParties(withPercent, 6));
        
        // Table
        this.renderPartyTable('obPartyTableBody', withPercent);
    }

    /**
     * Extract party results for Ortsbeiratswahl using district-specific party definitions
     * @param {Object} row - Aggregated data row
     * @param {Object} district - District object with slug
     * @returns {Array} Party results sorted by votes
     */
    extractOrtsbeiratPartyResults(row, district) {
        const results = [];
        const partyDefs = (district && CONFIG.PARTIES_OB[district.slug]) || null;

        // Find all D* columns (party votes)
        for (const [key, value] of Object.entries(row)) {
            if (/^D\d+$/.test(key) && typeof value === 'number' && value > 0) {
                let partyInfo;
                if (partyDefs && partyDefs[key]) {
                    partyInfo = partyDefs[key];
                } else {
                    // Fallback: use a generic label with a chart color
                    partyInfo = {
                        name: key,
                        fullName: key,
                        color: CONFIG.CHART_COLORS[results.length % CONFIG.CHART_COLORS.length]
                    };
                }

                results.push({
                    key,
                    name: partyInfo.name,
                    fullName: partyInfo.fullName || partyInfo.name,
                    color: partyInfo.color,
                    votes: value,
                    unchanged: row[`unveraendert_${key.substring(1)}`] || 0,
                    changed: row[`veraendert_${key.substring(1)}`] || 0
                });
            }
        }

        return results.sort((a, b) => b.votes - a.votes);
    }

    /**
     * Aggregate Wahlbezirke data
     */
    aggregateWahlbezirke(data) {
        const aggregated = {};
        
        for (const row of data) {
            for (const [key, value] of Object.entries(row)) {
                if (typeof value === 'number') {
                    aggregated[key] = (aggregated[key] || 0) + value;
                }
            }
        }
        
        return aggregated;
    }

    /**
     * Render all Ortsbezirke turnout comparison
     */
    async renderAllOrtsbezirkeTurnout() {
        if (!this.data.svOrtsbezirke) return;
        
        const districts = this.data.svOrtsbezirke.map(row => ({
            name: row['gebiet-name'],
            turnout: dataLoader.calculateMetrics(row).turnout
        }));
        
        chartManager.createTurnoutChart('obAllDistrictsTurnout', districts);
    }

    /**
     * Render Ausländerbeiratswahl Tab
     */
    async renderAuslaenderbeirat() {
        if (!this.data.abGemeinde || this.data.abGemeinde.length === 0) {
            console.warn('No AB Gemeinde data available');
            return;
        }
        
        const gemeinde = this.data.abGemeinde[0];
        const metrics = dataLoader.calculateMetrics(gemeinde);
        
        // Update metrics
        document.getElementById('abEligible').textContent = formatNumber(metrics.eligible);
        document.getElementById('abVoters').textContent = formatNumber(metrics.voters);
        document.getElementById('abTurnout').textContent = formatPercent(metrics.turnout);
        document.getElementById('abValidVotes').textContent = formatNumber(metrics.valid);
        
        // Extract party results
        const partyResults = dataLoader.addPercentages(
            dataLoader.extractPartyResults(gemeinde, CONFIG.PARTIES_AB)
        );
        
        // Charts
        chartManager.createPartyBarChart('abPartyChart', partyResults.slice(0, 15));
        chartManager.createPieChart('abPieChart', this.groupSmallParties(partyResults, 8));
        
        // Table
        this.renderPartyTable('abPartyTableBody', partyResults);
    }

    /**
     * Initialize and render map
     */
    initMap() {
        try {
            mapManager.init();
            this.renderMap();
            this.mapAvailable = true;
        } catch (error) {
            this.mapAvailable = false;
            console.error('Error initializing map:', error);
            const mapContainer = document.getElementById('frankfurtMap');
            if (mapContainer) {
                mapContainer.innerHTML = `
                    <div class="info-box">
                        <p><strong>Karte derzeit nicht verfügbar.</strong></p>
                        <p>Die Kartenbibliothek konnte nicht geladen werden. Bitte prüfen Sie die Netzwerkverbindung oder erlauben Sie externe CDNs.</p>
                    </div>
                `;
            }
        }
    }

    /**
     * Render map with current data
     */
    renderMap() {
        if (!this.mapAvailable || !this.data.svOrtsbezirke) return;
        
        const districtData = this.data.svOrtsbezirke.map(row => {
            const metrics = dataLoader.calculateMetrics(row);
            const partyResults = dataLoader.addPercentages(
                dataLoader.extractPartyResults(row, CONFIG.PARTIES_SV)
            );
            
            return {
                name: row['gebiet-name'],
                ...metrics,
                winner: partyResults[0] || null,
                partyResults
            };
        });
        
        mapManager.setDistrictData(districtData);
        const currentDataType = document.getElementById('mapDataType')?.value || 'turnout';
        mapManager.addDistrictMarkers(currentDataType);
    }

    /**
     * Update map display type
     */
    updateMapDisplay(dataType) {
        if (!this.mapAvailable) return;
        mapManager.addDistrictMarkers(dataType);
    }

    /**
     * Render Comparison Tab
     */
    async renderComparison() {
        await this.renderElectionComparison();
        this.setupDistrictComparison();
        await this.renderPartyComparison();
    }

    /**
     * Render election comparison
     */
    async renderElectionComparison() {
        const elections = [];
        
        if (this.data.svGemeinde && this.data.svGemeinde[0]) {
            const sv = this.data.svGemeinde[0];
            const metrics = dataLoader.calculateMetrics(sv);
            elections.push({ name: 'Stadtverordneten', turnout: metrics.turnout });
        }
        
        if (this.data.abGemeinde && this.data.abGemeinde[0]) {
            const ab = this.data.abGemeinde[0];
            const metrics = dataLoader.calculateMetrics(ab);
            elections.push({ name: 'Ausländerbeirat', turnout: metrics.turnout });
        }
        
        // Turnout comparison
        const turnoutData = {
            labels: elections.map(e => e.name),
            datasets: [{
                label: 'Wahlbeteiligung %',
                data: elections.map(e => e.turnout),
                backgroundColor: CONFIG.CHART_COLORS,
                borderRadius: 4
            }]
        };
        
        chartManager.createChart('compTurnoutChart', 'bar', turnoutData, {
            plugins: { legend: { display: false } },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: { callback: v => v + '%' }
                }
            }
        });
    }

    /**
     * Setup district comparison
     */
    setupDistrictComparison() {
        const select1 = document.getElementById('compDistrict1');
        const select2 = document.getElementById('compDistrict2');
        
        if (!select1 || !select2 || !this.data.svOrtsbezirke) return;
        
        const districts = this.data.svOrtsbezirke.map(r => r['gebiet-name']);
        
        [select1, select2].forEach((select, idx) => {
            select.innerHTML = districts.map((d, i) => 
                `<option value="${d}" ${i === idx ? 'selected' : ''}>${d}</option>`
            ).join('');
        });
    }

    /**
     * Compare two districts
     */
    compareDistricts() {
        const d1 = document.getElementById('compDistrict1').value;
        const d2 = document.getElementById('compDistrict2').value;
        
        const data1 = this.data.svOrtsbezirke.find(r => r['gebiet-name'] === d1);
        const data2 = this.data.svOrtsbezirke.find(r => r['gebiet-name'] === d2);
        
        if (!data1 || !data2) return;
        
        const results1 = dataLoader.addPercentages(
            dataLoader.extractPartyResults(data1, CONFIG.PARTIES_SV)
        );
        const results2 = dataLoader.addPercentages(
            dataLoader.extractPartyResults(data2, CONFIG.PARTIES_SV)
        );
        
        // Get common parties
        const parties = [...new Set([...results1, ...results2].map(p => p.name))].slice(0, 10);
        
        const datasets = [
            {
                label: d1,
                data: parties.map(name => results1.find(p => p.name === name)?.percent || 0),
                color: '#003366'
            },
            {
                label: d2,
                data: parties.map(name => results2.find(p => p.name === name)?.percent || 0),
                color: '#e3000f'
            }
        ];
        
        chartManager.createComparisonChart('compDistrictsChart', parties, datasets);
    }

    /**
     * Render party comparison across districts
     */
    async renderPartyComparison() {
        if (!this.data.svOrtsbezirke) return;
        
        const topParties = ['CDU', 'SPD', 'GRÜNE', 'AfD', 'FDP', 'LINKE'];
        const districts = this.data.svOrtsbezirke.map(r => r['gebiet-name']);
        
        const datasets = topParties.map(partyName => {
            const partyKey = Object.entries(CONFIG.PARTIES_SV)
                .find(([_, p]) => p.name === partyName)?.[0];
            
            return {
                label: partyName,
                data: this.data.svOrtsbezirke.map(row => {
                    const results = dataLoader.addPercentages(
                        dataLoader.extractPartyResults(row, CONFIG.PARTIES_SV)
                    );
                    const party = results.find(p => p.name === partyName);
                    return party ? party.percent : 0;
                }),
                color: partyKey ? CONFIG.PARTIES_SV[partyKey].color : '#808080'
            };
        });
        
        chartManager.createRadarChart('compPartiesRadar', districts, datasets);
    }

    /**
     * Render Candidates Tab
     */
    async renderCandidates() {
        // Populate party dropdown
        const partySelect = document.getElementById('candParty');
        if (partySelect && partySelect.children.length <= 1) {
            for (const [key, party] of Object.entries(CONFIG.PARTIES_SV)) {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = party.name;
                partySelect.appendChild(option);
            }
        }
    }

    /**
     * Load candidate data for selected party
     */
    loadCandidateData(partyKey) {
        if (!partyKey || !this.data.svGemeinde || !this.data.svGemeinde[0]) return;
        
        const row = this.data.svGemeinde[0];
        const candidates = dataLoader.extractCandidateResults(row, partyKey);
        const party = CONFIG.PARTIES_SV[partyKey];
        
        if (candidates.length === 0) {
            document.getElementById('candTableBody').innerHTML = 
                '<tr><td colspan="3" class="loading">Keine Kandidatendaten verfügbar</td></tr>';
            return;
        }
        
        // Update title
        document.getElementById('candChartTitle').innerHTML = 
            `<i class="fas fa-chart-bar"></i> ${party.name} - Kandidatenstimmen`;
        
        // Chart
        chartManager.createCandidateChart('candBarChart', candidates.slice(0, 30), party.color);
        
        // Table
        const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);
        document.getElementById('candTableBody').innerHTML = candidates.map(c => `
            <tr>
                <td>${c.position}</td>
                <td>${formatNumber(c.votes)}</td>
                <td>${formatPercent(calcPercent(c.votes, totalVotes))}</td>
            </tr>
        `).join('');
    }

    /**
     * Render Analysis Tab
     */
    async renderAnalysis() {
        await this.renderPanaschAnalysis();
        await this.renderTurnoutAnalysis();
        await this.renderCorrelations();
        await this.renderVotingPatterns();
    }

    /**
     * Render Panaschieren Analysis
     */
    async renderPanaschAnalysis() {
        if (!this.data.svGemeinde || !this.data.svGemeinde[0]) return;
        
        const row = this.data.svGemeinde[0];
        const partyResults = dataLoader.extractPartyResults(row, CONFIG.PARTIES_SV);
        
        // Panaschierte Stimmen chart
        const panaschData = partyResults
            .filter(p => p.panasch > 0)
            .sort((a, b) => b.panasch - a.panasch)
            .slice(0, 10);
        
        chartManager.createPartyBarChart('anaPanaschChart', panaschData.map(p => ({
            ...p,
            votes: p.panasch
        })));
        
        // Vote types pie
        const totalUnchanged = partyResults.reduce((sum, p) => sum + (p.unchanged || 0), 0);
        const totalChanged = partyResults.reduce((sum, p) => sum + (p.changed || 0), 0);
        const totalPanasch = partyResults.reduce((sum, p) => sum + (p.panasch || 0), 0);
        
        chartManager.createPieChart('anaPanaschPieChart', [
            { name: 'Unverändert', votes: totalUnchanged, color: '#48bb78' },
            { name: 'Verändert', votes: totalChanged, color: '#4299e1' },
            { name: 'Panaschiert', votes: totalPanasch, color: '#ed8936' }
        ]);
        
        // Stacked vote types
        chartManager.createStackedBarChart('anaVoteTypesChart', partyResults.slice(0, 10));
    }

    /**
     * Render Turnout Analysis
     */
    async renderTurnoutAnalysis() {
        if (!this.data.svOrtsbezirke) return;
        
        const districts = this.data.svOrtsbezirke.map(row => ({
            name: row['gebiet-name'],
            turnout: dataLoader.calculateMetrics(row).turnout,
            voters: row['B'] || 0,
            eligible: row['A'] || 0,
            withCard: row['B1'] || 0
        }));
        
        // Sort by turnout
        districts.sort((a, b) => b.turnout - a.turnout);
        
        chartManager.createTurnoutChart('anaTurnoutDistrictChart', districts);
        
        // Voter type pie
        const totalVoters = districts.reduce((sum, d) => sum + d.voters, 0);
        const totalWithCard = districts.reduce((sum, d) => sum + d.withCard, 0);
        
        chartManager.createPieChart('anaVoterTypeChart', [
            { name: 'Regulär', votes: totalVoters - totalWithCard, color: '#003366' },
            { name: 'Mit Wahlschein', votes: totalWithCard, color: '#48bb78' }
        ]);
        
        // Stats
        const turnouts = districts.map(d => d.turnout);
        const avg = turnouts.reduce((a, b) => a + b, 0) / turnouts.length;
        const std = Math.sqrt(turnouts.map(t => Math.pow(t - avg, 2)).reduce((a, b) => a + b, 0) / turnouts.length);
        
        document.getElementById('anaHighestTurnout').textContent = 
            `${districts[0].name}: ${formatPercent(districts[0].turnout)}`;
        document.getElementById('anaLowestTurnout').textContent = 
            `${districts[districts.length - 1].name}: ${formatPercent(districts[districts.length - 1].turnout)}`;
        document.getElementById('anaAvgTurnout').textContent = formatPercent(avg);
        document.getElementById('anaStdTurnout').textContent = formatPercent(std);
    }

    /**
     * Render Correlations
     */
    async renderCorrelations() {
        if (!this.data.svOrtsbezirke) return;
        
        const dataPoints = this.data.svOrtsbezirke.map(row => {
            const metrics = dataLoader.calculateMetrics(row);
            const results = dataLoader.addPercentages(
                dataLoader.extractPartyResults(row, CONFIG.PARTIES_SV)
            );
            
            return {
                label: row['gebiet-name'],
                turnout: metrics.turnout,
                cdu: results.find(p => p.name === 'CDU')?.percent || 0,
                gruene: results.find(p => p.name === 'GRÜNE')?.percent || 0
            };
        });
        
        // Turnout vs CDU
        chartManager.createScatterChart('anaCorr1Chart', 
            dataPoints.map(d => ({ x: d.turnout, y: d.cdu, label: d.label })),
            'Wahlbeteiligung',
            'CDU-Anteil'
        );
        
        // Turnout vs Grüne
        chartManager.createScatterChart('anaCorr2Chart',
            dataPoints.map(d => ({ x: d.turnout, y: d.gruene, label: d.label })),
            'Wahlbeteiligung',
            'GRÜNE-Anteil'
        );
    }

    /**
     * Render Voting Patterns
     */
    async renderVotingPatterns() {
        if (!this.data.svGemeinde || !this.data.svGemeinde[0]) return;
        
        const row = this.data.svGemeinde[0];
        const partyResults = dataLoader.extractPartyResults(row, CONFIG.PARTIES_SV).slice(0, 8);
        
        // Calculate percentages for each vote type per party
        const patterns = partyResults.map(p => {
            const total = (p.unchanged || 0) + (p.changed || 0) + (p.panasch || 0);
            return {
                name: p.name,
                color: p.color,
                unchanged: total > 0 ? (p.unchanged / total) * 100 : 0,
                changed: total > 0 ? (p.changed / total) * 100 : 0,
                panasch: total > 0 ? (p.panasch / total) * 100 : 0
            };
        });
        
        const data = {
            labels: patterns.map(p => p.name),
            datasets: [
                {
                    label: 'Unverändert %',
                    data: patterns.map(p => p.unchanged),
                    backgroundColor: 'rgba(72, 187, 120, 0.8)'
                },
                {
                    label: 'Verändert %',
                    data: patterns.map(p => p.changed),
                    backgroundColor: 'rgba(66, 153, 225, 0.8)'
                },
                {
                    label: 'Panaschiert %',
                    data: patterns.map(p => p.panasch),
                    backgroundColor: 'rgba(237, 137, 54, 0.8)'
                }
            ]
        };
        
        chartManager.createChart('anaVotingPatternChart', 'bar', data, {
            scales: {
                x: { stacked: true },
                y: { stacked: true, max: 100, ticks: { callback: v => v + '%' } }
            }
        });
    }

    // ==========================================
    // Helper Methods
    // ==========================================

    /**
     * Group small parties into "Others"
     */
    groupSmallParties(partyResults, topN) {
        const top = partyResults.slice(0, topN);
        const others = partyResults.slice(topN);
        
        if (others.length > 0) {
            const othersVotes = others.reduce((sum, p) => sum + p.votes, 0);
            top.push({
                name: 'Sonstige',
                votes: othersVotes,
                color: '#808080'
            });
        }
        
        return top;
    }

    /**
     * Render party results table
     */
    renderPartyTable(tbodyId, partyResults) {
        const tbody = document.getElementById(tbodyId);
        if (!tbody) return;
        
        tbody.innerHTML = partyResults.map((p, i) => `
            <tr>
                <td>${i + 1}</td>
                <td>
                    <span class="party-color" style="background-color: ${p.color}"></span>
                    ${p.name}
                </td>
                <td>${formatNumber(p.votes)}</td>
                <td><strong>${formatPercent(p.percent)}</strong></td>
                <td>${formatNumber(p.unchanged || 0)}</td>
                <td>${formatNumber(p.changed || 0)}</td>
                ${p.panasch !== undefined ? `<td>${formatNumber(p.panasch)}</td>` : ''}
            </tr>
        `).join('');
    }

    /**
     * Render district table
     */
    renderDistrictTable(tbodyId, districts) {
        const tbody = document.getElementById(tbodyId);
        if (!tbody) return;
        
        tbody.innerHTML = districts.map(d => `
            <tr>
                <td><strong>${d.name}</strong></td>
                <td>${formatNumber(d.eligible)}</td>
                <td>${formatNumber(d.voters)}</td>
                <td><strong>${formatPercent(d.turnout)}</strong></td>
                <td>
                    ${d.winner ? `<span class="party-color" style="background-color: ${d.winner.color}"></span>${d.winner.name}` : '-'}
                </td>
                <td>${d.winner ? formatNumber(d.winner.votes) : '-'}</td>
            </tr>
        `).join('');
    }

    /**
     * Render ward table
     */
    renderWardTable(tbodyId, wards) {
        const tbody = document.getElementById(tbodyId);
        if (!tbody) return;
        
        tbody.innerHTML = wards.map(w => `
            <tr>
                <td>${w.number}</td>
                <td>${w.name}</td>
                <td>${formatNumber(w.eligible)}</td>
                <td>${formatNumber(w.voters)}</td>
                <td><strong>${formatPercent(w.turnout)}</strong></td>
                <td>${formatNumber(w.valid)}</td>
                <td>${formatNumber(w.invalid)}</td>
            </tr>
        `).join('');
    }

    /**
     * Populate district dropdowns
     */
    populateDistrictDropdowns(districts) {
        const wardFilter = document.getElementById('svWardDistrictFilter');
        if (wardFilter && wardFilter.children.length <= 1) {
            districts.forEach(d => {
                const option = document.createElement('option');
                option.value = d.name;
                option.textContent = d.name;
                wardFilter.appendChild(option);
            });
        }
    }

    /**
     * Sort district chart
     */
    sortDistrictChart(sortKey) {
        if (!this.data.svOrtsbezirke) return;
        
        const districts = this.data.svOrtsbezirke.map(row => ({
            name: row['gebiet-name'],
            turnout: dataLoader.calculateMetrics(row).turnout,
            voters: row['B'] || 0
        }));
        
        chartManager.createTurnoutChart('svDistrictTurnoutChart', districts, sortKey);
    }

    /**
     * Show loading overlay
     */
    showLoading() {
        this.isLoading = true;
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) overlay.classList.remove('hidden');
    }

    /**
     * Hide loading overlay
     */
    hideLoading() {
        this.isLoading = false;
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) overlay.classList.add('hidden');
    }

    /**
     * Show error modal
     */
    showError(message) {
        const modal = document.getElementById('errorModal');
        const msgEl = document.getElementById('errorMessage');
        
        if (modal && msgEl) {
            msgEl.textContent = message;
            modal.classList.add('show');
        }
    }
}

// Initialize dashboard when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new ElectionsDashboard();
    window.dashboard.init();
});

// Setup modal close handlers
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('errorModal');
    const closeBtn = modal?.querySelector('.modal-close');
    const retryBtn = document.getElementById('retryBtn');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => modal.classList.remove('show'));
    }
    
    if (retryBtn) {
        retryBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            window.dashboard.loadInitialData();
        });
    }
});

// Add status badge styles
const statusStyles = document.createElement('style');
statusStyles.textContent = `
    .status-badge {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 500;
    }
    .status-badge.complete {
        background: rgba(72, 187, 120, 0.2);
        color: #48bb78;
    }
    .status-badge.counting {
        background: rgba(237, 137, 54, 0.2);
        color: #ed8936;
    }
`;
document.head.appendChild(statusStyles);
