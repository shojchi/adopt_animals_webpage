// 50
const dogNames = ["Max", "Bella", "Charlie", "Luna", "Cooper", "Daisy", "Rocky", "Milo", "Buddy", "Sadie", "Oliver",
  "Lucy", "Bear", "Lily", "Zoe", "Toby", "Chloe", "Leo", "Duke", "Sophie", "Bailey", "Riley", "Maggie", "Jack", "Finn",
  "Buster", "Ruby", "Samson", "Murphy", "Jasper", "Winston", "Penny", "Rosie", "Bentley", "Lola", "Zeus", "Gizmo",
  "Maggie", "Jax", "Harley", "Oscar", "Willow", "Coco", "Rex", "Henry", "Macy", "Hunter", "Nala", "Tucker", "Bella",];

// 50
const dogBreeds = ["Labrador Retriever", "German Shepherd", "Golden Retriever", "Bulldog", "Poodle", "Beagle",
  "Rottweiler", "German Shorthaired Pointer", "Yorkshire Terrier", "Dachshund", "Boxer", "Siberian Husky",
  "Pembroke Welsh Corgi", "Doberman Pinscher", "Great Dane", "Shih Tzu", "Australian Shepherd",
  "Cavalier King Charles Spaniel", "Shetland Sheepdog", "Miniature Schnauzer", "Chihuahua", "Pomeranian",
  "Border Collie", "Maltese", "Akita", "Basset Hound", "Saint Bernard", "Pug", "Havanese", "Chow Chow", "Newfoundland",
  "Cocker Spaniel", "Bernese Mountain Dog", "English Springer Spaniel", "Pekingese", "French Bulldog",
  "Alaskan Malamute", "Jack Russell Terrier", "Collie", "Whippet", "Irish Setter", "Bloodhound", "Bull Terrier",
  "Australian Cattle Dog", "Rottweiler", "Italian Greyhound", "Weimaraner", "Samoyed", "Rhodesian Ridgeback",
  "Airedale Terrier"];

// 50
const catNames = ["Oliver", "Luna", "Bella", "Leo", "Milo", "Simba", "Nala", "Chloe", "Lily", "Max", "Charlie", "Toby",
  "Sophie", "Coco", "Maggie", "Smokey", "Oscar", "Pepper", "Zoe", "Jasper", "Rocky", "Whiskers", "Ginger", "Kitty",
  "Buster", "Rusty", "Shadow", "Tigger", "Misty", "Pumpkin", "Salem", "Socks", "Boots", "Cleo", "Penny", "Mittens",
  "Izzy", "Tiger", "Lily", "Chester", "Lola", "Dusty", "Missy", "Pippin", "Munchkin", "Marmalade", "Biscuit", "Harley",
  "Honey", "Molly"];

// 50
const catBreeds = ["Maine Coon", "Persian", "Siamese", "Ragdoll", "Bengal", "British Shorthair", "Abyssinian", "Sphynx",
  "Burmese", "Scottish Fold", "Birman", "Oriental Shorthair", "Russian Blue", "American Shorthair", "Devon Rex",
  "Turkish Van", "Exotic Shorthair", "Norwegian Forest Cat", "Siberian", "Manx", "Savannah", "British Longhair",
  "Singapura", "Cornish Rex", "Tonkinese", "Himalayan", "Chartreux", "Munchkin", "Ocicat", "Turkish Angora", "LaPerm",
  "Burmilla", "Ragamuffin", "Snowshoe", "American Curl", "Japanese Bobtail", "Balinese", "Somali", "Selkirk Rex",
  "Peterbald", "Cymric", "Bombay", "Korat", "Egyptian Mau", "Singapura", "Bengal", "Tonkinese", "Russian Blue",
  "Turkish Angora", "Siberian"];

const randomizer = (max) => {
  return Math.floor(Math.random() * max);
}

const genders    = ['male', 'female'];
const species    = ['cat', 'dog'];
const sizes      = ['S', 'M', 'L'];
const dogsImages = ['https://www.hartz.com/wp-content/uploads/2022/04/small-dog-owners-1.jpg',
  'https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg',
  'https://ichef.bbci.co.uk/ace/standard/2048/cpsprodpb/339c/live/f334f090-6393-11ef-b43e-6916dcba5cbf.jpg',
  'https://wheldonlaw.co.uk/wp-content/uploads/2022/05/AdobeStock_109900100-scaled.jpeg',
  'https://pethelpful.com/.image/w_3840,q_auto:good,c_fill,ar_4:3/MjA4NDA2ODA0MjQ4NDA1NjQ4/top-10-largest-dog-breeds-2.png',
  'https://www.thesprucepets.com/thmb/yH_dVf9ehigKYxqsvP5IHKviUKQ=/724x0/filters:no_upscale():strip_icc()/GettyImages-1313232209-e412c4dc9411489f8197c9c0067c94ed.jpg'
];
const catsImages = ['https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg',
  'https://www.animalfriends.co.uk/siteassets/media/images/article-images/cat-articles/51_afi_article1_the-secret-language-of-cats.png',
  'https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg',
  'https://d1jyxxz9imt9yb.cloudfront.net/medialib/3339/image/s768x1300/DRRR202202_OperationWhiskers_035_344175_reduced.jpg',
  'https://www.operationkindness.org/wp-content/uploads/blog-june-adopt-shelter-cat-month-operation-kindness.jpg',
  'https://g.petango.com/photos/3223/44087a50-d84b-464a-a379-af97d37bc618.jpg'
];

const generatedData = [];


const generateData = (id, name, breed, species, images) => {
  return {
    id,
    name,
    breed,
    gender: genders[randomizer(2)],
    species,
    animalId: 'test',
    age: '1 year',
    size: sizes[randomizer(3)],
    intakeDate: '10/01/2020',
    onHold: id % 4 === 0,
    spayedOrNeutered: id % 2 === 0,
    mainPhotoUrl: images[randomizer(6)]
  }
}
//TODO: change mock data to randomly generate

const dataHydration = () => {
  for (let i = 0; i < 50; i++) {
    generatedData.push(generateData(i + 1, dogNames[i], dogBreeds[i], 'dog', dogsImages));
  }

  for (let i = 0; i < 50; i++) {
    generatedData.push(generateData(51 + i, catNames[i], catBreeds[i], 'cat', catsImages));
  }
}

dataHydration();

console.log(generatedData)
