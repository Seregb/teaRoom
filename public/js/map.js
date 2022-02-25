ymaps.ready(init);

function init() {
  const myMap = new ymaps.Map('map', {
    center: [55.76, 37.64],

    zoom: 5,
    controls: ['zoomControl'],
    behaviors: ['drag'],
  });
  const myPlacemark = new ymaps.Placemark([55.8, 37.6], {
    hintContent: 'Hint',
    balloonContent: 'Ballon',
  });
  const mySedondPlacemark = new ymaps.Placemark([55.6, 37.6], {
    // hintContent: 'Hint',
    balloonContent: 'fdwfsds',
  });

  myMap.geoObjects.add(myPlacemark).add(mySedondPlacemark);

  myMap.events.add('click', (e) => {
    let coords = e.get('coords');
    console.log(coords);
    const mark = new ymaps.Placemark(
      coords,
      {
        iconCaption: 'поиск...',
      },
      {
        preset: 'islands#violetDotIconWithCaption',
        draggable: true,
      }
    );
    myPlacemark.geometry.setCoordinates(coords);
    getAddress(coords);
  });

  function getAddress(coords) {
    myPlacemark.properties.set('iconCaption', 'поиск...');
    ymaps.geocode(coords).then((res) => {
      let firstGeoObject = res.geoObjects.get(0);

      myPlacemark.properties.set({
        // Формируем строку с данными об объекте.
        iconCaption: [
          firstGeoObject.getLocalities().length
            ? firstGeoObject.getLocalities()
            : firstGeoObject.getAdministrativeAreas(),
          // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
          firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
        ]
          .filter(Boolean)
          .join(', '),
        // В качестве контента балуна задаем строку с адресом объекта.
        balloonContent: firstGeoObject.getAddressLine(),
      });
    });
    console.log(mySedondPlacemark.properties);
  }
}
