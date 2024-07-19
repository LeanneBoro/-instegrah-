export const utilService = {
    makeId,
    makeLorem,
    getRandomInt,
    loadFromStorage,
    saveToStorage,
    getRandomFullName,
    getRandomUsername,
    getRandomProfileImg,
    getRandomText,
    getRandomDate,
    timeDifferenceUpToWeeks,
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min 
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}




// User demo-data-functions:

function getRandomFullName() {
    const maleFirstNames = [
        "John", "Alex", "Chris", "Pat", "Taylor", "Sam", "Casey",
        "Michael", "David", "Tom", "Peter"
    ];
    const femaleFirstNames = [
        "Jane", "Sarah", "Laura", "Emily", "Anna"
    ];
    const lastNames = [
        "Smith", "Doe", "Johnson", "Brown", "Williams", "Jones", "Garcia", "Miller",
        "Davis", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas"
    ];

    const isMale = utilService.getRandomInt(0, 1) === 0;
    const firstName = isMale
        ? maleFirstNames[utilService.getRandomInt(0, maleFirstNames.length - 1)]
        : femaleFirstNames[utilService.getRandomInt(0, femaleFirstNames.length - 1)];
    const lastName = lastNames[utilService.getRandomInt(0, lastNames.length - 1)];

    return {
        fullName: `${firstName} ${lastName}`,
        gender: isMale ? 'male' : 'female'
    };
}

function getRandomUsername(fullName) {
    const [firstName, lastName] = fullName.toLowerCase().split(' ');
    const suffixes = ["123", "456", "789", "007", "thegreat", "cool", "pro"];
    const suffix = suffixes[utilService.getRandomInt(0, suffixes.length - 1)];
    return `${firstName}_${lastName}_${suffix}`;
}

function getRandomText() {
    const texts = [
        "Best trip ever",
        "Had a great time!",
        "Loving the weather",
        "Amazing experience",
        "Fun day out",
        "Beautiful scenery",
        "Wonderful time with friends",
        "Enjoying the vacation",
        "Relaxing weekend",
        "Great food and company"
    ];
    return texts[utilService.getRandomInt(0, texts.length - 1)];
}

function getRandomProfileImg(gender) {
    const genderPath = gender === 'male' ? 'men' : 'women';
    const id = utilService.getRandomInt(1, 99);
    return `https://randomuser.me/api/portraits/${genderPath}/${id}.jpg`;
}

function getRandomDate(minTimestamp = 0) {
    const now = Date.now()
    const threeMonthsAgo = now - (1000 * 60 * 60 * 24 * 30 * 3)
    const minDate = minTimestamp || threeMonthsAgo
    const randomTimestamp = Math.floor(Math.random() * (now - minDate + 1) + minDate)
    return randomTimestamp
}

//functions to calculate dates:

function timeDifferenceUpToWeeks(timestamp, length = "short") {
    const now = Date.now();
    const timeDiff = now - timestamp;
  
    const minutes = Math.floor(timeDiff / (1000 * 60));
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7));
  
    if (length === 'short') {
      if (minutes < 60) {
        return `${minutes}m`;
      } else if (hours < 24) {
        return `${hours}h`;
      } else if (days < 7) {
        return `${days}d`;
      } else {
        return `${weeks}w`;
      }
    } else {
      if (minutes < 60) {
        return `${minutes} minutes`;
      } else if (hours < 24) {
        return `${hours} hours`;
      } else if (days < 7) {
        return `${days} days`;
      } else {
        return `${weeks} weeks`;
      }
    }
  }



console.log(timeDifferenceUpToWeeks(getRandomDate(),"short"));