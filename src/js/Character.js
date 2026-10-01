/**
 * Базовый класс для персонажей с логикой расчёта атаки и дурмана.
 */
export default class Character {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this._attack = 0;
    this._stoned = false;
    this.distance = 1; // Дистанция по умолчанию
  }

  get stoned() {
    return this._stoned;
  }

  set stoned(value) {
    this._stoned = Boolean(value);
  }

  get attack() {
    // 1. Линейное падение атаки: 1 клетка — 100%, 2 клетки — 90%, 5 клеток — 60%
    // Формула модификатора: 1 - (distance - 1) * 0.1, что эквивалентно 1.1 - distance * 0.1
    let modifiedAttack = this._attack * (1.1 - this.distance * 0.1);

    // 2. Эффект дурмана (stoned)
    if (this._stoned) {
      modifiedAttack -= Math.log2(this.distance) * 5;
    }

    // Сила атаки не может стать отрицательной
    return modifiedAttack > 0 ? Math.round(modifiedAttack) : 0;
  }

  set attack(value) {
    this._attack = value;
  }
}
