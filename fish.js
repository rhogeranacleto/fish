export class Fish {
  constructor(props) {
    Object.entries(props).forEach(([key, value]) => {
      this[key] = value;
    });
    this.createdAt = Date.now();
    this.lastMatchedAt = Date.now();
  }
}