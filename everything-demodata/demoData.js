import fs from 'fs';

const userDemoData = [{
    "_id": {
      "$oid": "66be81f0a1530646e953b2b7"
    },
    "fullname": "Peter Brown",
    "gender": "male",
    "profileImg": "https://randomuser.me/api/portraits/men/5.jpg",
    "username": "peter_brown_thegreat",
    "following": [
      "66be81f0a1530646e953b2c8",
      "66be81f0a1530646e953b2ba",
      "66be81f0a1530646e953b2bf",
      "66be81f0a1530646e953b2c4",
      "66be81f0a1530646e953b2c5"
    ],
    "followers": [
      "66be81f0a1530646e953b2d2",
      "66be81f0a1530646e953b2cd",
      "66be81f0a1530646e953b2d3",
      "66be81f0a1530646e953b2c5",
      "66be81f0a1530646e953b2cf",
      "66be81f0a1530646e953b2cc",
      "66be81f0a1530646e953b2ce"
    ]
  },
  {
    "_id": {
      "$oid": "66be81f0a1530646e953b2b8"
    },
    "fullname": "Laura Smith",
    "gender": "female",
    "profileImg": "https://randomuser.me/api/portraits/women/6.jpg",
    "username": "laura_smith91",
    "following": [
      "66be81f0a1530646e953b2cb",
      "66be81f0a1530646e953b2c0",
      "66be81f0a1530646e953b2c3",
      "66be81f0a1530646e953b2bf",
      "66be81f0a1530646e953b2c2",
      "66be81f0a1530646e953b2c4"
    ],
    "followers": [
      "66be81f0a1530646e953b2c2",
      "66be81f0a1530646e953b2cf",
      "66be81f0a1530646e953b2c4",
      "66be81f0a1530646e953b2c1",
      "66be81f0a1530646e953b2c7",
      "66be81f0a1530646e953b2bf"
    ]
  },
  {
    "_id": {
      "$oid": "66be81f0a1530646e953b2b9"
    },
    "fullname": "John Doe",
    "gender": "male",
    "profileImg": "https://randomuser.me/api/portraits/men/7.jpg",
    "username": "johnny_doe",
    "following": [
      "66be81f0a1530646e953b2cf",
      "66be81f0a1530646e953b2c9",
      "66be81f0a1530646e953b2c2",
      "66be81f0a1530646e953b2d1",
      "66be81f0a1530646e953b2cd",
      "66be81f0a1530646e953b2c6",
      "66be81f0a1530646e953b2d0",
      "66be81f0a1530646e953b2b8"
    ],
    "followers": [
      "66be81f0a1530646e953b2c6",
      "66be81f0a1530646e953b2c1",
      "66be81f0a1530646e953b2bf",
      "66be81f0a1530646e953b2c0",
      "66be81f0a1530646e953b2be"
    ]
  },
  {
    "_id": {
      "$oid": "66be81f0a1530646e953b2ba"
    },
    "fullname": "Emily Johnson",
    "gender": "female",
    "profileImg": "https://randomuser.me/api/portraits/women/7.jpg",
    "username": "emily_j",
    "following": [
      "66be81f0a1530646e953b2d0",
      "66be81f0a1530646e953b2bd",
      "66be81f0a1530646e953b2c9",
      "66be81f0a1530646e953b2c2",
      "66be81f0a1530646e953b2bb",
      "66be81f0a1530646e953b2d2",
      "66be81f0a1530646e953b2c1"
    ],
    "followers": [
      "66be81f0a1530646e953b2c0",
      "66be81f0a1530646e953b2bd",
      "66be81f0a1530646e953b2bb",
      "66be81f0a1530646e953b2ca"
    ]
  },
  {
    "_id": {
      "$oid": "66be81f0a1530646e953b2bb"
    },
    "fullname": "Michael Davis",
    "gender": "male",
    "profileImg": "https://randomuser.me/api/portraits/men/8.jpg",
    "username": "mike_davis",
    "following": [
      "66be81f0a1530646e953b2b7",
      "66be81f0a1530646e953b2c2",
      "66be81f0a1530646e953b2d0",
      "66be81f0a1530646e953b2c9"
    ],
    "followers": [
      "66be81f0a1530646e953b2b8",
      "66be81f0a1530646e953b2d4",
      "66be81f0a1530646e953b2cb",
      "66be81f0a1530646e953b2c9",
      "66be81f0a1530646e953b2d0",
      "66be81f0a1530646e953b2b7"
    ]
  },
  {
    "_id": {
      "$oid": "66be81f0a1530646e953b2bc"
    },
    "fullname": "Jessica Williams",
    "gender": "female",
    "profileImg": "https://randomuser.me/api/portraits/women/8.jpg",
    "username": "jessica_w",
    "following": [
      "66be81f0a1530646e953b2ca",
      "66be81f0a1530646e953b2b8",
      "66be81f0a1530646e953b2bd"
    ],
    "followers": [
      "66be81f0a1530646e953b2b7",
      "66be81f0a1530646e953b2d0",
      "66be81f0a1530646e953b2ce",
      "66be81f0a1530646e953b2c4",
      "66be81f0a1530646e953b2d1",
      "66be81f0a1530646e953b2bb",
      "66be81f0a1530646e953b2b8",
      "66be81f0a1530646e953b2c6"
    ]
  },
  {
    "_id": {
      "$oid": "66be81f0a1530646e953b2bd"
    },
    "fullname": "Daniel Brown",
    "gender": "male",
    "profileImg": "https://randomuser.me/api/portraits/men/9.jpg",
    "username": "dan_brown",
    "following": [
      "66be81f0a1530646e953b2cf",
      "66be81f0a1530646e953b2c2",
      "66be81f0a1530646e953b2d2",
      "66be81f0a1530646e953b2b8"
    ],
    "followers": [
      "66be81f0a1530646e953b2bc",
      "66be81f0a1530646e953b2b9",
      "66be81f0a1530646e953b2c6",
      "66be81f0a1530646e953b2c5"
    ]
  },
  {
    "_id": {
      "$oid": "66be81f0a1530646e953b2be"
    },
    "fullname": "Sarah Miller",
    "gender": "female",
    "profileImg": "https://randomuser.me/api/portraits/women/9.jpg",
    "username": "sarah_m",
    "following": [
      "66be81f0a1530646e953b2d2",
      "66be81f0a1530646e953b2cc",
      "66be81f0a1530646e953b2b8",
      "66be81f0a1530646e953b2c0",
      "66be81f0a1530646e953b2bb",
      "66be81f0a1530646e953b2c4",
      "66be81f0a1530646e953b2c6",
      "66be81f0a1530646e953b2d4"
    ],
    "followers": [
      "66be81f0a1530646e953b2c8",
      "66be81f0a1530646e953b2c6",
      "66be81f0a1530646e953b2d1",
      "66be81f0a1530646e953b2cc",
      "66be81f0a1530646e953b2d4",
      "66be81f0a1530646e953b2d3",
      "66be81f0a1530646e953b2b7",
      "66be81f0a1530646e953b2bc",
      "66be81f0a1530646e953b2c5",
      "66be81f0a1530646e953b2c3"
    ]
  },
  {
    "_id": {
      "$oid": "66be81f0a1530646e953b2bf"
    },
    "fullname": "David Wilson",
    "gender": "male",
    "profileImg": "https://randomuser.me/api/portraits/men/10.jpg",
    "username": "david_w",
    "following": [
      "66be81f0a1530646e953b2d1",
      "66be81f0a1530646e953b2c1",
      "66be81f0a1530646e953b2c3"
    ],
    "followers": [
      "66be81f0a1530646e953b2c4",
      "66be81f0a1530646e953b2c6",
      "66be81f0a1530646e953b2bc",
      "66be81f0a1530646e953b2c9",
      "66be81f0a1530646e953b2c2",
      "66be81f0a1530646e953b2cb"
    ]
  },
  {
    "_id": {
      "$oid": "66be81f0a1530646e953b2c0"
    },
    "fullname": "Olivia Moore",
    "gender": "female",
    "profileImg": "https://randomuser.me/api/portraits/women/10.jpg",
    "username": "liv_moore",
    "following": [
      "66be81f0a1530646e953b2ba",
      "66be81f0a1530646e953b2cb",
      "66be81f0a1530646e953b2d2",
      "66be81f0a1530646e953b2c5",
      "66be81f0a1530646e953b2ce"
    ],
    "followers": [
      "66be81f0a1530646e953b2b7",
      "66be81f0a1530646e953b2c7",
      "66be81f0a1530646e953b2d1",
      "66be81f0a1530646e953b2b9"
    ]
  },
  {
    "_id": {
      "$oid": "66be81f0a1530646e953b2c1"
    },
    "fullname": "James Taylor",
    "gender": "male",
    "profileImg": "https://randomuser.me/api/portraits/men/11.jpg",
    "username": "j_taylor",
    "following": [
      "66be81f0a1530646e953b2b7",
      "66be81f0a1530646e953b2d3",
      "66be81f0a1530646e953b2ca",
      "66be81f0a1530646e953b2bc",
      "66be81f0a1530646e953b2ba",
      "66be81f0a1530646e953b2d4",
      "66be81f0a1530646e953b2b9"
    ],
    "followers": [
      "66be81f0a1530646e953b2bd",
      "66be81f0a1530646e953b2c2",
      "66be81f0a1530646e953b2bc"
    ]
  },
  {
    "_id": {
      "$oid": "66be81f0a1530646e953b2c2"
    },
    "fullname": "Sophia Anderson",
    "gender": "female",
    "profileImg": "https://randomuser.me/api/portraits/women/11.jpg",
    "username": "sophie_anderson",
    "following": [
      "66be81f0a1530646e953b2bc",
      "66be81f0a1530646e953b2d4",
      "66be81f0a1530646e953b2c3",
      "66be81f0a1530646e953b2c4",
      "66be81f0a1530646e953b2c7",
      "66be81f0a1530646e953b2c9",
      "66be81f0a1530646e953b2bd",
      "66be81f0a1530646e953b2bb",
      "66be81f0a1530646e953b2bf",
      "66be81f0a1530646e953b2c8"
    ],
    "followers": [
      "66be81f0a1530646e953b2c6",
      "66be81f0a1530646e953b2bc",
      "66be81f0a1530646e953b2bd",
      "66be81f0a1530646e953b2b7",
      "66be81f0a1530646e953b2b9"
    ]
  },
  {
    "_id": {
      "$oid": "66be81f0a1530646e953b2c3"
    },
    "fullname": "William Thomas",
    "gender": "male",
    "profileImg": "https://randomuser.me/api/portraits/men/12.jpg",
    "username": "will_thomas",
    "following": [
      "66be81f0a1530646e953b2cf",
      "66be81f0a1530646e953b2d1",
      "66be81f0a1530646e953b2c4",
      "66be81f0a1530646e953b2d4"
    ],
    "followers": [
      "66be81f0a1530646e953b2b9",
      "66be81f0a1530646e953b2d0",
      "66be81f0a1530646e953b2bf",
      "66be81f0a1530646e953b2c1",
      "66be81f0a1530646e953b2d3",
      "66be81f0a1530646e953b2be"
    ]
  },
  {
    "_id": {
      "$oid": "66be81f0a1530646e953b2c4"
    },
    "fullname": "Ava Jackson",
    "gender": "female",
    "profileImg": "https://randomuser.me/api/portraits/women/12.jpg",
    "username": "ava_j",
    "following": [
      "66be81f0a1530646e953b2b9",
      "66be81f0a1530646e953b2be",
      "66be81f0a1530646e953b2c0",
      "66be81f0a1530646e953b2d4",
      "66be81f0a1530646e953b2c8",
      "66be81f0a1530646e953b2ba",
      "66be81f0a1530646e953b2ce",
      "66be81f0a1530646e953b2b8"
    ],
    "followers": [
      "66be81f0a1530646e953b2c2",
      "66be81f0a1530646e953b2cc",
      "66be81f0a1530646e953b2d4",
      "66be81f0a1530646e953b2bb",
      "66be81f0a1530646e953b2b9",
      "66be81f0a1530646e953b2d2"
    ]
  },
  {
    "_id": {
      "$oid": "66be81f0a1530646e953b2c5"
    },
    "fullname": "Lucas Harris",
    "gender": "male",
    "profileImg": "https://randomuser.me/api/portraits/men/13.jpg",
    "username": "lucas_the_legend",
    "following": [
      "66be81f0a1530646e953b2c1",
      "66be81f0a1530646e953b2d0",
      "66be81f0a1530646e953b2c0",
      "66be81f0a1530646e953b2bf"
    ],
    "followers": [
      "66be81f0a1530646e953b2d3",
      "66be81f0a1530646e953b2c6",
      "66be81f0a1530646e953b2bb",
      "66be81f0a1530646e953b2bf"
    ]
  },
  {
    "_id": {
      "$oid": "66be81f0a1530646e953b2c6"
    },
    "fullname": "Mia Martin",
    "gender": "female",
    "profileImg": "https://randomuser.me/api/portraits/women/13.jpg",
    "username": "mia_martin_21",
    "following": [
      "66be81f0a1530646e953b2cd",
      "66be81f0a1530646e953b2c3",
      "66be81f0a1530646e953b2d0",
      "66be81f0a1530646e953b2b8",
      "66be81f0a1530646e953b2b9",
      "66be81f0a1530646e953b2ba",
      "66be81f0a1530646e953b2c4",
      "66be81f0a1530646e953b2c8"
    ],
    "followers": [
      "66be81f0a1530646e953b2b7",
      "66be81f0a1530646e953b2bf",
      "66be81f0a1530646e953b2c7"
    ]
  },
  {
    "_id": {
      "$oid": "66be81f0a1530646e953b2c7"
    },
    "fullname": "Ethan Thompson",
    "gender": "male",
    "profileImg": "https://randomuser.me/api/portraits/men/14.jpg",
    "username": "ethan_t",
    "following": [
      "66be81f0a1530646e953b2c8",
      "66be81f0a1530646e953b2be",
      "66be81f0a1530646e953b2bd",
      "66be81f0a1530646e953b2ce",
      "66be81f0a1530646e953b2c4",
      "66be81f0a1530646e953b2c5",
      "66be81f0a1530646e953b2d4",
      "66be81f0a1530646e953b2cc",
      "66be81f0a1530646e953b2bf",
      "66be81f0a1530646e953b2bc"
    ],
    "followers": [
      "66be81f0a1530646e953b2d2",
      "66be81f0a1530646e953b2c2",
      "66be81f0a1530646e953b2b8",
      "66be81f0a1530646e953b2c1"
    ]
  },
  {
    "_id": {
      "$oid": "66be81f0a1530646e953b2c8"
    },
    "fullname": "Isabella White",
    "gender": "female",
    "profileImg": "https://randomuser.me/api/portraits/women/14.jpg",
    "username": "isabella_white",
    "following": [
      "66be81f0a1530646e953b2d2",
      "66be81f0a1530646e953b2b8",
      "66be81f0a1530646e953b2cf",
      "66be81f0a1530646e953b2c9",
      "66be81f0a1530646e953b2d1"
    ],
    "followers": [
      "66be81f0a1530646e953b2d3",
      "66be81f0a1530646e953b2bc",
      "66be81f0a1530646e953b2be",
      "66be81f0a1530646e953b2c1",
      "66be81f0a1530646e953b2bf"
    ]
  },
  {
    "_id": {
      "$oid": "66be81f0a1530646e953b2c9"
    },
    "fullname": "Alexander Scott",
    "gender": "male",
    "profileImg": "https://randomuser.me/api/portraits/men/15.jpg",
    "username": "alex_scott",
    "following": [
      "66be81f0a1530646e953b2ca",
      "66be81f0a1530646e953b2bb",
      "66be81f0a1530646e953b2c4",
      "66be81f0a1530646e953b2ce",
      "66be81f0a1530646e953b2d3"
    ],
    "followers": [
      "66be81f0a1530646e953b2c3",
      "66be81f0a1530646e953b2c1",
      "66be81f0a1530646e953b2b9",
      "66be81f0a1530646e953b2d1",
      "66be81f0a1530646e953b2c0",
      "66be81f0a1530646e953b2c6"
    ]
  },
  {
    "_id": {
      "$oid": "66be81f0a1530646e953b2ca"
    },
    "fullname": "Charlotte King",
    "gender": "female",
    "profileImg": "https://randomuser.me/api/portraits/women/15.jpg",
    "username": "charlotte_king",
    "following": [
      "66be81f0a1530646e953b2cf",
      "66be81f0a1530646e953b2bd",
      "66be81f0a1530646e953b2d1",
      "66be81f0a1530646e953b2be",
      "66be81f0a1530646e953b2d3"
    ],
    "followers": [
      "66be81f0a1530646e953b2d4",
      "66be81f0a1530646e953b2bc",
      "66be81f0a1530646e953b2c1",
      "66be81f0a1530646e953b2bf",
      "66be81f0a1530646e953b2b8",
      "66be81f0a1530646e953b2c8"
    ]
  },
  {
    "_id": {
      "$oid": "66be81f0a1530646e953b2cb"
    },
    "fullname": "Benjamin Lee",
    "gender": "male",
    "profileImg": "https://randomuser.me/api/portraits/men/16.jpg",
    "username": "ben_lee",
    "following": [
      "66be81f0a1530646e953b2c1",
      "66be81f0a1530646e953b2c3",
      "66be81f0a1530646e953b2b9",
      "66be81f0a1530646e953b2d1"
    ],
    "followers": [
      "66be81f0a1530646e953b2bc",
      "66be81f0a1530646e953b2cd",
      "66be81f0a1530646e953b2bb",
      "66be81f0a1530646e953b2cc",
      "66be81f0a1530646e953b2c9"
    ]
  },
  {
    "_id": {
      "$oid": "66be81f0a1530646e953b2cc"
    },
    "fullname": "Amelia Green",
    "gender": "female",
    "profileImg": "https://randomuser.me/api/portraits/women/16.jpg",
    "username": "amelia_green",
    "following": [
      "66be81f0a1530646e953b2d0",
      "66be81f0a1530646e953b2bf",
      "66be81f0a1530646e953b2bc",
      "66be81f0a1530646e953b2c8",
      "66be81f0a1530646e953b2d1",
      "66be81f0a1530646e953b2cd",
      "66be81f0a1530646e953b2bb",
      "66be81f0a1530646e953b2c9"
    ],
    "followers": [
      "66be81f0a1530646e953b2bf",
      "66be81f0a1530646e953b2ce",
      "66be81f0a1530646e953b2ca",
      "66be81f0a1530646e953b2b9"
    ]
  },
  {
    "_id": {
      "$oid": "66be81f0a1530646e953b2cd"
    },
    "fullname": "Oliver Adams",
    "gender": "male",
    "profileImg": "https://randomuser.me/api/portraits/men/17.jpg",
    "username": "oliver_a",
    "following": [
      "66be81f0a1530646e953b2b9",
      "66be81f0a1530646e953b2b7",
      "66be81f0a1530646e953b2bf",
      "66be81f0a1530646e953b2cc",
      "66be81f0a1530646e953b2ba"
    ],
    "followers": [
      "66be81f0a1530646e953b2d1",
      "66be81f0a1530646e953b2cf",
      "66be81f0a1530646e953b2b8",
      "66be81f0a1530646e953b2c0"
    ]
  },
  {
    "_id": {
      "$oid": "66be81f0a1530646e953b2ce"
    },
    "fullname": "Harper Nelson",
    "gender": "female",
    "profileImg": "https://randomuser.me/api/portraits/women/17.jpg",
    "username": "harper_nelson",
    "following": [
      "66be81f0a1530646e953b2b9",
      "66be81f0a1530646e953b2c8",
      "66be81f0a1530646e953b2d2",
      "66be81f0a1530646e953b2c0",
      "66be81f0a1530646e953b2bf",
      "66be81f0a1530646e953b2d1",
      "66be81f0a1530646e953b2b7",
      "66be81f0a1530646e953b2cd",
      "66be81f0a1530646e953b2c1",
      "66be81f0a1530646e953b2cb"
    ],
    "followers": [
      "66be81f0a1530646e953b2c9",
      "66be81f0a1530646e953b2c0",
      "66be81f0a1530646e953b2d1",
      "66be81f0a1530646e953b2c8",
      "66be81f0a1530646e953b2c1"
    ]
  },
  {
    "_id": {
      "$oid": "66be81f0a1530646e953b2cf"
    },
    "fullname": "Liam Carter",
    "gender": "male",
    "profileImg": "https://randomuser.me/api/portraits/men/18.jpg",
    "username": "liam_carter",
    "following": [
      "66be81f0a1530646e953b2c3",
      "66be81f0a1530646e953b2bb",
      "66be81f0a1530646e953b2ca",
      "66be81f0a1530646e953b2cc",
      "66be81f0a1530646e953b2d0"
    ],
    "followers": [
      "66be81f0a1530646e953b2b7",
      "66be81f0a1530646e953b2c9",
      "66be81f0a1530646e953b2ce",
      "66be81f0a1530646e953b2ba",
      "66be81f0a1530646e953b2d4",
      "66be81f0a1530646e953b2b9",
      "66be81f0a1530646e953b2ca",
      "66be81f0a1530646e953b2bf"
    ]
  },
  {
    "_id": {
      "$oid": "66be81f0a1530646e953b2d0"
    },
    "fullname": "Evelyn Roberts",
    "gender": "female",
    "profileImg": "https://randomuser.me/api/portraits/women/18.jpg",
    "username": "evelyn_r",
    "following": [
      "66be81f0a1530646e953b2d4",
      "66be81f0a1530646e953b2c4",
      "66be81f0a1530646e953b2bb",
      "66be81f0a1530646e953b2bc",
      "66be81f0a1530646e953b2cd",
      "66be81f0a1530646e953b2c6"
    ],
    "followers": [
      "66be81f0a1530646e953b2ba",
      "66be81f0a1530646e953b2bb",
      "66be81f0a1530646e953b2c6",
      "66be81f0a1530646e953b2cf",
      "66be81f0a1530646e953b2b8",
      "66be81f0a1530646e953b2c3",
      "66be81f0a1530646e953b2c2",
      "66be81f0a1530646e953b2c1"
    ]
  },
  {
    "_id": {
      "$oid": "66be81f0a1530646e953b2d1"
    },
    "fullname": "Jackson Clark",
    "gender": "male",
    "profileImg": "https://randomuser.me/api/portraits/men/19.jpg",
    "username": "jackson_clark",
    "following": [
      "66be81f0a1530646e953b2cb",
      "66be81f0a1530646e953b2bc",
      "66be81f0a1530646e953b2d4",
      "66be81f0a1530646e953b2c9"
    ],
    "followers": [
      "66be81f0a1530646e953b2d3",
      "66be81f0a1530646e953b2c0",
      "66be81f0a1530646e953b2c1",
      "66be81f0a1530646e953b2c6",
      "66be81f0a1530646e953b2d2"
    ]
  },
  {
    "_id": {
      "$oid": "66be81f0a1530646e953b2d2"
    },
    "fullname": "Mia Rodriguez",
    "gender": "female",
    "profileImg": "https://randomuser.me/api/portraits/women/19.jpg",
    "username": "mia_r",
    "following": [
      "66be81f0a1530646e953b2cd",
      "66be81f0a1530646e953b2c6",
      "66be81f0a1530646e953b2c8"
    ],
    "followers": [
      "66be81f0a1530646e953b2b8",
      "66be81f0a1530646e953b2cf",
      "66be81f0a1530646e953b2bd",
      "66be81f0a1530646e953b2c4",
      "66be81f0a1530646e953b2c7",
      "66be81f0a1530646e953b2d4",
      "66be81f0a1530646e953b2ca",
      "66be81f0a1530646e953b2d1",
      "66be81f0a1530646e953b2c6"
    ]
  },
  {
    "_id": {
      "$oid": "66be81f0a1530646e953b2d3"
    },
    "fullname": "Elijah Lewis",
    "gender": "male",
    "profileImg": "https://randomuser.me/api/portraits/men/20.jpg",
    "username": "elijah_lewis",
    "following": [
      "66be81f0a1530646e953b2b9",
      "66be81f0a1530646e953b2c4",
      "66be81f0a1530646e953b2c0"
    ],
    "followers": [
      "66be81f0a1530646e953b2c1",
      "66be81f0a1530646e953b2c9",
      "66be81f0a1530646e953b2ba",
      "66be81f0a1530646e953b2d4",
      "66be81f0a1530646e953b2cb"
    ]
  },
  {
    "_id": {
      "$oid": "66be81f0a1530646e953b2d4"
    },
    "fullname": "Zoe Scott",
    "gender": "female",
    "profileImg": "https://randomuser.me/api/portraits/women/20.jpg",
    "username": "zoe_scott",
    "following": [
      "66be81f0a1530646e953b2cd",
      "66be81f0a1530646e953b2be",
      "66be81f0a1530646e953b2bc",
      "66be81f0a1530646e953b2ba"
    ],
    "followers": [
      "66be81f0a1530646e953b2d1",
      "66be81f0a1530646e953b2ba",
      "66be81f0a1530646e953b2cb",
      "66be81f0a1530646e953b2c6",
      "66be81f0a1530646e953b2d2",
      "66be81f0a1530646e953b2c7",
      "66be81f0a1530646e953b2c3"
    ]
  }]


// Array of possible comment texts
const commentTexts = [
    "Amazing experience! 😍",
    "Enjoying the vacay vibes 🌴",
    "Good one! 👍",
    "Not feeling this... ",
    "Epic adventure 🏞️",
    "Gotta visit this place! ",
    "So chill and relaxing 😌",
    "Hiked it up ⛰️",
    "Breathtaking view! 🌅",
    "Nature at its best! 🌲",
    "Stunning photos! 📸",
    "This place is everything! ",
    "Love this spot ❤️",
    "Such a great day out! 🌞",
    "Perfect escape from reality ",
    "Definitely on my bucket list! ✔️",
    "So much fun! 🎉",
    "Absolutely amazing! ",
    "Unforgettable moments! 🌟",
    "This place is pure magic ✨",
    "Feels like paradise 🌺",
    "Beautiful landscape! 🌄",
    "Incredible experience! ",
    "Can’t wait to go back! ",
    "Fantastic adventure! ",
    "Wish I was there now! ",
    "Incredible view! 🏖️",
    "Such a great spot!",
    "Perfectly captured!",
    "Gorgeous place!",
    "So much beauty here!",
    "Incredible trip!",
    "This is paradise!",
    "Stunning views!",
    "What a sight!",
    "Magical place",
    "So serene, love it!",
    "Loving these pics!",
    "Such an amazing spot!",
    "Truly breathtaking!",
    "Great adventure!",
    "Wish I could be there!",
    "Fantastic photos!",
    "Simply stunning!",
    "Wow, this is incredible!"
];

const postTitles = [
    "Epic View",
    "Weekend Vibes",
    "Nature Call",
    "Urban Escape",
    "Sunset Bliss",
    "Adventure Awaits",
    "Chill Spot",
    "Skyline Dreams",
    "Urban Jungle",
    "Mountain High",
    "Beach Day",
    "City Lights",
    "Hidden Gem",
    "Dreamy Nights",
    "Street Style",
    "Cool Breeze",
    "Top Views",
    "Nature Hit",
    "Wanderlust",
    "Cozy Corner",
    "Vibe Check",
    "Nature Hit",
    "Travel Goals",
    "Sunrise Magic",
    "Golden Hour",
    "Chill Out",
    "Cityscape",
    "Peaceful Moment",
    "In the Wild",
    "Simply Stunning",
    "Fresh Air",
    "Epic Sunset",
    "Good Vibes",
    "In the Moment",
    "Serene Views",
    "Vacation Mode",
    "Unwind",
    "Dreamy Shots",
    "Vivid Colors",
    "Sunny Side",
    "Cozy Nook",
    "Wander",
    "Mountain Views",
    "Coastal Bliss",
    "Quiet Escape",
    "City Scenes",
    "Photo Op",
    "Dreamscape",
    "Nature’s Beauty",
    "Daily Dose",
    "Sky High",
    "Peaceful Views",
    "Modern Escape",
    "Nature’s Palette",
    "Urban Beauty",
    "Adventure Time",
    "Chilled Out",
    "Sky Views",
    "Nature Getaway",
    "On the Go",
    "Serenity",
    "Urban Oasis",
    "Vibrant Colors",
    "Stellar Views",
    "Wander On",
    "Outdoor Fun",
    "Captivating Views",
    "City Chill",
    "Breath of Fresh Air",
    "Explore More",
    "Magic Moment",
    "Urban Adventure",
    "Sunlit",
    "Sunset Dreams",
    "Day Out",
    "Vibrant Vibes",
    "Morning Glow",
    "Cool Escape",
    "Hidden Retreat",
    "Simply Beautiful",
    "Urban Dream",
    "Scenic Escape",
    "City Glow",
    "Nature’s Call",
    "Serene Escape",
    "Quick Getaway",
    "Gorgeous Views",
    "Skyline Bliss",
    "Weekend Getaway",
    "Scenic Spot",
    "Nature’s Wonders",
    "Urban Vibes",
    "Daydream",
    "Nature’s Call",
    "Adventure Shot",
    "Urban Pulse",
    "Calm Views",
    "Scenic Beauty",
    "Chilled Vibes",
    "Weekend Bliss",
    "Modern Escape",
    "Wanderlust Vibes",
    "Serene Spaces",
    "City Vibes",
    "Epic Escape",
    "Outdoor Oasis",
    "Daily Escape",
    "Scenic Beauty",
    "Cool Vibes",
    "Adventure Awaits",
    "Daydreaming",
    "Peaceful Spaces",
    "Chill Time",
    "Urban Scenes"
];

// Function to generate a unique ObjectId (12-character hex string)
function generateObjectId() {
    return 'xxxxxxxxxxxx' // 12 characters
        .replace(/[x]/g, () => (Math.random() * 16 | 0).toString(16));
}

// Function to generate a random user ID different from the post creator
function getRandomUserIdExclude(excludeId) {
    const eligibleUsers = userDemoData.filter(user => user._id !== excludeId);
    const randomIndex = Math.floor(Math.random() * eligibleUsers.length);
    return eligibleUsers[randomIndex]._id;
}

// Function to generate a random list of user IDs who liked a comment
function generateLikedBy() {
    const numberOfLikes = Math.floor(Math.random() * 16); // Between 0 and 15
    const allUserIds = userDemoData.map(user => user._id);
    const likedBy = new Set();
    
    while (likedBy.size < numberOfLikes) {
        const randomUserId = allUserIds[Math.floor(Math.random() * allUserIds.length)];
        likedBy.add(randomUserId);
    }
    
    return Array.from(likedBy);
}

// Function to generate a single comment
function generateComment(postCreatorId) {
    const commentCreatorId = getRandomUserIdExclude(postCreatorId);
    return {
        _id: generateObjectId(),
        by: commentCreatorId,
        likedBy: generateLikedBy(),
        text: commentTexts[Math.floor(Math.random() * commentTexts.length)]
    };
}

// Function to generate a single post
function generatePost(userId, postIndex, totalPosts) {
    const randomImageId = getRandomNumber(1, totalPosts);
    const randomTitle = postTitles[Math.floor(Math.random() * postTitles.length)];
    return {
        by: userId,
        createdAt: new Date(),
        image: `https://picsum.photos/id/${randomImageId}/1500`,
        likes: generateLikedBy(), // Array of user IDs
        comments: Array.from({ length: Math.floor(Math.random() * 11) }, () => generateComment(userId)),
        title: randomTitle
    };
}

// Function to generate posts for a user
function generatePostsForUser(user) {
    const numberOfPosts = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
    return Array.from({ length: numberOfPosts }, (_, index) => generatePost(user._id, index + 1, numberOfPosts));
}

// Function to generate all posts
export function generateAllPosts() {
    const totalPosts = userDemoData.reduce((acc, user) => acc + Math.floor(Math.random() * (20 - 10 + 1)) + 10, 0);
    return userDemoData.flatMap(user => generatePostsForUser(user));
}

// Utility function to get a random number between min and max (inclusive)
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Export generated posts
export const allPosts = generateAllPosts();

// Log the results (for testing purposes)
// console.log(allPosts);