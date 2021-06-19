import { Car } from '../model';

let CarData: Array<Car> = [
  { id: 1, brand: 'BMW', year: 2021, model: 'M6', color: 'black' },
  { id: 2, brand: 'Tesla', year: 2021, model: 'Model X', color: 'white' },
  { id: 3, brand: 'Tesla', year: 2021, model: 'Model 3', color: 'red' },
];

const TIMEOUT = 1200;

export class DummyCarService {
  static getCars() {
    return new Promise<Array<Car>>((resolve, reject) => {
      console.log('[>] Performing car list request...');
      setTimeout(() => {
        if (Math.random() >= 0.5) {
          resolve(CarData);
        } else {
          const msg = 'Random rejection in list cars';
          console.error(`[X] ${msg}`);
          reject(msg);
        }
      }, TIMEOUT);
    });
  }

  static addCar(car: Car) {
    return new Promise<Car>((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() >= 0.5) {
          car.id = CarData.length + 1;
          CarData.push(car);
          resolve(car);
        } else {
          const msg = 'Random rejection in create car';
          console.error(`[X] ${msg}`);
          reject(msg);
        }
      }, TIMEOUT);
    });
  }
}
