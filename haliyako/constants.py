SYMPTOMS = ['Fever', 'Dry cough', 'Fatigue', 'Shortness of breath', 'Sore throat', 'Headache', 'Nausea', 'None']
UNDERLYING = ['Hypertension', 'Diabetes', 'Cardiovascular', 'Chronic respiratory', 'Cancer', 'None of the above']
SEVERE_SYMPTOMS = ['Not experiencing any life threathening symptoms',
                   'Extreme difficutly breathing. Gasping for air or cannot talk without catching breathe',
                   'Blue colored lips or face',
                   'Severe and constant pain or pressure on the chest',
                   'Acting confused (new or worsening)',
                   'Unconscious or very difficult to wake up',
                   'Slurred speech (new or worsening)',
                   'New seizures or seizures that would not stop',
                   'Coughing up blood (more than about 1 teaspoon)',
                   'Signs of low blood pressure (feeling cold, pale, clammy skin,light-headed, too weak to stand)'
                   ]
ANIMALS = ['Mbwa_mwitu', 'Sisimizi', 'Chugu', 'Sungusungu', 'ngumbi', 'Siafu', 'Nyani', 'Popo',
           'Mbweha_masikio', 'Ndege', 'Kima', 'Nyati', 'Mbogo', 'Komba', 'Pongo', 'Mbawala', 'Kipepeo',
           'Kinyonga', 'Ngamia', 'Paka', 'Duma', 'Sokwe', 'Fungo', '', 'Mbega', 'mwekundu', 'Kima_punju',
           'Mamba', 'Paa', 'Digidigi', 'Kereng’ende', 'Funo', 'Mbwa', 'Pomboo', 'Punda', 'Pofu',
           'Tembo', 'Ndovu', 'Samaki', 'Nzi', 'Kambale', 'Kambare', 'Kange', 'Heroe', 'Swala', 'Kala', 'Kanu', 'Twiga',
           'Mbuzi', 'Swala_Granti', 'Kanga', 'Sili', 'Kongoni', 'Kiboko', 'Pelele', 'Wibari', 'Kwanga', 'Pimbi',
           'Farasi',
           'Pimbi', 'Swala_pala', 'Mdudu', 'Mbweha', 'Mbuzi_mawe', 'Tandala_mkubwa', 'Tandala_mdogo', 'Chui', 'Simba',
           'Mjusi',
           'Kenge', 'Nguchiro', 'Kimburu', 'Tumbili', 'Mbu', 'Kipopo', 'nondo', 'dege', 'Panya_mdogo', 'puku', 'Taya',
           'Choroa', 'Mbuni',
           'Bundi', 'Babewana', 'Babewatoto', 'Vumatiti', 'Kakakuona', 'Nguruwe', 'Nungunungu', 'Chat', 'Sungura',
           'Panya', 'Kifaru', 'Korongo',
           'Palahala', 'Mbarapi', 'Nge', 'Ng’ge', 'Kisusuli', 'Akrabu', 'mondo', 'Kondoo', 'Nyoka', 'Buibui', 'Kindi',
           'Kidiri', 'Chindi', 'Sindi',
           'Swala_tomi', 'Nyamera', 'Tumbili', 'Tumbiri', 'Ngiri', 'Kuro', 'Nyumbu', 'Pundamilia'
           ]

SUBCOUNTIES = [['Changamwe', 'Jomvu', 'Kisauni', 'Nyali', 'Likoni', 'Mvita'],
              ['Msambweni', 'Lunga Lunga', 'Matuga', 'Kinango'],
              ['Kilifi North', 'Kilifi South', 'Kaloleni', 'Rabai', 'Ganze', 'Malindi', 'Magarini'],
              ['Garsen', 'Galole', 'Bura'], ['Lamu East', 'Lamu West'],
              ['Taveta', 'Wundanyi', 'Mwatate', 'Voi'],
              ['Garissa Township', 'Balambala', 'Lagdera', 'Dadaab', 'Fafi', 'Ijara'],
              ['Wajir North', 'Wajir East', 'Tarbaj', 'Wajir West', 'Eldas', 'Wajir South'],
              ['Mandera West', 'Banissa', 'Mandera North', 'Mandera South', 'Mandera East', 'Lafey'],
              ['Moyale', 'North Horr', 'Saku', 'Laisamis'],
              ['Isiolo North', 'Isiolo South'],
              ['Igembe South', 'Igembe Central', 'Igembe North', 'Tigania West', 'Tigania East', 'North Imenti',
               'Buuri', 'Central Imenti', 'South Imenti'],
              ['Maara', 'Chuka', 'Tharaka'],
              ['Manyatta', 'Runyenjes', 'Mbeere South', 'Mbeere North'],
              ['Mwingi North', 'Mwingi West', 'Mwingi Central', 'Kitui West', 'Kitui Rural', 'Kitui Central',
               'Kitui East', 'Kitui South'],
              ['Masinga', 'Yatta', 'Kangundo', 'Matungulu', 'Kathiani', 'Mavoko', 'Machakos Town', 'Mwala'],
              ['Mbooni', 'Kilome', 'Kaiti', 'Makueni', 'Kibwezi West', 'Kibwezi East'],
              ['Kinangop', 'Kipipiri', 'Ol Kalou', 'Ol Jorok', 'Ndaragwa'],
              ['Tetu', 'Kieni', 'Mathira', 'Othaya', 'Mukurweini', 'Nyeri Town'],
              ['Mwea', 'Gichugu', 'Ndia', 'Kirinyaga Central'],
              ['Kangema', 'Mathioya', 'Kiharu', 'Kigumo', 'Maragwa', 'Kandara', 'Gatanga'],
              ['Gatundu South', 'Gatundu North', 'Juja', 'Thika Town', 'Ruiru', 'Githunguri', 'Kiambu', 'Kiambaa',
               'Kabete', 'Kikuyu', 'Limuru', 'Lari'],
              ['Turkana North', 'Turkana West', 'Turkana Central', 'Loima', 'Turkana South', 'Turkana East'],
              ['Kapenguria', 'Sigor', 'Kacheliba', 'Pokot South'],
              ['Samburu West', 'Samburu North', 'Samburu East'],
              ['Kwanza', 'Endebess', 'Saboti', 'Kiminini', 'Cherangany'],
              ['Soy', 'Turbo', 'Moiben', 'Ainabkoi', 'Kapseret', 'Kesses'],
              ['Marakwet East', 'Marakwet West', 'Keiyo North', 'Keiyo South'],
              ['Tinderet', 'Aldai', 'Nandi Hills', 'Chesumei', 'Emgwen', 'Mosop'],
              ['Tiaty', 'Baringo North', 'Baringo Central', 'Baringo South', 'Mogotio', 'Eldama Ravine'],
              ['Laikipia West', 'Laikipia East', 'Laikipia North'],
              ['Molo', 'Njoro', 'Naivasha', 'Gilgil', 'Kuresoi South', 'Kuresoi North', 'Subukia', 'Rongai', 'Bahati',
               'Nakuru Town West', 'Nakuru Town East'],
              ['Kilgoris', 'Emurua Dikirr', 'Narok North', 'Narok East', 'Narok South', 'Narok West'],
              ['Kajiado North', 'Kajiado Central', 'Kajiado East', 'Kajiado West', 'Kajiado South'],
              ['Kipkelion East', 'Kipkelion West', 'Ainamoi', 'Bureti', 'Belgut', 'Sigowet–Soin'],
              ['Sotik', 'Chepalungu', 'Bomet East', 'Bomet Central', 'Konoin'],
              ['Lugari', 'Likuyani', 'Malava', 'Lurambi', 'Navakholo', 'Mumias West', 'Mumias East', 'Matungu',
               'Butere', 'Khwisero', 'Shinyalu', 'Ikolomani'],
              ['Vihiga', 'Sabatia', 'Hamisi', 'Luanda', 'Emuhaya'],
              ['Mount Elgon', 'Sirisia', 'Kabuchai', 'Bumula', 'Kanduyi', 'Webuye East', 'Webuye West', 'Kimilili',
               'Tongaren'],
              ['Teso North', 'Teso South', 'Nambale', 'Matayos', 'Butula', 'Funyula', 'Budalangi'],
              ['Ugenya', 'Ugunja', 'Alego Usonga', 'Gem', 'Bondo', 'Rarieda'],
              ['Kisumu East', 'Kisumu West', 'Kisumu Central', 'Seme', 'Nyando', 'Muhoroni', 'Nyakach'],
              ['Kasipul', 'Kabondo Kasipul', 'Karachuonyo', 'Rangwe', 'Homa Bay Town', 'Ndhiwa', 'Mbita', 'Suba'],
              ['Rongo', 'Awendo', 'Suna East', 'Suna West', 'Uriri', 'Nyatike', 'Kuria West', 'Kuria East'],
              ['Bonchari', 'South Mugirango', 'Bomachoge Borabu', 'Bobasi', 'Bomachoge Chache', 'Nyaribari Masaba',
               'Nyaribari Chache', 'Kitutu Chache North', 'Kitutu Chache South'],
              ['Kitutu Masaba', 'West Mugirango', 'North Mugirango', 'Borabu'],
              [
                  'Westlands', 'Dagoretti North', 'Dagoretti South', "Lang'ata", 'Kibra', 'Roysambu', 'Kasarani', 'Ruaraka', 'Embakasi South', 'Embakasi North', 'Embakasi Central', 'Embakasi West', 'Makadara', 'Kamukunji', 'Starehe', 'Mathare']
              ]

COUNTIES = [
    {
        "name": "Mombasa",
        "code": 1,
        "capital": "Mombasa City"
    }, {
        "name": "Kwale",
        "code": 2,
        "capital": "Kwale"
    }, {
        "name": "Kilifi",
        "code": 3,
        "capital": "Kilifi"
    }, {
        "name": "Tana River",
        "code": 4,
        "capital": "Hola"

    }, {
        "name": "Lamu",
        "code": 5,
        "capital": "Lamu"
    }, {
        "name": "Taita-Taveta",
        "code": 6,
        "capital": "Voi"
    }, {
        "name": "Garissa",
        "code": 7,
        "capital": "Garissa"
    }, {
        "name": "Wajir",
        "code": 8,
        "capital": "Wajir"
    }, {
        "name": "Mandera",
        "code": 9,
        "capital": "Mandera"
    }, {
        "name": "Marsabit",
        "code": 10,
        "capital": "Marsabit"
    }, {
        "name": "Isiolo",
        "code": 11,
        "capital": "Isiolo"
    }, {
        "name": "Meru",
        "code": 12,
        "capital": "Meru"
    }, {
        "name": "Tharaka-Nithi",
        "code": 13,
        "capital": "Chuka"
    }, {
        "name": "Embu",
        "code": 14,
        "capital": "Embu"
    }, {
        "name": "Kitui",
        "code": 15,
        "capital": "Kitui"
    }, {
        "name": "Machakos",
        "code": 16,
        "capital": "Machakos"
    }, {
        "name": "Makueni",
        "code": 17,
        "capital": "Wote"
    }, {
        "name": "Nyandarua",
        "code": 18,
        "capital": "Ol Kalou"
    }, {
        "name": "Nyeri",
        "code": 19,
        "capital": "Nyeri"
    }, {
        "name": "Kirinyaga",
        "code": 20,
        "capital": "Kerugoya/Kutus"
    }, {
        "name": "Murang'a",
        "code": 21,
        "capital": "Murang'a"
    }, {
        "name": "Kiambu",
        "code": 22,
        "capital": "Kiambu"
    }, {
        "name": "Turkana",
        "code": 23,
        "capital": "Lodwar"
    }, {
        "name": "West Pokot",
        "code": 24,
        "capital": "Kapenguria"
    }, {
        "name": "Samburu",
        "code": 25,
        "capital": "Maralal"
    }, {
        "name": "Trans-Nzoia",
        "code": 26,
        "capital": "Kitale"
    }, {
        "name": "Uasin Gishu",
        "code": 27,
        "capital": "Eldoret"
    }, {
        "name": "Elgeyo-Marakwet",
        "code": 28,
        "capital": "Iten"
    }, {
        "name": "Nandi",
        "code": 29,
        "capital": "Kapsabet"
    }, {
        "name": "Baringo",
        "code": 30,
        "capital": "Kabarnet"
    }, {
        "name": "Laikipia",
        "code": 31,
        "capital": "Rumuruti"
    }, {
        "name": "Nakuru",
        "code": 32,
        "capital": "Nakuru"
    }, {
        "name": "Narok",
        "code": 33,
        "capital": "Narok"
    }, {
        "name": "Kajiado",
        "code": 34
    }, {
        "name": "Kericho",
        "code": 35,
        "capital": "Kericho"
    }, {
        "name": "Bomet",
        "code": 36,
        "capital": "Bomet"
    }, {
        "name": "Kakamega",
        "code": 37,
        "capital": "Kakamega"
    }, {
        "name": "Vihiga",
        "code": 38,
        "capital": "Vihiga"
    }, {
        "name": "Bungoma",
        "code": 39,
        "capital": "Bungoma"
    }, {
        "name": "Busia",
        "code": 40,
        "capital": "Busia"
    }, {
        "name": "Siaya",
        "code": 41,
        "capital": "Siaya"
    }, {
        "name": "Kisumu",
        "code": 42,
        "capital": "Kisumu"
    }, {
        "name": "Homa Bay",
        "code": 43,
        "capital": "Homa Bay"
    }, {
        "name": "Migori",
        "code": 44,
        "capital": "Migori"
    }, {
        "name": "Kisii",
        "code": 45,
        "capital": "Kisii"
    }, {
        "name": "Nyamira",
        "code": 46,
        "capital": "Nyamira"
    }, {
        "name": "Nairobi",
        "code": 47,
        "capital": "Nairobi City"
    }]
