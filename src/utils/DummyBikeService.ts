import { Bike } from '../model';

let BikeData: Array<Bike> = [
  { id: 1, brand: 'Honda', model: 'CBR 600', color: 'black', cc: 600 },
  { id: 2, brand: 'Yamaha', model: 'R6', color: 'white', cc: 600 },
  { id: 3, brand: 'Suzuki', model: 'Katana', color: 'red', cc: 1000 },
];

const TIMEOUT = 1200;

export class DummyBikeService {
  static getBikes() {
    return new Promise<Array<Bike>>((resolve, reject) => {
      console.log('[>] Performing bike list request...');
      setTimeout(() => {
        if (Math.random() >= 0.5) {
          resolve(BikeData);
        } else {
          const msg = 'Random rejection in list bikes';
          console.error(`[X] ${msg}`);
          reject(msg);
        }
      }, TIMEOUT);
    });
  }

  static addBike(bike: Bike) {
    return new Promise<Bike>((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() >= 0.5) {
          bike.id = BikeData.length + 1;
          BikeData.push(bike);
          resolve(bike);
        } else {
          const msg = 'Random rejection in create bike';
          console.error(`[X] ${msg}`);
          reject(msg);
        }
      }, TIMEOUT);
    });
  }
}
