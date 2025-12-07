let map, objectManager, selectedObjectId;

function initMap() {
    map = new ymaps.Map('map', {

        center: [55.76, 37.64], // Москва
        zoom: 10,
        controls: []
    }, {
        searchControlProvider: 'yandex#search'
    });

    objectManager = new ymaps.ObjectManager({
        clusterize: true, // Включаем кластеризацию
        gridSize: 64, // Размер кластера
        clusterDisableClickZoom: true // Запрещаем увеличение при клике на кластер
    });

    objectManager.clusters.options.set({
        preset: 'islands#invertedBlueClusterIcons',
        clusterDisableClickZoom: true
    });
    
    // Настраиваем внешний вид меток
    objectManager.objects.options.set({
        preset: 'islands#blueDotIcon',
        openBalloonOnClick: true // Открываем балун при клике
    });

    map.geoObjects.add(objectManager);

    objectManager.objects.events.add('click', function(e) {
        const objectId = e.get('objectId');
        selectObject(objectId);
    });
    
    // Обработчик клика по кластеру
    objectManager.clusters.events.add('click', function(e) {
        const objectId = e.get('objectId');
        const cluster = objectManager.clusters.getById(objectId);
        const geometry = cluster.geometry.getCoordinates();
        
        // Приближаем карту к кластеру
        map.setCenter(geometry, map.getZoom() + 2);
    });
}


function addObjectsToMap(objects) {
    const features = objects.map(obj => ({
        id: obj.id,
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [obj.latitude, obj.longitude]
        },
        properties: {
            balloonContentHeader: obj.title,
            balloonContentBody: `
                <p><strong>Адрес:</strong> ${obj.address}</p>
                <p><strong>Цена:</strong> ${formatPrice(obj.price)}/мес</p>
                <p><strong>Площадь:</strong> ${obj.area} м²</p>
                <button onclick="selectObject(${obj.id})" style="
                    background: #4a6cf7;
                    color: white;
                    border: none;
                    padding: 5px 10px;
                    border-radius: 4px;
                    cursor: pointer;
                    margin-top: 5px;
                ">Подробнее</button>
            `,
            hintContent: obj.title,
            type: obj.type
        },
        options: {
            preset: getPresetByType(obj.type)
        }
    }));
    
    // Очищаем старые объекты и добавляем новые
    objectManager.removeAll();
    objectManager.add(features);
}

function getPresetByType(type) {
    switch(type) {
        case 'office': return 'islands#blueOfficeIcon';
        case 'retail': return 'islands#greenShoppingIcon';
        case 'warehouse': return 'islands#brownWarehouseIcon';
        default: return 'islands#blueDotIcon';
    }
}

function formatPrice(price) {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
}

// Выбор объекта
function selectObject(id) {
    selectedObjectId = id;
    const object = EstateData.find(obj => obj.id === id);
    
    if (!object) return;
    
    // Центрируем карту на объекте
    map.setCenter([object.latitude, object.longitude], 15);
    
    // Открываем балун
    objectManager.objects.balloon.open(id);
    
    // Показываем детали объекта
    showObjectDetails(object);
}