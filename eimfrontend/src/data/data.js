import flatten from "flat";
import {useState} from "react";
export const songList = [
    /* 1 */
    {   "_id" : "1",
        "artist" : "The Verve",
        "title" : "Bittersweet Symphony",
    },

    /* 2 */
    {
        "_id" : "2",
        "artist" : "The Beach Boys",
        "title" : "Good Vibrations",
     },
    /* 3 */
    {
        "_id" : "3",
        "artist" : "Louis Armstrong",
        "title" : "What a Wonderful World"
    },

    /* 4 */
    {
        "_id" : "4",
        "artist" : "Juan Luis Guerra",
        "title" : "A Pedir Su Mano"
    },

    /* 5 */
    {
        "_id" : "5",
        "artist" : "Silvio Rodriguez",
        "title" : "Coda Te Conozco",
    },
]

const nationalities = [
    'Afghan',
    'Albanian',
    'Algerian',
    'American',
    'Andorran',
    'Angolan',
    'Antiguans',
    'Argentinean',
    'Armenian',
    'Australian',
    'Austrian',
    'Azerbaijani',
    'Bahamian',
    'Bahraini',
    'Bangladeshi',
    'Barbadian',
    'Barbudans',
    'Batswana',
    'Belarusian',
    'Belgian',
    'Belizean',
    'Beninese',
    'Bhutanese',
    'Bolivian',
    'Bosnian',
    'Brazilian',
    'British',
    'Bruneian',
    'Bulgarian',
    'Burkinabe',
    'Burmese',
    'Burundian',
    'Cambodian',
    'Cameroonian',
    'Canadian',
    'Cape Verdean',
    'Central African',
    'Chadian',
    'Chilean',
    'Chinese',
    'Colombian',
    'Comoran',
    'Congolese',
    'Costa Rican',
    'Croatian',
    'Cuban',
    'Cypriot',
    'Czech',
    'Danish',
    'Djibouti',
    'Dominican',
    'Dutch',
    'East Timorese',
    'Ecuadorean',
    'Egyptian',
    'Emirian',
    'Equatorial Guinean',
    'Eritrean',
    'Estonian',
    'Ethiopian',
    'Fijian',
    'Filipino',
    'Finnish',
    'French',
    'Gabonese',
    'Gambian',
    'Georgian',
    'German',
    'Ghanaian',
    'Greek',
    'Grenadian',
    'Guatemalan',
    'Guinea-Bissauan',
    'Guinean',
    'Guyanese',
    'Haitian',
    'Herzegovinian',
    'Honduran',
    'Hungarian',
    'I-Kiribati',
    'Icelander',
    'Indian',
    'Indonesian',
    'Iranian',
    'Iraqi',
    'Irish',
    'Israeli',
    'Italian',
    'Ivorian',
    'Jamaican',
    'Japanese',
    'Jordanian',
    'Kazakhstani',
    'Kenyan',
    'Kittian and Nevisian',
    'Kuwaiti',
    'Kyrgyz',
    'Laotian',
    'Latvian',
    'Lebanese',
    'Liberian',
    'Libyan',
    'Liechtensteiner',
    'Lithuanian',
    'Luxembourger',
    'Macedonian',
    'Malagasy',
    'Malawian',
    'Malaysian',
    'Maldivan',
    'Malian',
    'Maltese',
    'Marshallese',
    'Mauritanian',
    'Mauritian',
    'Mexican',
    'Micronesian',
    'Moldovan',
    'Monacan',
    'Mongolian',
    'Moroccan',
    'Mosotho',
    'Motswana',
    'Mozambican',
    'Namibian',
    'Nauruan',
    'Nepalese',
    'New Zealander',
    'Nicaraguan',
    'Nigerian',
    'Nigerien',
    'North Korean',
    'Northern Irish',
    'Norwegian',
    'Omani',
    'Pakistani',
    'Palauan',
    'Panamanian',
    'Papua New Guinean',
    'Paraguayan',
    'Peruvian',
    'Polish',
    'Portuguese',
    'Qatari',
    'Romanian',
    'Russian',
    'Rwandan',
    'Saint Lucian',
    'Salvadoran',
    'Samoan',
    'San Marinese',
    'Sao Tomean',
    'Saudi',
    'Scottish',
    'Senegalese',
    'Serbian',
    'Seychellois',
    'Sierra Leonean',
    'Singaporean',
    'Slovakian',
    'Slovenian',
    'Solomon Islander',
    'Somali',
    'South African',
    'South Korean',
    'Spanish',
    'Sri Lankan',
    'Sudanese',
    'Surinamer',
    'Swazi',
    'Swedish',
    'Swiss',
    'Syrian',
    'Taiwanese',
    'Tajik',
    'Tanzanian',
    'Thai',
    'Togolese',
    'Tongan',
    'Trinidadian/Tobagonian',
    'Tunisian',
    'Turkish',
    'Tuvaluan',
    'Ugandan',
    'Ukrainian',
    'Uruguayan',
    'Uzbekistani',
    'Venezuelan',
    'Vietnamese',
    'Welsh',
    'Yemenite',
    'Zambian',
    'Zimbabwean'
]


const styles = ['rock', 'pop', 'jazz', 'world', 'classical', 'metal', 'hip-hop', 'rock/pop', 'other'];
const sex = ['male', 'female', 'other']

export function createFakeData(amount){
    let data = [];
    for (let i = 0; i < amount; i++){
        let item = {
            id: Math.floor(Math.random() * 1000000),
            date: new Date(+(new Date()) - Math.floor(Math.random()*10000000000)),
            experiment: 10,
            answers: {
                music_styles: [styles[Math.floor(Math.random() * styles.length)],styles[Math.floor(Math.random() * styles.length)]],
                most_engaged: Math.floor(Math.random()*4),
                most_enjoyed: Math.floor(Math.random()*4), // Between songs 1 - 3?
                sex: sex[Math.floor(Math.random() * sex.length)],
                age: Math.floor(Math.random()*60),
                dob: new Date(+(new Date(2000, 1, 1)) - Math.floor(Math.random()*10000000000)),
                musical_background: Math.random() < 0.5,
                visual_impairments: Math.random() < 0.5,
                hearing_impairments: Math.random() < 0.5,
                nationality: nationalities[Math.floor(Math.random()*nationalities.length)],
                ratings: {
                    activity : [
                        Math.floor(Math.random()*6),
                        Math.floor(Math.random()*6),
                        Math.floor(Math.random()*6)
                    ],
                    engagement :  [
                        Math.floor(Math.random()*6),
                        Math.floor(Math.random()*6),
                        Math.floor(Math.random()*6)
                    ],
                    familiarity :  [
                        Math.floor(Math.random()*6),
                        Math.floor(Math.random()*6),
                        Math.floor(Math.random()*6)
                    ],
                    chills :  [
                        Math.floor(Math.random()*6),
                        Math.floor(Math.random()*6),
                        Math.floor(Math.random()*6)
                    ],
                    positivity :  [
                        Math.floor(Math.random()*6),
                        Math.floor(Math.random()*6),
                        Math.floor(Math.random()*6)
                    ],
                    power :  [
                        Math.floor(Math.random()*6),
                        Math.floor(Math.random()*6),
                        Math.floor(Math.random()*6)
                    ],
                    like_dislike :  [
                        Math.floor(Math.random()*6),
                        Math.floor(Math.random()*6),
                        Math.floor(Math.random()*6)
                    ]
                },
                media: [
                    songList[Math.floor(Math.random()*songList.length)]._id,
                    songList[Math.floor(Math.random()*songList.length)]._id,
                    songList[Math.floor(Math.random()*songList.length)]._id
                ]
            }
        }
        data.push(item);
    }
    return data;
}

export const flattenArrayOfJson = (data) => {
    let newData = [];
    for(let i = 0; i < data.length; i++){
        newData.push(flatten(data[i]));
    }
    return newData;
}

export const filterDataBasedOnSong = (song_id, rows) => {
    if(!song_id){
        return rows;
    }

    let newData = rows.filter((item) => {
        console.log(song_id);
        console.log(item);
        switch(song_id){
            case item['media.0']:
            case item['media.1']:
            case item['media.2']:
                return true;
            default:
                return false;
        }
    })
    return newData
}





