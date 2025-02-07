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

function randomizer(max) {
  return Math.floor(Math.random() * max);
}

const genders     = ['male', 'female'];
const animalTypes = ['cat', 'dog'];

const generatedData = [];

function generateData(name, breed, animalType) {
  return {
    name: name, breed: breed, gender: genders[randomizer(2)], animalType: animalType]
  }
}

function dataHydration() {
  for (let i = 0; i < 50; i++) {
    generatedData.push(generateData(dogNames[i], dogBreeds[i], 'dog'));
  }

  for (let i = 0; i < 50; i++) {
    generatedData.push(generateData(catNames[i], catBreeds[i], 'cat'));
  }
}

dataHydration();

export default generatedData;
