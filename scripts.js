    var map = L.map('map').setView([20, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
		minZoom: 2,
		maxZoom: 20,
    }).addTo(map);
		
        var legend = L.control({position: 'bottomleft'});
        legend.onAdd = function (map) {
            var div = L.DomUtil.create('div', 'legend');
            div.innerHTML = '<b>Légende</b>';
            var content = L.DomUtil.create('div', 'legend-content', div);
            content.innerHTML = '<img src="images/marker-yellow.png" width="12" height="20"/> Accidents industriels (500 000 morts)<br><img src="images/marker-black.png" width="12" height="20"/> Attentats (3384 de morts)<br><img src="images/marker-bluedark.png" width="12" height="20"/> Catastrophes naturelles (8 millions de morts)<br><img src="images/marker-green.png" width="12" height="20"/> Centrales Nucléaires (44)<br><img src="images/marker-purple.png" width="12" height="20"/> Epidémies (300 millions de morts)<br><img src="images/marker-blue.png" width="12" height="20"/> Essais nucléaires (+2000)<br><img src="images/marker-red.png" width="12" height="20"/> Guerres (150 millions de morts)<br><img src="images/marker-orange.png" width="12" height="20"/> Incendies (+19 héctares)<br><img src="images/marker-greendark.png" width="12" height="20"/> Zones polluées (+3 millions de t/an)';

            div.onclick = function() {
                var display = content.style.display;
                content.style.display = display === 'none' || display === '' ? 'block' : 'none';
            };

            return div;
        };
        legend.addTo(map);
	
    var warLayer = L.layerGroup();
    var epidemicLayer = L.layerGroup();
    var naturalDisasterLayer = L.layerGroup();
    var industrialDisasterLayer = L.layerGroup();
    var pollutionLayer = L.layerGroup();
	var attentatLayer = L.layerGroup();
	var fireLayer = L.layerGroup();
	var nuclearLayer = L.layerGroup();
	var nuclearPlantsLayer = L.layerGroup();
	
        fetch('bdd/guerres.txt')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement du fichier');
                }
                return response.text();
            })
            .then(text => {
                const lines = text.split('\n');
                let wars = [];

                lines.forEach(line => {
                    const data = line.split(';');

                    if (data.length === 5) {
                        let war = {
                            lat: parseFloat(data[1]),
                            lon: parseFloat(data[2]),
                            name: data[0].trim(),
                            years: data[3].trim(),
                            casualties: data[4].trim()
                        };
                        wars.push(war);
                    }
                });
				
				console.log(`Chargement guerres`);
                wars.forEach(function(war) {
                    //console.log(`Nom: ${war.name}, Années: ${war.years}, Latitude: ${war.lat}, Longitude: ${war.lon}`);
                });

    wars.forEach(function(war) {
        var warMarker = L.marker([war.lat, war.lon], {icon: L.icon({
            iconUrl: 'images/marker-red.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
            shadowSize: [41, 41]
        })}).addTo(map);
        warMarker.bindPopup("<b>" + war.name + "</b><br>Années : " + war.years + "<br>Nombre de morts : " + war.casualties);
		warLayer.addLayer(warMarker);
    });
            })
            .catch(error => {
                console.error('Erreur:', error);
            });
			
        fetch('bdd/epidemies.txt')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement du fichier');
                }
                return response.text();
            })
            .then(text => {
                const lines = text.split('\n');
                let epidemics = [];

                lines.forEach(line => {
                    const data = line.split(';');

                    if (data.length === 5) {
                        let epidemic = {
                            lat: parseFloat(data[1]),
                            lon: parseFloat(data[2]),
                            name: data[0].trim(),
                            years: data[3].trim(),
                            casualties: data[4].trim()
                        };
                        epidemics.push(epidemic);
                    }
                });
				
				console.log(`Chargement epidemies`);
				
                epidemics.forEach(function(epidemic) {
                    //console.log(`Nom: ${epidemic.name}, Années: ${epidemic.years}, Latitude: ${epidemic.lat}, Longitude: ${epidemic.lon}`);
                });

    epidemics.forEach(function(epidemic) {
        var epidemicMarker = L.marker([epidemic.lat, epidemic.lon], {icon: L.icon({
            iconUrl: 'images/marker-purple.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
            shadowSize: [41, 41]
        })}).addTo(map);
        epidemicMarker.bindPopup("<b>" + epidemic.name + "</b><br>Années : " + epidemic.years + "<br>Nombre de morts : " + epidemic.casualties);
		epidemicLayer.addLayer(epidemicMarker);
    });
            })
            .catch(error => {
                console.error('Erreur:', error);
            });
	
                fetch('bdd/naturel.txt')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement du fichier');
                }
                return response.text();
            })
            .then(text => {
                const lines = text.split('\n');
                let naturalDisasters = [];

                lines.forEach(line => {
                    const data = line.split(';');

                    if (data.length === 6) {
                        let naturalDisaster = {
                            lat: parseFloat(data[1]),
                            lon: parseFloat(data[2]),
                            name: data[0].trim(),
                            years: data[3].trim(),
                            casualties: data[4].trim(),
							origin: data[5].trim()
                        };
                        naturalDisasters.push(naturalDisaster);
                    }
                });
				
				console.log(`Chargement catastrophes naturelles`);
				
                naturalDisasters.forEach(function(naturalDisaster) {
                    //console.log(`Nom: ${naturalDisaster.name}, Années: ${naturalDisaster.years}, Latitude: ${naturalDisaster.lat}, Longitude: ${naturalDisaster.lon}`);
                });

    naturalDisasters.forEach(function(naturalDisaster) {
        var naturalDisasterMarker = L.marker([naturalDisaster.lat, naturalDisaster.lon], {icon: L.icon({
            iconUrl: 'images/marker-bluedark.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
            shadowSize: [41, 41]
        })}).addTo(map);
        naturalDisasterMarker.bindPopup("<b>" + naturalDisaster.name + "</b><br>Années : " + naturalDisaster.years + "<br>Nombre de morts : " + naturalDisaster.casualties + "<br>Originie : " + naturalDisaster.origin);
		naturalDisasterLayer.addLayer(naturalDisasterMarker);
    });
            })
            .catch(error => {
                console.error('Erreur:', error);
            });
			
        fetch('bdd/industriels.txt')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement du fichier');
                }
                return response.text();
            })
            .then(text => {
                const lines = text.split('\n');
                let industrialDisasters = [];

                lines.forEach(line => {
                    const data = line.split(';');

                    if (data.length === 6) {
                        let industrialDisaster = {
                            lat: parseFloat(data[1]),
                            lon: parseFloat(data[2]),
                            name: data[0].trim(),
                            years: data[3].trim(),
                            casualties: data[4].trim(),
							origin: data[5].trim()
                        };
                        industrialDisasters.push(industrialDisaster);
                    }
                });
				
				console.log(`Chargement Accident industriels`);
				
                industrialDisasters.forEach(function(industrialDisaster) {
                    //console.log(`Nom: ${industrialDisaster.name}, Années: ${industrialDisaster.years}, Latitude: ${industrialDisaster.lat}, Longitude: ${industrialDisaster.lon}`);
                });

    industrialDisasters.forEach(function(industrialDisaster) {
        var industrialDisasterMarker = L.marker([industrialDisaster.lat, industrialDisaster.lon], {icon: L.icon({
            iconUrl: 'images/marker-yellow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
            shadowSize: [41, 41]
        })}).addTo(map);
        industrialDisasterMarker.bindPopup("<b>" + industrialDisaster.name + "</b><br>Années : " + industrialDisaster.years + "<br>Nombre de morts : " + industrialDisaster.casualties + "<br>Originie : " + industrialDisaster.origin);
		industrialDisasterLayer.addLayer(industrialDisasterMarker);
    });
            })
            .catch(error => {
                console.error('Erreur:', error);
            });
	fetch('bdd/pollution.txt')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement du fichier');
                }
                return response.text();
            })
            .then(text => {
                const lines = text.split('\n');
                let pollutedAreas = [];

                lines.forEach(line => {
                    const data = line.split(';');

                    if (data.length === 5) {
                        let pollutedArea = {
                            lat: parseFloat(data[1]),
                            lon: parseFloat(data[2]),
                            name: data[0].trim(),
                            years: data[3].trim(),
                            casualties: data[4].trim()
                        };
                        pollutedAreas.push(pollutedArea);
                    }
                });
				
				console.log(`Chargement Pollution`);
				
                pollutedAreas.forEach(function(pollutedArea) {
                    //console.log(`Nom: ${pollutedArea.name}, Années: ${pollutedArea.years}, Latitude: ${pollutedArea.lat}, Longitude: ${pollutedArea.lon}`);
                });

    pollutedAreas.forEach(function(pollutedArea) {
        var pollutedAreaMarker = L.marker([pollutedArea.lat, pollutedArea.lon], {icon: L.icon({
            iconUrl: 'images/marker-greendark.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
            shadowSize: [41, 41]
        })}).addTo(map);
        pollutedAreaMarker.bindPopup("<b>" + pollutedArea.name + "</b><br>Années : " + pollutedArea.years + "<br>Tonnes : " + pollutedArea.casualties);
		pollutionLayer.addLayer(pollutedAreaMarker);
    });
            })
            .catch(error => {
                console.error('Erreur:', error);
            });
			
	fetch('bdd/attentats.txt') // Assurez-vous que ce chemin est correct
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement du fichier');
                }
                return response.text();
            })
            .then(text => {
                const lines = text.split('\n');
                let attentatAreas = [];

                lines.forEach(line => {
                    const data = line.split(';');

                    if (data.length === 6) {
                        let attentatArea = {
                            lat: parseFloat(data[1]),
                            lon: parseFloat(data[2]),
                            name: data[0].trim(),
                            years: data[3].trim(),
                            casualties: data[4].trim(),
							origin: data[5].trim()
                        };
                        attentatAreas.push(attentatArea);
                    }
                });
				
				console.log(`Chargement Attentats`);
				
                attentatAreas.forEach(function(attentatArea) {
                    //console.log(`Nom: ${attentatArea.name}, Années: ${attentatArea.years}, Latitude: ${attentatArea.lat}, Longitude: ${attentatArea.lon}`);
                });

    attentatAreas.forEach(function(attentatArea) {
        var attentatAreaMarker = L.marker([attentatArea.lat, attentatArea.lon], {icon: L.icon({
            iconUrl: 'images/marker-black.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
            shadowSize: [41, 41]
        })}).addTo(map);
        attentatAreaMarker.bindPopup("<b>" + attentatArea.name + "</b><br>Années : " + attentatArea.years + "<br>Nombre de morts : " + attentatArea.casualties + "<br>Origine : " + attentatArea.casualties);
		attentatLayer.addLayer(attentatAreaMarker);
    });
            })
            .catch(error => {
                console.error('Erreur:', error);
            });
	
	fetch('bdd/essai.txt')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement du fichier');
                }
                return response.text();
            })
            .then(text => {
                const lines = text.split('\n');
                let nuclearAreas = [];

                lines.forEach(line => {
                    const data = line.split(';');

                    if (data.length === 4) {
                        let nuclearArea = {
                            lat: parseFloat(data[1]),
                            lon: parseFloat(data[2]),
                            name: data[0].trim(),
                            years: data[3].trim()
                        };
                        nuclearAreas.push(nuclearArea);
                    }
                });
				
				console.log(`Chargement Essais nucleaire`);
				
                nuclearAreas.forEach(function(nuclearArea) {
                    //console.log(`Nom: ${nuclearArea.name}, Années: ${nuclearArea.years}, Latitude: ${nuclearArea.lat}, Longitude: ${nuclearArea.lon}`);
                });

    nuclearAreas.forEach(function(nuclearArea) {
        var nuclearAreaMarker = L.marker([nuclearArea.lat, nuclearArea.lon], {icon: L.icon({
            iconUrl: 'images/marker-blue.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
            shadowSize: [41, 41]
        })}).addTo(map);
        nuclearAreaMarker.bindPopup("<b>" + nuclearArea.name + "</b><br>Années : " + nuclearArea.years);
		nuclearLayer.addLayer(nuclearAreaMarker);
    });
            })
            .catch(error => {
                console.error('Erreur:', error);
            });
	
	fetch('bdd/incendies.txt')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement du fichier');
                }
                return response.text();
            })
            .then(text => {
                const lines = text.split('\n');
                let fireAreas = [];

                lines.forEach(line => {
                    const data = line.split(';');

                    if (data.length === 6) {
                        let fireArea = {
                            lat: parseFloat(data[1]),
                            lon: parseFloat(data[2]),
                            name: data[0].trim(),
                            years: data[3].trim(),
                            casualties: data[4].trim(),
							surface: data[5].trim()
                        };
                        fireAreas.push(fireArea);
                    }
                });
				
				console.log(`Chargement Incendies`);
				
                fireAreas.forEach(function(fireArea) {
                    //console.log(`Nom: ${fireArea.name}, Années: ${fireArea.years}, Latitude: ${fireArea.lat}, Longitude: ${fireArea.lon}`);
                });

    fireAreas.forEach(function(fireArea) {
        var fireAreaMarker = L.marker([fireArea.lat, fireArea.lon], {icon: L.icon({
            iconUrl: 'images/marker-orange.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
            shadowSize: [41, 41]
        })}).addTo(map);
        fireAreaMarker.bindPopup("<b>" + fireArea.name + "</b><br>Années : " + fireArea.years + "<br>Nombre de morts : " + fireArea.casualties + "<br>Surface : " + fireArea.surface);
		fireLayer.addLayer(fireAreaMarker);
    });
            })
            .catch(error => {
                console.error('Erreur:', error);
            });
	
	fetch('bdd/centrale.txt')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement du fichier');
                }
                return response.text();
            })
            .then(text => {
                const lines = text.split('\n');
                let nuclearPlants = [];

                lines.forEach(line => {
                    const data = line.split(';');

                    if (data.length === 4) {
                        let nuclearPlant = {
                            lat: parseFloat(data[1]),
                            lon: parseFloat(data[2]),
                            name: data[0].trim(),
                            years: data[3].trim()
                        };
                        nuclearPlants.push(nuclearPlant);
                    }
                });
				
				console.log(`Chargement Centrales nucleaires`);
				
                nuclearPlants.forEach(function(nuclearPlant) {
                    //console.log(`Nom: ${nuclearPlant.name}, Années: ${nuclearPlant.years}, Latitude: ${nuclearPlant.lat}, Longitude: ${nuclearPlant.lon}`);
                });

    nuclearPlants.forEach(function(nuclearPlant) {
        var nuclearPlantMarker = L.marker([nuclearPlant.lat, nuclearPlant.lon], {icon: L.icon({
            iconUrl: 'images/marker-green.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
            shadowSize: [41, 41]
        })}).addTo(map);
        nuclearPlantMarker.bindPopup("<b>" + nuclearPlant.name + "</b><br>Années : " + nuclearPlant.years + "<br>Nombre de morts : " + nuclearPlant.casualties + "<br>Surface : " + nuclearPlant.surface);
		nuclearPlantsLayer.addLayer(nuclearPlantMarker);
    });
            })
            .catch(error => {
                console.error('Erreur:', error);
            });
	
    warLayer.addTo(map);
    epidemicLayer.addTo(map);
    naturalDisasterLayer.addTo(map);
    industrialDisasterLayer.addTo(map);
    nuclearLayer.addTo(map);
	fireLayer.addTo(map);
	pollutionLayer.addTo(map);
	attentatLayer.addTo(map);
	nuclearPlantsLayer.addTo(map); 
	
    var overlayMaps = {
        "Accidents Industriels": industrialDisasterLayer,
		"Attentats": attentatLayer,
		"Catastrophes Naturelles": naturalDisasterLayer,
		"Centrales Nucléaires": nuclearPlantsLayer,
		"Épidémies": epidemicLayer,
        "Essais Nucléaires": nuclearLayer,
		"Guerres": warLayer,
		"Incendies": fireLayer,
		"Zones Polluées": pollutionLayer
    };
	
    L.control.layers(null, overlayMaps).addTo(map);
	legend.addTo(map);

const texte = "L'Homme, par son insatiable soif de progrès et de consommation, a bouleversé l'équilibre de la planète. Les déchets, témoins de notre société de surconsommation, s'accumulent inexorablement. La pollution, fruit de nos activités industrielles, contamine les éléments vitaux que sont l'air et l'eau. Les guerres, expressions de nos divisions et de notre violence, laissent des cicatrices profondes sur la Terre. Face à ces défis, nous devons nous interroger sur notre rapport à la nature et à notre place dans le monde. Sommes-nous capables de changer nos habitudes et de construire un avenir plus durable ?";
const elementTexte = document.getElementById('texte');
let index = 0;

function afficherTexte() {
    if (index < texte.length) {
        elementTexte.innerHTML += texte.charAt(index);
        index++;
        setTimeout(afficherTexte, 2);
    }
}

afficherTexte();

const files = [
    'http://emmanuel.marcerou.free.fr/MadWorld/bdd/attentats.txt',
    'http://emmanuel.marcerou.free.fr/MadWorld/bdd/centrale.txt',
	'http://emmanuel.marcerou.free.fr/MadWorld/bdd/epidemies.txt',
	'http://emmanuel.marcerou.free.fr/MadWorld/bdd/essai.txt',
	'http://emmanuel.marcerou.free.fr/MadWorld/bdd/guerres.txt',
	'http://emmanuel.marcerou.free.fr/MadWorld/bdd/incendies.txt',
	'http://emmanuel.marcerou.free.fr/MadWorld/bdd/industriels.txt',
	'http://emmanuel.marcerou.free.fr/MadWorld/bdd/naturel.txt',
	'http://emmanuel.marcerou.free.fr/MadWorld/bdd/pollution.txt'
];

async function getLastModifiedDate(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        if (response.ok) {
            return new Date(response.headers.get('Last-Modified'));
        }
        return null;
    } catch (error) {
        console.error('Erreur lors de la récupération du fichier:', error);
        return null;
    }
}

async function findLatestDate(files) {
    let latestDate = null;

    for (let i = 0; i < files.length; i++) {
        const fileDate = await getLastModifiedDate(files[i]);

        if (fileDate && (!latestDate || fileDate > latestDate)) {
            latestDate = fileDate;
        }
    }

    return latestDate;
}

function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `©2024 Emmanuel MARCEROU (dernière mise à jour le ${day}/${month}/${year} à ${hours}:${minutes})\nToutes les informations viennent d\'internet. La carte se base sur le service OpenStreetMap. Le script d\'affichage de la carte se base sur le javascript Leaflet. Musique Rest of The Fallen de GuilhermeBernardes.`;
}

findLatestDate(files).then(latestDate => {
    if (latestDate) {
        document.getElementById('copyrights').innerText = formatDate(latestDate);
    } else {
        document.getElementById('copyrights').innerText = '©2024 Emmanuel MARCEROU (dernière mise à jour : Impossible de récupérer la date)';
    }
});

function playAudio() {
  audio.play();
}

setTimeout(playAudio, 5000);

const body = document.body;
const audio = document.getElementById("myAudio");

body.addEventListener('click', () => {
  audio.play();
});