import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import { useGlobalVariables } from '@/hooks/useGlobalVariables';

export default function MapScreen() {
  const { globalVariables } = useGlobalVariables();
  const [reloadKey, setReloadKey] = useState(0);
  const position = globalVariables.gps ? 
    [globalVariables.gps.longitude, globalVariables.gps.latitude] : 
    [2.1833, 41.3833];

  const mapHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@v8.2.0/ol.css">
        <script src="https://cdn.jsdelivr.net/npm/ol@v8.2.0/dist/ol.js"></script>
        <style>
            html, body, #map { margin: 0; height: 100vh; width: 100vw; }
            .layer-switcher-container {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                background: white;
                padding: 20px 0;
                display: flex;
                align-items: center;
            }
            .layer-switcher {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                padding: 20px;
                display: flex;
                flex-direction: row;
                gap: 20px;
                overflow-x: scroll;
                background: white;
                border-bottom: 1px solid #ddd;
                -webkit-overflow-scrolling: touch;
                touch-action: pan-x;
                scroll-behavior: auto;
                scroll-snap-type: none;
            }
            .layer-switcher::-webkit-scrollbar {
                display: block;
                height: 8px;
            }
            .layer-switcher::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 4px;
            }
            .layer-switcher::-webkit-scrollbar-thumb {
                background: #888;
                border-radius: 4px;
            }
            .layer-switcher::-webkit-scrollbar-thumb:hover {
                background: #555;
            }
            .nav-button {
                width: 60px;
                height: 60px;
                background: #f0f0f0;
                border: none;
                border-radius: 30px;
                font-size: 24px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 10px;
            }
            .layer-button {
                display: flex;
                flex-direction: column;
                align-items: center;
                flex-shrink: 0;
                width: 200px;
                padding: 20px;
                border: none;
                border-radius: 16px;
                background: #f0f0f0;
                cursor: pointer;
                transition: all 0.2s;
                font-size: 24px;
                scroll-snap-align: center;
            }
            .layer-button.active {
                background: #3388ff;
                color: white;
            }
            .layer-button:hover {
                background: #ddd;
            }
            .layer-button.active:hover {
                background: #2277ee;
            }
            .layer-preview {
                width: 160px;
                height: 160px;
                margin-bottom: 20px;
                border-radius: 16px;
                background-size: cover;
            }
        </style>
    </head>
    <body>
        <div id="map"></div>
        <div class="layer-switcher"></div>
        <script>
            const layers = [
                {
                    title: 'OpenStreetMap',
                    layer: new ol.layer.Tile({
                        source: new ol.source.OSM()
                    }),
                    preview: 'https://a.tile.openstreetmap.org/7/63/42.png'
                },
                {
                    title: 'Satellite',
                    layer: new ol.layer.Tile({
                        source: new ol.source.XYZ({
                            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                        })
                    }),
                    preview: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/7/42/63'
                },
                {
                    title: 'Topographic',
                    layer: new ol.layer.Tile({
                        source: new ol.source.XYZ({
                            url: 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
                        })
                    }),
                    preview: 'https://a.tile.opentopomap.org/7/63/42.png'
                },
                {
                    title: 'Dark',
                    layer: new ol.layer.Tile({
                        source: new ol.source.XYZ({
                            url: 'https://cartodb-basemaps-{a-c}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
                        })
                    }),
                    preview: 'https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/7/63/42.png'
                },
                {
                    title: 'Terrain',
                    layer: new ol.layer.Tile({
                        source: new ol.source.XYZ({
                            url: 'https://stamen-tiles-{a-d}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png'
                        })
                    }),
                    preview: 'https://stamen-tiles-a.a.ssl.fastly.net/terrain/7/63/42.png'
                },
                {
                    title: 'Watercolor',
                    layer: new ol.layer.Tile({
                        source: new ol.source.XYZ({
                            url: 'https://stamen-tiles-{a-d}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg'
                        })
                    }),
                    preview: 'https://stamen-tiles-a.a.ssl.fastly.net/watercolor/7/63/42.jpg'
                }
            ];

            // Create marker
            const markerFeature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat(${JSON.stringify(position)}))
            });

            const markerLayer = new ol.layer.Vector({
                source: new ol.source.Vector({
                    features: [markerFeature]
                }),
                style: new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 12,
                        fill: new ol.style.Fill({ color: '#3388ff' }),
                        stroke: new ol.style.Stroke({ color: '#ffffff', width: 3 })
                    })
                })
            });

            // Initialize map with all layers
            const map = new ol.Map({
                target: 'map',
                layers: [...layers.map(l => l.layer), markerLayer],
                view: new ol.View({
                    center: ol.proj.fromLonLat(${JSON.stringify(position)}),
                    zoom: 18
                })
            });

            // Create layer switcher buttons
            const switcher = document.querySelector('.layer-switcher');
            layers.forEach((item, index) => {
                const button = document.createElement('button');
                button.className = 'layer-button' + (index === 0 ? ' active' : '');
                
                const preview = document.createElement('div');
                preview.className = 'layer-preview';
                preview.style.backgroundImage = \`url(\${item.preview})\`;
                
                const title = document.createElement('span');
                title.textContent = item.title;
                
                button.appendChild(preview);
                button.appendChild(title);
                switcher.appendChild(button);

                // Hide all layers except the first one initially
                if (index > 0) item.layer.setVisible(false);

                button.onclick = () => {
                    // Update active state of buttons
                    switcher.querySelectorAll('.layer-button').forEach(b => b.classList.remove('active'));
                    button.classList.add('active');
                    
                    // Show selected layer, hide others
                    layers.forEach(l => l.layer.setVisible(false));
                    item.layer.setVisible(true);
                };
            });

            // Add touch event handling
            let touchStartX = 0;
            let touchEndX = 0;

            switcher.addEventListener('touchstart', e => {
                touchStartX = e.touches[0].clientX;
            });

            switcher.addEventListener('touchmove', e => {
                e.preventDefault(); // Prevent page scrolling while swiping
            });

            switcher.addEventListener('touchend', e => {
                touchEndX = e.changedTouches[0].clientX;
                const swipeDistance = touchStartX - touchEndX;
                const minSwipeDistance = 50; // Minimum distance for a swipe

                if (Math.abs(swipeDistance) > minSwipeDistance) {
                    if (swipeDistance > 0) {
                        // Swiped left
                        scrollLayers('right');
                    } else {
                        // Swiped right
                        scrollLayers('left');
                    }
                }
            });

            function scrollLayers(direction) {
                const switcher = document.querySelector('.layer-switcher');
                const scrollAmount = 220; // button width + gap
                if (direction === 'left') {
                    switcher.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                } else {
                    switcher.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            }
        </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <Button title="Reload Map" onPress={() => setReloadKey(prev => prev + 1)} />
      <WebView 
        key={reloadKey}
        source={{ html: mapHTML }}
        style={styles.map}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});