document.addEventListener('DOMContentLoaded', function() {
    ymaps.ready(() => {
        initMap();
        if (typeof map === 'undefined') {
            console.error('Карта не инициализирована. Проверьте загрузку map.js');
        }
        loadObjects();
        initFilters();
        initEventListeners();
    });
});

function loadObjects(filterType = 'all') {
    let filteredObjects;
    
    if (filterType === 'all') {
        filteredObjects = EstateData;
    } else {
        filteredObjects = EstateData.filter(obj => obj.type === filterType);
    }
    

    addObjectsToMap(filteredObjects);
    

    updateObjectsList(filteredObjects);
    

    updateObjectsCount(filteredObjects.length);
}


function initFilters() {
    const filtersGrid = document.querySelector('.filters_grid');
    
    quickFilters.forEach(filter => {
        const filterElement = document.createElement('div');
        filterElement.className = 'filter_card';
        filterElement.innerHTML = `
            <div class="filter_icon" style="background-color: ${filter.color}20; color: ${filter.color};">
                <i class="fas ${filter.icon}"></i>
            </div>
            <div class="filter_name">${filter.name}</div>
            <div class="filter_desc">${filter.description}</div>
        `;
        
        filterElement.addEventListener('click', () => {
            document.querySelectorAll('.filter_card').forEach(card => {
                card.classList.remove('active');
            });
            

            filterElement.classList.add('active');
            
            // Загружаем объекты по фильтру
            loadObjects(filter.id === 'all' ? 'all' : filter.id);
        });
        
        filtersGrid.appendChild(filterElement);
    });
    
    // Активируем первый фильтр
    document.querySelector('.filter_card').classList.add('active');
}

// Обновление списка объектов
function updateObjectsList(objects) {
    const container = document.querySelector('.found_objects');
    
    if (objects.length === 0) {
        container.innerHTML = '<p class="no_results">Ничего не смогли найти</p>';
        return;
    }
    
    let html = '';
    
    objects.forEach(obj => {
        const isActive = obj.id === selectedObjectId;
        
        html += `
            <div class="object_card ${isActive ? 'active' : ''}" data-id="${obj.id}">
                <div class="object_header">
                    <h4>${obj.title}</h4>
                    <span class="object_price">${formatPrice(obj.price)}</span>
                </div>
                <p class="object_address">
                    <i class="fas fa-map-marker-alt"></i>
                    ${obj.address}
                </p>
                <div class="object_details">
                    <span><i class="fas fa-expand-arrows-alt"></i> ${obj.area} м²</span>
                    <span><i class="fas fa-layer-group"></i> ${obj.floor}/${obj.floorsTotal}</span>
                    <span><i class= "fas fa-subway"></i> ${obj.metroDistance} м</span>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    
    // Добавляем обработчики кликов
    document.querySelectorAll('.object_card').forEach(card => {
        card.addEventListener('click', function() {
            const objectId = parseInt(this.getAttribute('data-id'));
            selectObject(objectId);
        });
    });
}

// Обновление счетчика объектов
function updateObjectsCount(count) {
    document.querySelector('.found_count').textContent = count;
}

// Показ деталей объекта
function showObjectDetails(object) {
    const detailsPanel = document.querySelector('.details');
    
    detailsPanel.innerHTML = `
        <div class="object_details_full">
            <h3>${object.title}</h3>
            <div class="detail_item">
                <strong>Адрес:</strong> ${object.address}
            </div>
            <div class="detail_item">
                <strong>Цена:</strong> ${formatPrice(object.price)}/мес
            </div>
            <div class="detail_item">
                <strong>Площадь:</strong> ${object.area} м²
            </div>
            <div class="detail_item">
                <strong>Этаж:</strong> ${object.floor} из ${object.floorsTotal}
            </div>
            <div class="detail_item">
                <strong>Метро:</strong> ${object.metro} (${object.metroDistance} м)
            </div>
            <div class="detail_item">
                <strong>Описание:</strong> ${object.description}
            </div>
        </div>
    `;
    
    // Обновляем активную карточку в списке
    document.querySelectorAll('.object_card').forEach(card => {
        const cardId = parseInt(card.getAttribute('data-id'));
        if (cardId === object.id) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
}

// Инициализация обработчиков событий
function initEventListeners() {
    document.querySelector('.analyze-btn').addEventListener('click', function() {
        const text = document.querySelector('textarea').value.trim();
        
        if (!text) {
            alert('Введите требования для поиска');
            return;
        }
        

        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Ищем подходящие варианты...';
        this.disabled = true;
        
        setTimeout(() => {
            this.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i> Начать поиск';
            this.disabled = false;
            

            showAnalysisResults(text);
        }, 2000);
    });
    
    // Кнопки управления картой
    document.getElementById('zoomIn').addEventListener('click', () => {
        map.setZoom(map.getZoom() + 1);
    });
    
    document.getElementById('zoomOut').addEventListener('click', () => {
        map.setZoom(map.getZoom() - 1);
    });
}


function showAnalysisResults(text) {
    alert(`ИИ проанализировал ваш запрос: "${text}"\n\nИзвлечены параметры:\n- Тип: офис\n- Площадь: 100-150 м²\n- Бюджет: до 200 тыс./мес`);
}