import React, { useEffect, MouseEvent, useState } from 'react';

import { useEntity, useException$ } from './hooks';
import { DummyCarService, DummyBikeService } from './utils';

function App() {
  // CARS SECION =======================================================================================================================
  const {
    isOnTask: isOnTaskCar,
    loadCollection: carLoadCollection,
    entityCollection: carCollection,
    saveEntity: saveCar,
    exception$: carException$,
  } = useEntity(DummyCarService.getCars, DummyCarService.addCar);

  const [carException, setCarException] = useState('');

  useException$(carException$, exception => {
    setCarException(`It was an exception for CAR. Type: ${exception.type}`);
  });

  const handleClickAddCar = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    saveCar({ brand: 'Ferrari', model: 'Enzo', year: 2002, color: 'red' });
  };

  const handleClickLoadCar = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    carLoadCollection();
    setCarException('');
  };

  // BIKES SECION =======================================================================================================================
  const {
    isOnTask: isOnTaskBike,
    loadCollection: bikeLoadCollection,
    entityCollection: bikeCollection,
    saveEntity: saveBike,
    exception$: bikeException$,
  } = useEntity(DummyBikeService.getBikes, DummyBikeService.addBike);

  const [bikeException, setBikeException] = useState('');

  useException$(bikeException$, exception => {
    setBikeException(`It was an exception for BIKES. Type: ${exception.type}`);
  });

  const handleClickAddBike = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    saveBike({ brand: 'BMW', model: 'GS 1150', cc: 1150, color: 'white' });
  };

  const handleClickLoadBike = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    bikeLoadCollection();
    setBikeException('');
  };

  // SHARED SECION =======================================================================================================================
  useEffect(() => {
    carLoadCollection();
    bikeLoadCollection();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          minWidth: '400px',
        }}
      >
        <h2>CARS</h2>
        {!isOnTaskCar ? (
          <>
            <br />
            {carException ? (
              carException
            ) : (
              <table>
                <thead>
                  <tr>
                    <th style={{ width: '75px' }}>Brand</th>
                    <th style={{ width: '75px' }}>Model</th>
                    <th style={{ width: '75px' }}>Color</th>
                    <th style={{ width: '75px' }}>Year</th>
                  </tr>
                </thead>
                <tbody>
                  {carCollection && carCollection.length > 0
                    ? carCollection.map(car => (
                        <tr key={`car-item-${car.id}`}>
                          <td>{car.brand}</td>
                          <td>{car.model}</td>
                          <td>{car.color}</td>
                          <td>{car.year}</td>
                        </tr>
                      ))
                    : undefined}
                </tbody>
              </table>
            )}
            <br />
          </>
        ) : (
          <br />
        )}
        <button type="button" onClick={handleClickAddCar} disabled={!!carException || isOnTaskCar}>
          Add Car
        </button>
        <button type="button" onClick={handleClickLoadCar} disabled={isOnTaskCar}>
          Reload
        </button>
      </div>
      <div
        style={{
          minWidth: '400px',
        }}
      >
        <h2>BIKES</h2>
        {!isOnTaskBike ? (
          <>
            <br />
            {bikeException ? (
              bikeException
            ) : (
              <table>
                <thead>
                  <tr>
                    <th style={{ width: '75px' }}>Brand</th>
                    <th style={{ width: '75px' }}>Model</th>
                    <th style={{ width: '75px' }}>Color</th>
                    <th style={{ width: '75px' }}>CC</th>
                  </tr>
                </thead>
                <tbody>
                  {bikeCollection && bikeCollection.length > 0
                    ? bikeCollection.map(bike => (
                        <tr key={`bike-item-${bike.id}`}>
                          <td>{bike.brand}</td>
                          <td>{bike.model}</td>
                          <td>{bike.color}</td>
                          <td>{bike.cc}</td>
                        </tr>
                      ))
                    : undefined}
                </tbody>
              </table>
            )}
            <br />
          </>
        ) : (
          <br />
        )}
        <button
          type="button"
          onClick={handleClickAddBike}
          disabled={!!bikeException || isOnTaskBike}
        >
          Add Bike
        </button>
        <button type="button" onClick={handleClickLoadBike} disabled={isOnTaskBike}>
          Reload
        </button>
      </div>
    </div>
  );
}

export default App;
