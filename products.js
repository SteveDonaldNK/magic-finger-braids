const products = [{
    name: "Med Box Braids",
    type: "women",
    image: "assets/image1.jpg",
    category: 'box braids',
    min: 200,
    max: 300,
    options: [{
        name: 'Mid back',
        price: 200
    }, {
        name: 'Lower',
        price: 220
    }, {
        name: 'Waist',
        price: 240
    }, {
        name: 'Butt',
        price: 280
    }, {
        name: 'Thigh',
        price: 300
    }]
}, {
    name: "Jumbo Knotless",
    type: "women",
    image: "assets/image2.jpg",
    category: 'Knotless',
    min: 140,
    max: 220,
    options: [{
        name: 'Mid back',
        price: 140
    }, {
        name: 'Lower back',
        price: 150
    }, {
        name: 'Waist',
        price: 170
    }, {
        name: 'Butt',
        price: 200
    }, {
        name: 'Thigh',
        price: 220
    }]
}, {
    name: "Side Stitch Box Braids",
    type: "women",
    image: "assets/image3.jpg",
    category: 'box braids',
    min: 250,
    max: null,
    options: [{
        name: 'Normal',
        price: 250
    }]
}, {
    name: "Kids Knotless",
    type: "Kids",
    image: "assets/image17.jpg",
    category: 'Knotless',
    min: 200,
    max: 220,
    options: [{
        name: 'Mid back',
        price: 200
    }, {
        name: 'Lower back',
        price: 210
    }, {
        name: 'Waist',
        price: 220
    }]
}, {
    name: "Large Box Braids",
    type: "women",
    image: "assets/image4.jpg",
    category: 'box braids',
    min: 150,
    max: 250,
    options: [{
        name: 'Mid back',
        price: 150
    }, {
        name: 'Lower back',
        price: 180
    }, {
        name: 'Waist',
        price: 200
    }, {
        name: 'Butt',
        price: 220
    }, {
        name: 'Thigh',
        price: 250
    }]
}, {
    name: "Kinky Twist",
    type: "women",
    image: "assets/image5.jpg",
    category: 'Twist',
    min: 150,
    max: 200,
    options: [{
        name: 'Shoulder',
        price: 150
    }, {
        name: 'Upper back',
        price: 180
    }, {
        name: 'Mid back',
        price: 200
    }]
}, {
    name: "Under Spring Twist",
    type: "women",
    image: "assets/image6.jpg",
    category: 'Twist',
    min: 120,
    max: 180,
    options: [{
        name: 'Shoulder',
        price: 120
    }, {
        name: 'Upper back',
        price: 140
    }, {
        name: 'Mid back',
        price: 180
    }]
}, {
    name: "Two Trand Twist",
    type: "men",
    image: "assets/image7.jpg",
    category: 'Twist',
    min: 100,
    max: null,
    options: [{
        name: 'Normal',
        price: 100
    }]
}, {
    name: "Medium Knotless",
    type: "women",
    image: "assets/image8.jpg",
    category: 'Knotless',
    min: 220,
    max: 340,
    options: [{
        name: 'Mid back',
        price: 220
    }, {
        name: 'Lower back',
        price: 240
    }, {
        name: 'Waist',
        price: 260
    }, {
        name: 'Butt',
        price: 300
    }, {
        name: 'Thigh',
        price: 340
    }]
}, {
    name: "Men plait",
    type: "men",
    image: "assets/image9.jpg",
    category: 'Plait',
    min: 100,
    max: null,
    options: [{
        name: 'Normal',
        price: 100
    }]
}, {
    name: "7-8 stitch Cornrow up do",
    type: "women",
    image: "assets/image10.jpg",
    category: 'Cornrow',
    min: 160,
    max: null,
    options: [{
        name: 'Normal',
        price: 160
    }]
}, {
    name: "6 Stitch Cornrow",
    type: "women",
    image: "assets/image11.jpg",
    category: 'Cornrow',
    min: 120,
    max: null,
    options: [{
        name: 'Normal',
        price: 120
    }]
}, {
    name: "Triangle Knotless",
    type: "women",
    image: "assets/image12.jpg",
    category: 'Knotless',
    min: 240,
    max: 340,
    options: [{
        name: 'Mid back',
        price: 240
    }, {
        name: 'Lower back',
        price: 280
    }, {
        name: 'Waist',
        price: 320
    }, {
        name: 'Butt',
        price: 340
    }]
}, {
    name: "Extra Small Knotless",
    type: "women",
    image: "assets/image13.jpg",
    category: 'Knotless',
    min: 350,
    max: 500,
    options: [{
        name: 'Mid back',
        price: 350
    }, {
        name: 'Lower back',
        price: 380,
    }, {
        name: 'Waist',
        price: 400
    }, {
        name: 'Butt',
        price: 450
    }, {
        name: 'Thigh',
        price: 500
    }]
}, {
    name: "Large Knotless",
    type: "women",
    image: "assets/image15.jpg",
    category: 'Knotless',
    min: 150,
    max: 280,
    options: [{
        name: 'Mid back',
        price: 150
    }, {
        name: 'Lower back',
        price: 170
    }, {
        name: 'Waist',
        price: 220
    }, {
        name: 'Butt',
        price: 240
    }, {
        name: 'Thigh',
        price: 280
    }]
}, {
    name: "Fulani Cornrow",
    type: "women",
    image: "assets/image16.jpg",
    category: 'Cornrow',
    min: 240,
    max: 280,
    options: [{
        name: 'Mid back',
        price: 240
    }, {
        name: 'Lower back',
        price: 260
    }, {
        name: 'Waist',
        price: 280
    }]
}, {
    name: "Half Stitch/Half Braid",
    type: "women",
    image: "assets/image18.jpg",
    min: 200,
    max: null,
    options: [{
        name: 'Normal',
        price: 200
    }]
}, {
    name: "Passion Twist",
    type: "women",
    image: "assets/image19.jpg",
    category: 'Twist',
    min: 210,
    max: 240,
    options: [{
            name: 'Mid back',
            price: 210,
        }, {
            name: 'Lower back',
            price: 220,
        }, {
            name: 'Waist',
            price: 240
    }]
}, {
    name: "Soft Locs",
    type: "women",
    image: "assets/image14.jpg",
    category: 'Locs',
    min: 220,
    max: 260,
    options: [{
            name: 'Mid back',
            price: 220
        }, {
            name: 'Lower back',
            price: 240
        }, {
        name: 'Waist',
        price: 260
    }]
}, {
    name: "Bomb Twist",
    type: "women",
    image: "assets/image20.jpg",
    category: 'Twist',
    min: 220,
    max: 260,
    options: [{
        name: 'Shoulder',
        price: 220,
    }, {
        name: 'Upper back',
        price: 240,
    }, {
        name: 'Mid back',
        price: 260
    }]
}, {
    name: "Butterfly Locs",
    type: "women",
    image: "assets/image21.jpg",
    category: 'Locs',
    min: 240,
    max: 300,
    options: [{
        name: 'Mid back',
        price: 240,
    }, {
        name: 'Lower back',
        price: 280,
    }, {
        name: 'Waist',
        price: 300
    }]
}, {
    name: "Senegalese Twist",
    type: "women",
    image: "assets/image22.jpg",
    category: 'Twist',
    min: 220,
    max: 260,
    options: [{
        name: 'Mid back',
        price: 220,
    }, {
        name: 'Lower back',
        price: 240,
    }, {
        name: 'Waist',
        price: 260
    }]
}]

module.exports = products;