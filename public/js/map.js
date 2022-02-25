ymaps.ready(init);

function init() {
  const myMap = new ymaps.Map('map', {
    center: [55.76, 37.64],

    zoom: 7,
    controls: ['zoomControl'],
    behaviors: ['drag'],
  });
  const myPlacemark = new ymaps.Placemark([55.8, 37.6], {
    hintContent: 'Hint',
    balloonContent: 'Ballon',
  });
  myMap.geoObjects.add(myPlacemark);
  myMap.geoObjects.add((new ymaps.Placemark([56.833436, 35.715175], {
    balloonContent: '<strong><a href=http://localhost:3000/tea/1 >Каркаде</strong>',
  })));
}
