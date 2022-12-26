import crypto from 'crypto'

export class Fish {
  constructor(props) {
    this.id = crypto.randomUUID();

    Object.entries(props).forEach(([key, value]) => {
      this[key] = value;
    });

    this.createdAt = Date.now();
    this.lastMatchedAt = Date.now();
  }
}