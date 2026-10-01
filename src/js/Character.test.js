import Magician from './Magician.js';
import Daemon from './Daemon.js';

describe('Тестирование расчёта атаки и дурмана для Magician и Daemon', () => {
  test('Должен правильно устанавливать начальные свойства', () => {
    const magician = new Magician('Merlin');
    expect(magician.name).toBe('Merlin');
    expect(magician.type).toBe('Magician');
    expect(magician.stoned).toBe(false);
  });

  test('Атака на 1 клетку должна составлять 100% без дурмана', () => {
    const magician = new Magician('Merlin');
    magician.distance = 1;
    expect(magician.attack).toBe(100);
  });

  test('Атака на 2 клетку должна падать до 90% без дурмана', () => {
    const magician = new Magician('Merlin');
    magician.distance = 2;
    expect(magician.attack).toBe(90);
  });

  test('Атака на 5 клетку должна падать до 60% без дурмана', () => {
    const daemon = new Daemon('Azazel');
    daemon.distance = 5;
    expect(daemon.attack).toBe(60);
  });

  test('Должен корректно рассчитывать урон с дурманом на 2 клетке (Пример из легенды: 85 вместо 90)', () => {
    const magician = new Magician('Merlin');
    magician.distance = 2;
    magician.stoned = true;
    expect(magician.attack).toBe(85);
  });

  test('Сеттер stoned должен корректно приводить значение к логическому типу', () => {
    const daemon = new Daemon('Azazel');
    daemon.stoned = 'yes'; // Любое непустое строковое значение превращается в true
    expect(daemon.stoned).toBe(true);
  });

  test('Атака не должна становиться отрицательной, если урон упал ниже нуля', () => {
    const daemon = new Daemon('Azazel');
    daemon.attack = 10; // Установим заведомо маленькую базовую атаку
    daemon.distance = 5;
    daemon.stoned = true;
    // 10 * 0.6 = 6. Дурман: Math.log2(5) * 5 ≈ 11.6. Итог: 6 - 11.6 = -5.6
    expect(daemon.attack).toBe(0);
  });
});
