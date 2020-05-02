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
ANIMALS = ['Mbwa_mwitu','Sisimizi','Chugu','Sungusungu','ngumbi','Siafu','Nyani','Popo',
           'Mbweha_masikio','Ndege','Kima','Nyati','Mbogo','Komba','Pongo','Mbawala','Kipepeo',
           'Kinyonga','Ngamia','Paka','Duma','Sokwe','Fungo','','Mbega','mwekundu','Kima_punju',
           'Mamba','Paa','Digidigi','Kereng’ende','Funo','Mbwa','Pomboo','Punda','Pofu',
           'Tembo','Ndovu','Samaki','Nzi','Kambale','Kambare','Kange','Heroe','Swala','Kala','Kanu','Twiga',
           'Mbuzi','Swala_Granti','Kanga','Sili','Kongoni','Kiboko','Pelele','Wibari','Kwanga','Pimbi','Farasi',
           'Pimbi','Swala_pala','Mdudu','Mbweha','Mbuzi_mawe','Tandala_mkubwa','Tandala_mdogo','Chui','Simba','Mjusi',
           'Kenge','Nguchiro','Kimburu','Tumbili','Mbu','Kipopo','nondo','dege','Panya_mdogo','puku','Taya','Choroa','Mbuni',
           'Bundi','Babewana','Babewatoto','Vumatiti','Kakakuona','Nguruwe','Nungunungu','Chat','Sungura','Panya','Kifaru','Korongo',
           'Palahala','Mbarapi','Nge','Ng’ge','Kisusuli','Akrabu','mondo','Kondoo','Nyoka','Buibui','Kindi','Kidiri','Chindi','Sindi',
           'Swala_tomi','Nyamera','Tumbili','Tumbiri','Ngiri','Kuro','Nyumbu','Pundamilia'
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
