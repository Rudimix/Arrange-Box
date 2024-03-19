"use strict";
// Конструктор контрола ArrangeBox
function ArrangeBox(containerId) {
    
    let div = document.createElement('div');
    div.id=`${containerId}`
    document.body.append(div);
    this.container = document.getElementById(containerId);
    this.possibleValues = [];
    this.selectedValues = [];
    this.filterPossible = '';

    // Методы контрола
    this.addPossibleValue = function(value) {
        this.possibleValues.push(value);
    };

    this.setSelectedValues = function(values) {
        this.selectedValues = values;
    };

    this.getCurrentValue = function() {
        return this.selectedValues;
    };

    this.resetValues = function() {
        this.selectedValues = [];
    };

    // Рендеринг контрола
    this.render = function() {
        let html = '<div>';

        html += '<input type="text" placeholder="Filter possible values" oninput="filterPossibleValues(event.target.value)">';
        html += '<select id="possible-values" multiple>';

        this.possibleValues.forEach(function(value) {
            if (value.toLowerCase().includes(this.filterPossible.toLowerCase())) {
                html += '<option value="' + value + '">' + value + '</option>';
            }
        }, this);

        html += '</select>';
        html += '<button onclick="moveSelectedValues()">Move Selected</button>';
        html += '<button onclick="moveBackSelectedValues()">Move Back Selected</button>';
        html += '<select id="selected-values" multiple>';

        this.selectedValues.forEach(function(value) {
            html += '<option value="' + value + '">' + value + '</option>';
        });
        html += '</select></div>';

        this.container.innerHTML = html;
    };

    // Добавление обработчика для кнопки "Move Selected"
    let self = this;
    window.moveSelectedValues = function() {
        let selectPossible = document.getElementById('possible-values');

        for (let i = 0; i < selectPossible.options.length; i++) {
            if (selectPossible.options[i].selected) {
                self.selectedValues.push(selectPossible.options[i].value);
                self.possibleValues.splice(i,1)
                selectPossible.remove(i); // Удаление выбранного значения из левого поля
                i--; // Уменьшение индекса, так как элементы сдвигаются после удаления
            }
        }

        self.render();
    };

    // Обработчик для кнопки "Move Back Selected"
    window.moveBackSelectedValues = function() {
        let selectSelected = document.getElementById('selected-values');

        for (let i = 0; i < selectSelected.options.length; i++) {
            if (selectSelected.options[i].selected) {
                self.possibleValues.push(selectSelected.options[i].value);
                self.selectedValues.splice(i,1)
                selectSelected.remove(i); // Удаление выбранного значения из правого поля
                i--; // Уменьшение индекса, так как элементы сдвигаются после удаления
            }
        }

        self.render();
    };

    // Фильтрация значений
    window.filterPossibleValues = function(filter) {
        self.filterPossible = filter;
        self.render();
    };
}