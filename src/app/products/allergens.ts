export enum Allergens {
    gluten = 'Gluten',
    crustaceans = 'Crustaceans',
    egg = 'Egg',
    milk = 'Milk',
    fish = 'Fish',
    mustard = 'Mustard',
    peanut = 'Peanut',
    soy = 'Soy',
    celery = 'Celery',
    nut = 'Nut',
    lupine = 'Lupine',
    molluscs = 'Molluscs',
    sesame = 'Sesame',
  }

 export const mapStringToEnum = (allergens: string[]): Allergens[] => {
    return allergens.map(allergen => {
      switch (allergen.toLowerCase()) {
        case 'gluten':
          return Allergens.gluten;
        case 'crustaceans':
          return Allergens.crustaceans;
        case 'egg':
          return Allergens.egg;
        case 'milk':
          return Allergens.milk;
        case 'fish':
          return Allergens.fish;
        case 'mustard':
          return Allergens.mustard;
        case 'peanut':
          return Allergens.peanut;
        case 'soybeans':
          return Allergens.soy;
        case 'celery':
          return Allergens.celery;
        case 'nuts':
          return Allergens.nut;
        case 'lupine':
          return Allergens.lupine;
        case 'molluscs':
          return Allergens.molluscs;
        case 'sesame-seeds':
          return Allergens.sesame;
        default:
          throw new Error(`Unknown allergen: ${allergen}`);
      }
    });
  }