import { parentPort, workerData } from 'worker_threads';
import { Range } from '../interfaces/Range';
import { Sensor } from '../interfaces/Sensors';
import { calculateDistance } from '../utilities/calculateDistance';

const findBeacon = ({ lower, upper }: Range) => {
  const sensors: Sensor[] = workerData.sensors;

  for (let x = lower; x <= upper; x++) {
    for (let y = 0; y <= workerData.y; y++) {
      const sensor = sensors.find((sensor) => calculateDistance(sensor, { x, y }) <= sensor.distance);
      if (!sensor) {
        return 4000000 * x + y;
      }
      // Skip forward the rest of the values in the sensor.
      const skip = sensor.y - y + sensor.distance - Math.abs(sensor.x - x);
      y += skip;
    }
  }

  throw new Error('Unable to find Beacon!');
};

parentPort?.on('message', (data: Range) => {
  parentPort?.postMessage(findBeacon(data));
});
