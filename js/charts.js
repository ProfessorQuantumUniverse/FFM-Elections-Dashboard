/**
 * Frankfurt Elections Dashboard - Charts Module
 * Handles all Chart.js visualizations
 */

class ChartManager {
    constructor() {
        this.charts = new Map();
        this.isChartJsAvailable = typeof window !== 'undefined' && typeof window.Chart !== 'undefined';
        this.defaultOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        usePointStyle: true,
                        font: {
                            size: 11
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: { size: 13 },
                    bodyFont: { size: 12 },
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) label += ': ';
                            if (context.parsed.y !== null) {
                                label += formatNumber(context.parsed.y);
                            } else if (context.parsed !== null) {
                                label += formatNumber(context.parsed);
                            }
                            return label;
                        }
                    }
                }
            }
        };
        
        // Set Chart.js defaults (if available)
        if (this.isChartJsAvailable) {
            Chart.defaults.font.family = "'Segoe UI', system-ui, -apple-system, sans-serif";
            Chart.defaults.color = '#2d3748';
        } else {
            console.warn('Chart.js konnte nicht geladen werden. Diagramme werden als Platzhalter angezeigt.');
        }
    }

    /**
     * Create or update a chart
     * @param {string} canvasId - Canvas element ID
     * @param {string} type - Chart type (bar, pie, line, etc.)
     * @param {Object} data - Chart data
     * @param {Object} options - Chart options
     * @returns {Chart} Chart instance
     */
    createChart(canvasId, type, data, options = {}) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) {
            console.error(`Canvas not found: ${canvasId}`);
            return null;
        }

        if (!this.isChartJsAvailable) {
            this.renderUnavailableChart(canvasId);
            return null;
        }

        // Destroy existing chart if present
        if (this.charts.has(canvasId)) {
            this.charts.get(canvasId).destroy();
        }

        const mergedOptions = this.mergeOptions(this.defaultOptions, options);
        const chart = new Chart(ctx, {
            type,
            data,
            options: mergedOptions
        });
        
        this.charts.set(canvasId, chart);
        return chart;
    }

    /**
     * Render a simple placeholder if Chart.js is unavailable
     */
    renderUnavailableChart(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas || typeof canvas.getContext !== 'function') return;

        const context = canvas.getContext('2d');
        if (!context) return;

        // Sync canvas backing size with visible size for crisp text
        const rect = canvas.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
            canvas.width = Math.floor(rect.width);
            canvas.height = Math.floor(rect.height);
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = '#f7fafc';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = '#4a5568';
        context.font = '14px Segoe UI, system-ui, sans-serif';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText('Diagramm nicht verfügbar (Chart.js konnte nicht geladen werden)', canvas.width / 2, canvas.height / 2);
    }

    /**
     * Deep merge options objects
     */
    mergeOptions(defaults, overrides) {
        const result = { ...defaults };
        for (const key in overrides) {
            if (typeof overrides[key] === 'object' && !Array.isArray(overrides[key]) && overrides[key] !== null) {
                result[key] = this.mergeOptions(defaults[key] || {}, overrides[key]);
            } else {
                result[key] = overrides[key];
            }
        }
        return result;
    }

    /**
     * Create a horizontal bar chart for party results
     */
    createPartyBarChart(canvasId, partyResults, title = 'Stimmen nach Parteien') {
        const data = {
            labels: partyResults.map(p => p.name),
            datasets: [{
                label: 'Stimmen',
                data: partyResults.map(p => p.votes),
                backgroundColor: partyResults.map(p => p.color || '#808080'),
                borderColor: partyResults.map(p => p.color || '#808080'),
                borderWidth: 1
            }]
        };
        
        const options = {
            indexAxis: 'y',
            plugins: {
                legend: { display: false },
                title: { display: false }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return formatNumber(value);
                        }
                    }
                },
                y: {
                    ticks: {
                        font: { size: 11 }
                    }
                }
            }
        };
        
        return this.createChart(canvasId, 'bar', data, options);
    }

    /**
     * Create a vertical bar chart for party results
     */
    createPartyVerticalBarChart(canvasId, partyResults, showPercent = false) {
        const data = {
            labels: partyResults.map(p => p.name),
            datasets: [{
                label: showPercent ? 'Prozent' : 'Stimmen',
                data: partyResults.map(p => showPercent ? p.percent : p.votes),
                backgroundColor: partyResults.map(p => p.color || '#808080'),
                borderColor: partyResults.map(p => p.color || '#808080'),
                borderWidth: 1,
                borderRadius: 4
            }]
        };
        
        const options = {
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            if (showPercent) {
                                return formatPercent(context.parsed.y);
                            }
                            return formatNumber(context.parsed.y) + ' Stimmen';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            if (showPercent) return value + '%';
                            return formatNumber(value);
                        }
                    }
                },
                x: {
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            }
        };
        
        return this.createChart(canvasId, 'bar', data, options);
    }

    /**
     * Create a pie/doughnut chart for vote distribution
     */
    createPieChart(canvasId, partyResults, isDoughnut = true) {
        const data = {
            labels: partyResults.map(p => p.name),
            datasets: [{
                data: partyResults.map(p => p.votes),
                backgroundColor: partyResults.map(p => p.color || '#808080'),
                borderColor: '#fff',
                borderWidth: 2
            }]
        };
        
        const options = {
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        generateLabels: function(chart) {
                            const data = chart.data;
                            if (data.labels.length && data.datasets.length) {
                                const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
                                return data.labels.map((label, i) => {
                                    const value = data.datasets[0].data[i];
                                    const percent = ((value / total) * 100).toFixed(1);
                                    return {
                                        text: `${label} (${percent}%)`,
                                        fillStyle: data.datasets[0].backgroundColor[i],
                                        hidden: false,
                                        index: i
                                    };
                                });
                            }
                            return [];
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percent = ((context.parsed / total) * 100).toFixed(1);
                            return `${context.label}: ${formatNumber(context.parsed)} (${percent}%)`;
                        }
                    }
                }
            }
        };
        
        return this.createChart(canvasId, isDoughnut ? 'doughnut' : 'pie', data, options);
    }

    /**
     * Create a turnout bar chart for districts
     */
    createTurnoutChart(canvasId, districts, sortKey = null) {
        let sortedDistricts = [...districts];
        if (sortKey === 'turnout-desc') {
            sortedDistricts.sort((a, b) => b.turnout - a.turnout);
        } else if (sortKey === 'turnout-asc') {
            sortedDistricts.sort((a, b) => a.turnout - b.turnout);
        }
        
        const avgTurnout = districts.reduce((sum, d) => sum + d.turnout, 0) / districts.length;
        
        const data = {
            labels: sortedDistricts.map(d => d.name),
            datasets: [{
                label: 'Wahlbeteiligung',
                data: sortedDistricts.map(d => d.turnout),
                backgroundColor: sortedDistricts.map(d => 
                    d.turnout >= avgTurnout ? 'rgba(72, 187, 120, 0.8)' : 'rgba(237, 137, 54, 0.8)'
                ),
                borderColor: sortedDistricts.map(d => 
                    d.turnout >= avgTurnout ? '#48bb78' : '#ed8936'
                ),
                borderWidth: 1,
                borderRadius: 4
            }]
        };
        
        const options = {
            indexAxis: 'y',
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Wahlbeteiligung: ${context.parsed.x.toFixed(1)}%`;
                        }
                    }
                },
                annotation: {
                    annotations: {
                        line1: {
                            type: 'line',
                            xMin: avgTurnout,
                            xMax: avgTurnout,
                            borderColor: '#003366',
                            borderWidth: 2,
                            borderDash: [5, 5],
                            label: {
                                display: true,
                                content: `Ø ${avgTurnout.toFixed(1)}%`,
                                position: 'start'
                            }
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        };
        
        return this.createChart(canvasId, 'bar', data, options);
    }

    /**
     * Create a grouped bar chart comparing multiple datasets
     */
    createComparisonChart(canvasId, labels, datasets) {
        const data = {
            labels,
            datasets: datasets.map((ds, index) => ({
                label: ds.label,
                data: ds.data,
                backgroundColor: ds.color || CONFIG.CHART_COLORS[index % CONFIG.CHART_COLORS.length],
                borderColor: ds.color || CONFIG.CHART_COLORS[index % CONFIG.CHART_COLORS.length],
                borderWidth: 1,
                borderRadius: 4
            }))
        };
        
        const options = {
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return formatNumber(value);
                        }
                    }
                }
            }
        };
        
        return this.createChart(canvasId, 'bar', data, options);
    }

    /**
     * Create a stacked bar chart for vote types
     */
    createStackedBarChart(canvasId, partyResults) {
        const data = {
            labels: partyResults.map(p => p.name),
            datasets: [
                {
                    label: 'Unverändert',
                    data: partyResults.map(p => p.unchanged || 0),
                    backgroundColor: 'rgba(72, 187, 120, 0.8)',
                    borderColor: '#48bb78',
                    borderWidth: 1
                },
                {
                    label: 'Verändert',
                    data: partyResults.map(p => p.changed || 0),
                    backgroundColor: 'rgba(66, 153, 225, 0.8)',
                    borderColor: '#4299e1',
                    borderWidth: 1
                },
                {
                    label: 'Panaschiert',
                    data: partyResults.map(p => p.panasch || 0),
                    backgroundColor: 'rgba(237, 137, 54, 0.8)',
                    borderColor: '#ed8936',
                    borderWidth: 1
                }
            ]
        };
        
        const options = {
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45
                    }
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return formatNumber(value);
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${formatNumber(context.parsed.y)}`;
                        }
                    }
                }
            }
        };
        
        return this.createChart(canvasId, 'bar', data, options);
    }

    /**
     * Create a line chart for trends
     */
    createLineChart(canvasId, labels, datasets) {
        const data = {
            labels,
            datasets: datasets.map((ds, index) => ({
                label: ds.label,
                data: ds.data,
                borderColor: ds.color || CONFIG.CHART_COLORS[index % CONFIG.CHART_COLORS.length],
                backgroundColor: 'transparent',
                tension: 0.3,
                pointRadius: 4,
                pointHoverRadius: 6
            }))
        };
        
        const options = {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        };
        
        return this.createChart(canvasId, 'line', data, options);
    }

    /**
     * Create a scatter plot for correlations
     */
    createScatterChart(canvasId, dataPoints, xLabel, yLabel) {
        const data = {
            datasets: [{
                label: `${xLabel} vs. ${yLabel}`,
                data: dataPoints.map(p => ({ x: p.x, y: p.y })),
                backgroundColor: 'rgba(0, 51, 102, 0.6)',
                borderColor: '#003366',
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        };
        
        const options = {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: xLabel
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: yLabel
                    },
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const point = dataPoints[context.dataIndex];
                            return [
                                point.label || '',
                                `${xLabel}: ${context.parsed.x.toFixed(1)}%`,
                                `${yLabel}: ${context.parsed.y.toFixed(1)}%`
                            ];
                        }
                    }
                }
            }
        };
        
        return this.createChart(canvasId, 'scatter', data, options);
    }

    /**
     * Create a radar chart
     */
    createRadarChart(canvasId, labels, datasets) {
        const data = {
            labels,
            datasets: datasets.map((ds, index) => ({
                label: ds.label,
                data: ds.data,
                borderColor: ds.color || CONFIG.CHART_COLORS[index % CONFIG.CHART_COLORS.length],
                backgroundColor: (ds.color || CONFIG.CHART_COLORS[index % CONFIG.CHART_COLORS.length]) + '40',
                pointBackgroundColor: ds.color || CONFIG.CHART_COLORS[index % CONFIG.CHART_COLORS.length],
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: ds.color || CONFIG.CHART_COLORS[index % CONFIG.CHART_COLORS.length]
            }))
        };
        
        const options = {
            scales: {
                r: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        };
        
        return this.createChart(canvasId, 'radar', data, options);
    }

    /**
     * Create a candidate votes bar chart
     */
    createCandidateChart(canvasId, candidates, partyColor) {
        const data = {
            labels: candidates.map(c => `Listenplatz ${c.position}`),
            datasets: [{
                label: 'Stimmen',
                data: candidates.map(c => c.votes),
                backgroundColor: partyColor + 'CC',
                borderColor: partyColor,
                borderWidth: 1,
                borderRadius: 4
            }]
        };
        
        const options = {
            indexAxis: 'y',
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${formatNumber(context.parsed.x)} Stimmen`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return formatNumber(value);
                        }
                    }
                }
            }
        };
        
        return this.createChart(canvasId, 'bar', data, options);
    }

    /**
     * Destroy a specific chart
     */
    destroyChart(canvasId) {
        if (this.charts.has(canvasId)) {
            this.charts.get(canvasId).destroy();
            this.charts.delete(canvasId);
        }
    }

    /**
     * Destroy all charts
     */
    destroyAllCharts() {
        for (const [id, chart] of this.charts) {
            chart.destroy();
        }
        this.charts.clear();
    }
}

// Create global instance
window.chartManager = new ChartManager();
