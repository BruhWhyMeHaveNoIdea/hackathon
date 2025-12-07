/* После заменить на данные, взятые из парсинга */
const EstateData = [
    {
        id: 1,
        title: "Офис в центре",
        address: "Москва, ул. Тверская, д. 10",
        price: 150000,
        area: 120,
        floor: 3,
        floorsTotal: 8,
        type: "office",
        description: "Просторный офис с панорамными окнами",
        latitude: 55.7596,
        longitude: 37.6105,
        metro: "Тверская",
        metroDistance: 200
    },
    {
        id: 2,
        title: "Торговое помещение",
        address: "Москва, Арбат, д. 25",
        price: 220000,
        area: 85,
        floor: 1,
        floorsTotal: 3,
        type: "retail",
        description: "Помещение в пешеходной зоне",
        latitude: 55.7490,
        longitude: 37.5905,
        metro: "Арбатская",
        metroDistance: 150
    },
    {
        id: 3,
        title: "Складской комплекс",
        address: "Московская обл., г. Химки",
        price: 180000,
        area: 350,
        floor: 1,
        floorsTotal: 1,
        type: "warehouse",
        description: "Современный склад с подъемниками",
        latitude: 55.8897,
        longitude: 37.4453,
        metro: "Планерная",
        metroDistance: 1200
    },
    {
        id: 4,
        title: "Офис в БЦ",
        address: "Москва, Пресненская наб., 12",
        price: 320000,
        area: 180,
        floor: 12,
        floorsTotal: 25,
        type: "office",
        description: "Офис премиум-класса",
        latitude: 55.7495,
        longitude: 37.5397,
        metro: "Выставочная",
        metroDistance: 300
    }
];

/* Готовые фильтры по парсеру */
const quickFilters = [
    {
        id: "office",
        name: "Офисы",
        icon: "fa-building",
        description: "от 50 м²",
        color: "#4a6cf7"
    },
    {
        id: "retail",
        name: "Торговые",
        icon: "fa-store",
        description: "1 этаж",
        color: "#10b981"
    },
    {
        id: "warehouse",
        name: "Склады",
        icon: "fa-warehouse",
        description: "от 100 м²",
        color: "#8b5cf6"
    },
    {
        id: "all",
        name: "Все",
        icon: "fa-city",
        description: "все объекты",
        color: "#f59e0b"
    }
];