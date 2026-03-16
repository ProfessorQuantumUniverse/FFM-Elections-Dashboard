/**
 * Frankfurt Elections Dashboard - Map Module
 * Handles Leaflet map visualization for district-level data
 */

class MapManager {
    constructor() {
        this.map = null;
        this.markers = [];
        this.geoLayer = null;
        this.currentDataType = 'turnout';
        this.districtData = new Map();
        
        // Frankfurt center coordinates
        this.center = [50.1109, 8.6821];
        this.defaultZoom = 11;
        
        // Color scales for different data types
        this.colorScales = {
            turnout: {
                ranges: [
                    { min: 0, max: 30, color: '#fee5d9' },
                    { min: 30, max: 40, color: '#fcae91' },
                    { min: 40, max: 50, color: '#fb6a4a' },
                    { min: 50, max: 60, color: '#de2d26' },
                    { min: 60, max: 100, color: '#a50f15' }
                ],
                title: 'Wahlbeteiligung'
            },
            winner: {
                parties: CONFIG.PARTIES_SV,
                title: 'Stärkste Partei'
            },
            cdu: { party: 'D1', title: 'CDU Anteil' },
            spd: { party: 'D3', title: 'SPD Anteil' },
            gruene: { party: 'D4', title: 'GRÜNE Anteil' },
            afd: { party: 'D2', title: 'AfD Anteil' },
            fdp: { party: 'D5', title: 'FDP Anteil' },
            linke: { party: 'D6', title: 'LINKE Anteil' }
        };
    }

    /**
     * Initialize the map
     */
    init(containerId = 'frankfurtMap') {
        if (this.map) {
            this.map.remove();
        }
        
        this.map = L.map(containerId).setView(this.center, this.defaultZoom);
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18
        }).addTo(this.map);
        
        return this;
    }

    /**
     * Set district data for visualization
     */
    setDistrictData(data) {
        this.districtData = new Map(data.map(d => [d.name, d]));
        return this;
    }

    /**
     * Add district markers to the map
     */
    addDistrictMarkers(dataType = 'turnout') {
        this.clearMarkers();
        this.currentDataType = dataType;
        
        for (const [name, coords] of Object.entries(CONFIG.DISTRICT_COORDS)) {
            const data = this.districtData.get(name);
            if (!data) continue;
            
            const color = this.getColor(data, dataType);
            const popupContent = this.createPopupContent(name, data, dataType);
            
            // Create circle marker
            const marker = L.circleMarker(coords, {
                radius: this.getRadius(data),
                fillColor: color,
                color: '#fff',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.8
            });
            
            marker.bindPopup(popupContent);
            marker.bindTooltip(name, {
                permanent: false,
                direction: 'top'
            });
            
            marker.addTo(this.map);
            this.markers.push(marker);
        }
        
        this.updateLegend(dataType);
        return this;
    }

    /**
     * Get color based on data type
     */
    getColor(data, dataType) {
        const scale = this.colorScales[dataType];
        
        if (dataType === 'turnout') {
            const turnout = data.turnout || 0;
            for (const range of scale.ranges) {
                if (turnout >= range.min && turnout < range.max) {
                    return range.color;
                }
            }
            return scale.ranges[scale.ranges.length - 1].color;
        }
        
        if (dataType === 'winner') {
            const winner = data.winner;
            if (winner && CONFIG.PARTIES_SV[winner.key]) {
                return CONFIG.PARTIES_SV[winner.key].color;
            }
            return '#808080';
        }
        
        // Party-specific color gradient
        if (scale.party) {
            const partyResults = data.partyResults || [];
            const total = partyResults.reduce((sum, p) => sum + p.votes, 0);
            const party = partyResults.find(p => p.key === scale.party);
            const percent = party && total > 0 ? (party.votes / total) * 100 : 0;
            
            return this.getPartyGradientColor(percent, CONFIG.PARTIES_SV[scale.party]?.color || '#808080');
        }
        
        return '#808080';
    }

    /**
     * Get gradient color for party percentage
     */
    getPartyGradientColor(percent, baseColor) {
        // Create a gradient from light to dark based on percentage
        const opacity = Math.min(0.3 + (percent / 100) * 0.7, 1);
        return baseColor;
    }

    /**
     * Get marker radius based on number of voters
     */
    getRadius(data) {
        const voters = data.voters || 0;
        // Scale radius between 10 and 30 based on voters
        const minRadius = 10;
        const maxRadius = 30;
        const maxVoters = 50000;
        
        return minRadius + (Math.min(voters, maxVoters) / maxVoters) * (maxRadius - minRadius);
    }

    /**
     * Create popup content
     */
    createPopupContent(name, data, dataType) {
        let content = `<div class="map-popup">
            <h4>${name}</h4>
            <table>
                <tr><td>Wahlberechtigte:</td><td><strong>${formatNumber(data.eligible)}</strong></td></tr>
                <tr><td>Wähler/innen:</td><td><strong>${formatNumber(data.voters)}</strong></td></tr>
                <tr><td>Wahlbeteiligung:</td><td><strong>${formatPercent(data.turnout)}</strong></td></tr>`;
        
        if (data.winner) {
            content += `<tr><td>Stärkste Partei:</td><td><strong style="color:${data.winner.color}">${data.winner.name}</strong></td></tr>
                <tr><td>Stimmen:</td><td><strong>${formatNumber(data.winner.votes)} (${formatPercent(data.winner.percent)})</strong></td></tr>`;
        }
        
        content += `</table></div>`;
        return content;
    }

    /**
     * Update the map legend
     */
    updateLegend(dataType) {
        const legendContainer = document.getElementById('legendItems');
        if (!legendContainer) return;
        
        legendContainer.innerHTML = '';
        const scale = this.colorScales[dataType];
        
        if (dataType === 'turnout') {
            for (const range of scale.ranges) {
                const item = document.createElement('div');
                item.className = 'legend-item';
                item.innerHTML = `
                    <span class="legend-color" style="background-color: ${range.color}"></span>
                    <span>${range.min}% - ${range.max}%</span>
                `;
                legendContainer.appendChild(item);
            }
        } else if (dataType === 'winner') {
            // Show party colors for winner display
            const parties = ['D1', 'D3', 'D4', 'D2', 'D5', 'D6', 'D7'];
            for (const key of parties) {
                const party = CONFIG.PARTIES_SV[key];
                if (party) {
                    const item = document.createElement('div');
                    item.className = 'legend-item';
                    item.innerHTML = `
                        <span class="legend-color" style="background-color: ${party.color}"></span>
                        <span>${party.name}</span>
                    `;
                    legendContainer.appendChild(item);
                }
            }
        } else if (scale.party) {
            // Show gradient for party-specific view
            const party = CONFIG.PARTIES_SV[scale.party];
            const ranges = [
                { min: 0, max: 10, label: '< 10%' },
                { min: 10, max: 20, label: '10-20%' },
                { min: 20, max: 30, label: '20-30%' },
                { min: 30, max: 100, label: '> 30%' }
            ];
            
            for (const range of ranges) {
                const item = document.createElement('div');
                item.className = 'legend-item';
                const opacity = 0.3 + (range.min / 100) * 0.7;
                item.innerHTML = `
                    <span class="legend-color" style="background-color: ${party.color}; opacity: ${opacity}"></span>
                    <span>${range.label}</span>
                `;
                legendContainer.appendChild(item);
            }
        }
    }

    /**
     * Clear all markers from the map
     */
    clearMarkers() {
        for (const marker of this.markers) {
            marker.remove();
        }
        this.markers = [];
    }

    /**
     * Fit map to show all districts
     */
    fitBounds() {
        if (this.markers.length > 0) {
            const group = L.featureGroup(this.markers);
            this.map.fitBounds(group.getBounds().pad(0.1));
        }
        return this;
    }

    /**
     * Highlight a specific district
     */
    highlightDistrict(districtName) {
        for (const marker of this.markers) {
            const tooltip = marker.getTooltip();
            if (tooltip && tooltip.getContent() === districtName) {
                marker.setStyle({
                    weight: 4,
                    color: '#ffed00'
                });
                marker.openPopup();
            } else {
                marker.setStyle({
                    weight: 2,
                    color: '#fff'
                });
            }
        }
    }

    /**
     * Reset all district highlighting
     */
    resetHighlight() {
        for (const marker of this.markers) {
            marker.setStyle({
                weight: 2,
                color: '#fff'
            });
        }
    }

    /**
     * Add a choropleth layer using GeoJSON (if available)
     */
    addChoroplethLayer(geoJson, dataType = 'turnout') {
        if (this.geoLayer) {
            this.map.removeLayer(this.geoLayer);
        }
        
        this.geoLayer = L.geoJSON(geoJson, {
            style: (feature) => {
                const data = this.districtData.get(feature.properties.name);
                return {
                    fillColor: data ? this.getColor(data, dataType) : '#808080',
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    fillOpacity: 0.7
                };
            },
            onEachFeature: (feature, layer) => {
                const data = this.districtData.get(feature.properties.name);
                if (data) {
                    layer.bindPopup(this.createPopupContent(feature.properties.name, data, dataType));
                    layer.bindTooltip(feature.properties.name);
                }
                
                layer.on({
                    mouseover: (e) => {
                        const layer = e.target;
                        layer.setStyle({
                            weight: 4,
                            color: '#666'
                        });
                        layer.bringToFront();
                    },
                    mouseout: (e) => {
                        this.geoLayer.resetStyle(e.target);
                    }
                });
            }
        }).addTo(this.map);
        
        return this;
    }

    /**
     * Destroy the map
     */
    destroy() {
        if (this.map) {
            this.map.remove();
            this.map = null;
        }
        this.markers = [];
        this.geoLayer = null;
    }
}

// Create global instance
window.mapManager = new MapManager();

// Add CSS for map popups
const mapStyles = document.createElement('style');
mapStyles.textContent = `
    .map-popup h4 {
        margin: 0 0 10px 0;
        color: #003366;
        font-size: 14px;
        border-bottom: 2px solid #003366;
        padding-bottom: 5px;
    }
    .map-popup table {
        width: 100%;
        font-size: 12px;
    }
    .map-popup td {
        padding: 3px 5px;
    }
    .map-popup td:first-child {
        color: #666;
    }
    .map-popup td:last-child {
        text-align: right;
    }
    .leaflet-popup-content-wrapper {
        border-radius: 8px;
    }
    .leaflet-popup-content {
        margin: 12px 15px;
        min-width: 200px;
    }
`;
document.head.appendChild(mapStyles);
