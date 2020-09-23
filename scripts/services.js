import {utils} from './utility.js';
import {tableColumns} from '../config/vacancies.config.js';
class VacanciesTable {
    #table = document.getElementById('vacanciesTable');

    initialize() {
        this._loadTableStructure();
        this._fetchTableData();
    }

    _fetchTableData() {
        utils.get('apis/vacancies.json', function(response) {
            const vacancies = response.data;
            if (vacancies && vacancies.length) {
                this._loadTableData(vacancies)
            } else {
                this._showNoDataContainer();
            }
        }.bind(this))
    }

    _loadTableStructure() {
        const thead = this.#table.createTHead()
        const headerTr = thead.appendChild(document.createElement('TR')) //thead.insertRow();
        headerTr.setAttribute('class', 'table-head')
        for(var col = 0; col < tableColumns.length; col++) {
            const th = headerTr.appendChild(document.createElement('TH'))
            th.appendChild(document.createTextNode(tableColumns[col].header));
        }
    }
    
    _loadTableData(data) {
        for(var row = 0; row < data.length; row++) {
            const rowTr = document.createElement('TR');
            for(var col = 0; col < tableColumns.length; col++) {
                const cell = rowTr.appendChild(document.createElement('TD'))
    
                let cellData = data[row][tableColumns[col].key] // || '';
                if (tableColumns[col].dataType === 'string') {
                    // do nothing
                } else if (tableColumns[col].dataType === 'boolean') {
                    if (tableColumns[col].showApplyButton) {
                        if (cellData) {
                            cell.appendChild(utils.createInputEl('Apply Now'));
                            cellData = null;
                        } else {
                            cellData = '-';
                        }
                    } else if (tableColumns[col].valueMap) {
                        cellData = tableColumns[col].valueMap[cellData]
                    } else {
                        cellData = cellData ? 'Yes' : 'No' // default text values
                    }
                } else if (tableColumns[col].downloadUrl) {
                    if (cellData) {
                        const optionalPath = tableColumns[col].downloadKey ? data[row][tableColumns[col].downloadKey] : '';
                        const downloadUrl = tableColumns[col].downloadUrl + optionalPath;
                        
                        cell.setAttribute('class', 'download-btn')
                        cell.appendChild(utils.createAEl('Get Description', downloadUrl, true));
                        cellData = null;
                    } else {
                        cellData = '-';
                    }
                }
    
                if (cellData) {
                    cell.appendChild(document.createTextNode(cellData));
                } else {
                    // assume other html elements are inserted into cell
                }
            }
            this.#table.appendChild(rowTr);
        }
    }
    
    _showNoDataContainer() {
        const body = this.#table.createTBody();
        const row = body.insertRow();
        const td = row.insertCell();
        td.setAttribute('colspan', tableColumns.length);
        td.setAttribute('class', 'empty-row');
        td.innerHTML = 'No Data Available.';
    }
}

export let vacanciesTable = new VacanciesTable();