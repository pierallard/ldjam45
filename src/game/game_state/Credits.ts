import State = Phaser.State;
import Game = Phaser.Game;

export class Credits extends State {
  private texts: string[];
  private phaserTexts: Phaser.BitmapText[];

  constructor() {
    super();
    this.texts = [];
    this.texts.push('Stranger Coins');
    this.texts.push('');
    this.texts.push('This game was created in honor of');
    this.texts.push('thousands of pieces brutally murdered');
    this.texts.push('each year and which nobody remembers.');
    this.texts.push('');
    this.texts.push('');
    this.texts.push('');
    this.texts.push('');
    this.texts.push('');
    this.texts.push('');
    this.texts.push('');
    this.texts.push('');
    this.texts.push('A game designed for the Ludum Dare 44, by');
    this.texts.push('docteurklein + grena + pchasle + pierallard');
    this.texts.push('');
    this.texts.push('Special thanks for Nao and Nono');
    this.texts.push('for the running afraid coins!');
    this.texts.push('');
    for (let i = 0; i < 1000; i++) {
      const name = Credits.NAMES[Math.floor(Math.random() * Credits.NAMES.length)];
      const age = Math.random() * 20;
      let realAge = Math.ceil(age) + ' y/o';
      const action = Credits.ACTIONS[Math.floor(Math.random() * Credits.ACTIONS.length)];
      const game = Credits.GAMES[Math.floor(Math.random() * Credits.GAMES.length)];
      this.texts.push('to ' + name + ', ' + realAge + ', ' + action + ' in ' + game)
    }
  }

  create(game: Game) {
    this.camera.unfollow();
    this.camera.setPosition(0, 0);
    const image = game.add.image(0, 0, 'logo');
    image.scale.set(1.3);
    image.alpha = 0.2;

    this.phaserTexts = [];
    this.texts.forEach((text, i) => {
      const t = game.add.bitmapText(0, i * 10 + this.game.height / 2 - 30, "Carrier Command", text, i === 0 ? 10 : 5);
      t.x = this.game.width / 2 - (t.width / 2);
      this.phaserTexts.push(t);
    });

    game.time.events.add(1.1 * Phaser.Timer.SECOND, () => {
      this.phaserTexts.forEach((phaserText) => {
        game.add.tween(phaserText).to({
          y: phaserText.y - this.texts.length * 10
        }, Phaser.Timer.SECOND * 1000, Phaser.Easing.Default, true);
      })
    });
  }

  static ACTIONS = [
    'murdered',
    'killed',
    'crushed',
    'pierced',
    'slaughtered',
    'strangulated',
  ];

  static GAMES = [
    'Mario',
    'Sonic',
    'Zelda',
    'Stranger Coins',
    'Hammerwatch',
    'Diablo',
    'Dead Cells',
  ];

  static NAMES = [
    "Skylar",
    "Tommy",
    "Conor",
    "Noe",
    "Ezequiel",
    "Demetrius",
    "Jaylin",
    "Kendrick",
    "Frederick",
    "Terrance",
    "Bobby",
    "Jamison",
    "Jon",
    "Rohan",
    "Jett",
    "Kieran",
    "Tobias",
    "Ari",
    "Colt",
    "Gideon",
    "Felipe",
    "Kenny",
    "Wilson",
    "Orion",
    "Kamari",
    "Gunnar",
    "Jessie",
    "Alonzo",
    "Gianni",
    "Omari",
    "Waylon",
    "Malcolm",
    "Emmett",
    "Abram",
    "Julien",
    "London",
    "Tomas",
    "Allan",
    "Terrell",
    "Matteo",
    "Tristin",
    "Jairo",
    "Reginald",
    "Brent",
    "Ahmad",
    "Yandel",
    "Rene",
    "Willie",
    "Boston",
    "Billy",
    "Marlon",
    "Trevon",
    "Aydan",
    "Jamal",
    "Aldo",
    "Ariel",
    "Cason",
    "Braylen",
    "Javion",
    "Joey",
    "Rogelio",
    "Ahmed",
    "Dominik",
    "Brendon",
    "Toby",
    "Kody",
    "Marquis",
    "Harley",
    "Steve",
    "Davin",
    "Deshawn",
    "Kason",
    "Damion",
    "Jaylon",
    "Jefferson",
    "Aron",
    "Brooks",
    "Darian",
    "Gerald",
    "Rolando",
    "Terrence",
    "Enzo",
    "Kian",
    "Ryland",
    "Barrett",
    "Jaeden",
    "Ben",
    "Bradyn",
    "Giovani",
    "Blaine",
    "Madden",
    "Jerome",
    "Muhammad",
    "Ronnie",
    "Layne",
    "Kolby",
    "Leonard",
    "Vicente",
    "Cale",
    "Alessandro",
    "Zachery",
    "Gavyn",
    "Aydin",
    "Xzavier",
    "Malakai",
    "Raphael",
    "Cannon",
    "Rudy",
    "Asa",
    "Darrell",
    "Giancarlo",
    "Elisha",
    "Junior",
    "Zackery",
    "Alvaro",
    "Lewis",
    "Valentin",
    "Deacon",
    "Jase",
    "Harry",
    "Kendall",
    "Rashad",
    "Finnegan",
    "Mohammed",
    "Ramiro",
    "Cedric",
    "Brennen",
    "Santino",
    "Stanley",
    "Tyrone",
    "Chace",
    "Francis",
    "Johnathon",
    "Teagan",
    "Zechariah",
    "Alonso",
    "Kaeden",
    "Kamden",
    "Gilberto",
    "Ray",
    "Karter",
    "Luciano",
    "Nico",
    "Kole",
    "Aryan",
    "Draven",
    "Jamie",
    "Misael",
    "Lee",
    "Alexzander",
    "Camren",
    "Giovanny",
    "Amare",
    "Rhett",
    "Rhys",
    "Rodolfo",
    "Nash",
    "Markus",
    "Deven",
    "Mohammad",
    "Moshe",
    "Quintin",
    "Dwayne",
    "Memphis",
    "Atticus",
    "Davian",
    "Eugene",
    "Jax",
    "Antoine",
    "Wayne",
    "Randall",
    "Semaj",
    "Uriah",
    "Clark",
    "Aidyn",
    "Jorden",
    "Maxim",
    "Aditya",
    "Lawson",
    "Messiah",
    "Korbin",
    "Sullivan",
    "Freddy",
    "Demarcus",
    "Neil",
    "Brice",
    "King",
    "Davon",
    "Elvis",
    "Ace",
    "Dexter",
    "Heath",
    "Duncan",
    "Jamar",
    "Sincere",
    "Irvin",
    "Remington",
    "Kadin",
    "Soren",
    "Tyree",
    "Damarion",
    "Talan",
    "Adrien",
    "Gilbert",
    "Keenan",
    "Darnell",
    "Adolfo",
    "Tristian",
    "Derick",
    "Isai",
    "Rylee",
    "Gauge",
    "Harold",
    "Kareem",
    "Deangelo",
    "Agustin",
    "Coleman",
    "Zavier",
    "Lamar",
    "Emery",
    "Jaydin",
    "Devan",
    "Jordyn",
    "Mathias",
    "Prince",
    "Sage",
    "Seamus",
    "Jasiah",
    "Efrain",
    "Darryl",
    "Arjun",
    "Mike",
    "Roland",
    "Conrad",
    "Kamron",
    "Hamza",
    "Santos",
    "Frankie",
    "Dominique",
    "Marley",
    "Vance",
    "Dax",
    "Jamir",
    "Kylan",
    "Todd",
    "Maximo",
    "Jabari",
    "Matthias",
    "Haiden",
    "Luka",
    "Marcelo",
    "Keon",
    "Layton",
    "Tyrell",
    "Kash",
    "Raiden",
    "Cullen",
    "Donte",
    "Jovani",
    "Cordell",
    "Kasen",
    "Rory",
    "Alfred",
    "Darwin",
    "Ernest",
    "Bailey",
    "Gaige",
    "Hassan",
    "Jamarcus",
    "Killian",
    "Augustus",
    "Trevin",
    "Zain",
    "Ellis",
    "Rex",
    "Yusuf",
    "Bruno",
    "Jaidyn",
    "Justus",
    "Ronin",
    "Humberto",
    "Jaquan",
    "Josh",
    "Kasey",
    "Winston",
    "Dashawn",
    "Lucian",
    "Matias",
    "Sidney",
    "Ignacio",
    "Nigel",
    "Van",
    "Elian",
    "Finley",
    "Jaron",
    "Addison",
    "Aedan",
    "Braedon",
    "Jadyn",
    "Konner",
    "Zayne",
    "Franco",
    "Niko",
    "Savion",
    "Cristofer",
    "Deon",
    "Krish",
    "Anton",
    "Brogan",
    "Cael",
    "Coby",
    "Kymani",
    "Marcel",
    "Yair",
    "Dale",
    "Bo",
    "Jordon",
    "Samir",
    "Darien",
    "Zaire",
    "Ross",
    "Vaughn",
    "Devyn",
    "Kenyon",
    "Clay",
    "Dario",
    "Ishaan",
    "Jair",
    "Kael",
    "Adonis",
    "Jovanny",
    "Clinton",
    "Rey",
    "Chaim",
    "German",
    "Harper",
    "Nathen",
    "Rigoberto",
    "Sonny",
    "Glenn",
    "Octavio",
    "Blaze",
    "Keshawn",
    "Ralph",
    "Ean",
    "Nikhil",
    "Rayan",
    "Sterling",
    "Branson",
    "Jadiel",
    "Dillan",
    "Jeramiah",
    "Koen",
    "Konnor",
    "Antwan",
    "Houston",
    "Tyrese",
    "Dereon",
    "Leonidas",
    "Zack",
    "Fisher",
    "Jaydan",
    "Quinten",
    "Nick",
    "Urijah",
    "Darion",
    "Jovan",
    "Salvatore",
    "Beckham",
    "Jarrett",
    "Antony",
    "Eden",
    "Makai",
    "Zaiden",
    "Broderick",
    "Camryn",
    "Malaki",
    "Nikolai",
    "Howard",
    "Immanuel",
    "Demarion",
    "Valentino",
    "Jovanni",
    "Ayaan",
    "Ethen",
    "Leandro",
    "Royce",
    "Yael",
    "Yosef",
    "Jean",
    "Marquise",
    "Alden",
    "Leroy",
    "Gaven",
    "Jovany",
    "Tyshawn",
    "Aarav",
    "Kadyn",
    "Milton",
    "Zaid",
    "Kelton",
    "Tripp",
    "Kamren",
    "Slade",
    "Hezekiah",
    "Jakobe",
    "Nathanial",
    "Rishi",
    "Shamar",
    "Reynaldo",
    "Cassius",
    "Gordon",
    "Reuben",
    "Samson",
    "Yadiel",
    "Jayvon",
    "Reilly",
    "Sheldon",
    "Abdullah",
    "Jagger",
    "Thaddeus",
    "Case",
    "Kyson",
    "Lamont",
    "Chaz",
    "Makhi",
    "Jan",
    "Marques",
    "Oswaldo",
    "Donavan",
    "Keyon",
    "Kyan",
    "Simeon",
    "Trystan",
    "Andreas",
    "Dangelo",
    "Landin",
    "Reagan",
    "Turner",
    "Arnav",
    "Brenton",
    "Callum",
    "Jayvion",
    "Bridger",
    "Sammy",
    "Deegan",
    "Jaylan",
    "Lennon",
    "Odin",
    "Abdiel",
    "Jerimiah",
    "Eliezer",
    "Bronson",
    "Cornelius",
    "Pierre",
    "Cortez",
    "Damari",
    "Hugh",
    "Jensen",
    "Yurem",
    "Mary",
    "Anna",
    "Emma",
    "Elizabeth",
    "Minnie",
    "Margaret",
    "Ida",
    "Alice",
    "Bertha",
    "Sarah",
    "Annie",
    "Clara",
    "Ella",
    "Florence",
    "Cora",
    "Martha",
    "Laura",
    "Nellie",
    "Grace",
    "Carrie",
    "Maude",
    "Mabel",
    "Bessie",
    "Jennie",
    "Gertrude",
    "Julia",
    "Hattie",
    "Edith",
    "Mattie",
    "Rose",
    "Catherine",
    "Lillian",
    "Ada",
    "Lillie",
    "Helen",
    "Jessie",
    "Louise",
    "Ethel",
    "Lula",
    "Myrtle",
    "Eva",
    "Frances",
    "Lena",
    "Lucy",
    "Edna",
    "Maggie",
    "Pearl",
    "Daisy",
    "Fannie",
    "Josephine",
    "Dora",
    "Rosa",
    "Katherine",
    "Agnes",
    "Marie",
    "Nora",
    "May",
    "Mamie",
    "Blanche",
    "Stella",
    "Ellen",
    "Nancy",
    "Effie",
    "Sallie",
    "Nettie",
    "Della",
    "Lizzie",
    "Flora",
    "Susie",
    "Maud",
    "Mae",
    "Etta",
    "Harriet",
    "Sadie",
    "Caroline",
    "Katie",
    "Lydia",
    "Elsie",
    "Kate",
    "Susan",
    "Mollie",
    "Alma",
    "Addie",
    "Georgia",
    "Eliza",
    "Lulu",
    "Nannie",
    "Lottie",
    "Amanda",
    "Belle",
    "Charlotte",
    "Rebecca",
    "Ruth",
    "Viola",
    "Olive",
    "Amelia",
    "Hannah",
    "Jane",
    "Virginia",
    "Emily",
    "Matilda",
    "Irene",
    "Kathryn",
    "Esther",
    "Willie",
    "Henrietta",
    "Ollie",
    "Amy",
    "Rachel",
    "Sara",
    "Estella",
    "Theresa",
    "Augusta",
    "Ora",
    "Pauline",
    "Josie",
    "Lola",
    "Sophia",
    "Leona",
    "Anne",
    "Mildred",
    "Ann",
    "Beulah",
    "Callie",
    "Lou",
    "Delia",
    "Eleanor",
    "Barbara",
    "Iva",
    "Louisa"
  ]
}
