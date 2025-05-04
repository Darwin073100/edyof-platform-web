export class EstablishmentName {
    private readonly value: string;
  
    constructor(name: string) {
      if (name.length === 0) {
        throw new Error('Establishment name cannot be empty.');
      }
      this.value = name;
    }
  
    getValue(): string {
      return this.value;
    }
  }