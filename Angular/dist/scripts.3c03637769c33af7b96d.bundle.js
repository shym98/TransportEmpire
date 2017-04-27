webpackJsonp([2,5],{3:function(t,e,r){t.exports=r("4msC")},"4msC":function(t,e,r){r("P+fo")(r("haKs"))},"P+fo":function(t,e){t.exports=function(t){"undefined"!=typeof execScript?execScript(t):eval.call(null,t)}},haKs:function(t,e){t.exports="var map;\r\nvar info_window;\r\nvar places_service;\r\nvar direction_service;\r\nvar selected_route;\r\n\r\nvar mouseover\t\t\t\t = false;\r\nvar live_road\t\t\t\t = true;\r\nvar last_town_destination\t = true;\r\nvar nearest_town_added\t\t = true;\r\n\r\nvar selected_places\t = {};\r\nvar markers\t\t\t = {};\r\n\r\nvar roads\t\t\t = [];\r\nvar roads_display\t = [];\r\nvar ordered_markers\t = [];\r\nvar colors = ['#4682B4','#00FF00','#FF0000','#FFFF00','#FF1493','#8B008B','#000000','#FF4500','#8B4513','#FF00FF'];\r\n\r\nfunction initMap() {\r\n\tdeleteMap();\r\n\tvar position = {lat: 50.4501, lng: 30.523400000000038}; //Kiyv\r\n\tmap = new google.maps.Map(document.getElementById('map'), {\r\n\t\tcenter: position,\r\n\t\tzoom: 8\r\n\t});\r\n\tmap.addListener('click', function(event){\r\n\t\tsearchNearestTowns(event.latLng);\r\n\t\t\r\n\t});\r\n\tplaces_service = new google.maps.places.PlacesService(map);\r\n\tdirection_service = new google.maps.DirectionsService;\r\n\tinfo_window = new google.maps.InfoWindow;\r\n}\r\n\r\nfunction searchNearestTowns(click_position){\r\n\t//var filters = document.getElementById('filters');\r\n\tif (nearest_town_added == true){\r\n\t\tplaces_service.search({\r\n\t\t\tlocation: click_position,\r\n\t\t\trankBy: google.maps.places.RankBy.DISTANCE,\r\n\t\t\ttypes: ['locality']\r\n\t\t}, searchCallback);\r\n\t} else {\r\n\t\tplaces_service.radarSearch({\r\n\t\t\tlocation: click_position,\r\n\t\t\tradius: 10000,\r\n\t\t\ttypes: ['locality']\r\n\t\t}, radarCallback);\r\n\t}\r\n}\r\n\r\nfunction searchCallback(results, status){\r\n\tif (status === google.maps.places.PlacesServiceStatus.OK){\r\n\t\tclearMarkers();\r\n\t\tclearOrderedMarkers();\r\n\t\tcreateMarker(results[0]);\r\n\t}\r\n}\r\n\r\nfunction radarCallback(results, status){\r\n\tif (status === google.maps.places.PlacesServiceStatus.OK){\r\n\t\tclearMarkers();\r\n\t\tclearOrderedMarkers();\r\n\t\tresults.forEach(function(result_item){\r\n\t\t\tcreateMarker(result_item);\r\n\t\t});\r\n\t}\r\n}\r\n\r\nfunction clearMarkers(){\r\n\tfor (place_id in markers){\r\n\t\tif (selected_places[place_id] === undefined){\r\n\t\t\tmarkers[place_id].setMap(null);\r\n\t\t\tdelete markers[place_id];\r\n\t\t}\r\n\t}\r\n}\r\n\r\nfunction createMarker(place){\r\n\tvar marker_place = {location: place.geometry.location, placeId: place.place_id};\r\n\tif (markers[place.place_id] !== undefined){\r\n\t\treturn;\r\n\t}\r\n\tvar marker = new google.maps.Marker({\r\n\t\tplace: marker_place,\r\n\t\tmap: map,\r\n\t\tzIndex: 1\r\n\t});\t\r\n\tmarker.addListener('click', function(){\r\n\t\tonMarkerClick(marker);\r\n\t});\r\n\tmarker.addListener('mouseover', function(){\r\n\t\tshowInfoWindow(marker);\t\r\n\t});\r\n\tmarker.addListener('mouseout', function(){\r\n\t\thideInfoWindow(marker);\r\n\t});\r\n\tif (nearest_town_added){\r\n\t\tonMarkerClick(marker);\r\n\t}\r\n\tmarkers[place.place_id] = marker;\r\n}\r\n\r\nfunction showInfoWindow(marker){\r\n\tmouseover = true;\r\n\tsetTimeout(function(){\r\n\t\tif (mouseover){\r\n\t\t\tplaces_service.getDetails({placeId: marker.getPlace().placeId}, function(result, status){\r\n\t\t\t\tif (status === google.maps.places.PlacesServiceStatus.OK){\r\n\t\t\t\t\tinfo_window.setContent(result.formatted_address);\r\n\t\t\t\t}\r\n\t\t\t});\r\n\t\t\tinfo_window.open(map, marker);\r\n\t\t}\r\n\t}, 600);\r\n\tmarker.setZIndex(2);\r\n}\r\n\r\nfunction hideInfoWindow(marker){\r\n\tmouseover = false;\r\n\tinfo_window.close();\t\r\n\tmarker.setZIndex(1);\r\n}\r\n\r\nfunction onMarkerClick(marker) {\r\n\tplaces_service.getDetails({placeId: marker.getPlace().placeId}, function(result, status){\r\n\t\tif (status === google.maps.places.PlacesServiceStatus.OK){\r\n\t\t\t\r\n\t\t\tvar origin = document.getElementById('origin');\r\n\t\t\t\r\n\t\t\tvar destination = document.getElementById('destination');\r\n\t\t\tif (selected_places[marker.getPlace().placeId] === undefined){\r\n\t\t\t\tvar option1 = document.createElement('option');\r\n\t\t\t\toption1.innerHTML = result.formatted_address;\r\n\t\t\t\toption1.value = result.formatted_address;\r\n\t\t\t\toption1.id = result.formatted_address;\r\n\t\t\t\tvar option2 = option1.cloneNode(true);\r\n\t\t\t\torigin.appendChild(option1);\r\n\t\t\t\tdestination.appendChild(option2);\r\n\t\t\t\tif (last_town_destination){\r\n\t\t\t\t\tdestination.value = option2.value;\r\n\t\t\t\t}\r\n\t\t\t\tmarker.setIcon('http://maps.google.com/mapfiles/kml/pal4/icon23.png');\r\n\t\t\t\tselected_places[marker.getPlace().placeId] = {address: result.formatted_address, location: result.geometry.location};\r\n\t\t\t} else {\r\n\t\t\t\tmarker.setMap(null);\r\n\t\t\t\tdelete selected_places[marker.getPlace().placeId];\r\n\t\t\t\tdelete marker;\r\n\t\t\t\torigin.removeChild(document.getElementById(result.formatted_address));\r\n\t\t\t\tdestination.removeChild(document.getElementById(result.formatted_address));\r\n\t\t\t}\r\n\t\t\tif (Object.keys(selected_places).length > 1 && live_road){\r\n\t\t\t\tfindRoads();\r\n\t\t\t} else {\r\n\t\t\t\tclearRoads();\r\n\t\t\t}\r\n\t\t\tvar event = new Event(\"routeChanged\");\r\n\t\t\t//document.getElementById('body').dispatchEvent(event);   //temp fix\r\n\t\t}\r\n\t});\r\n}\r\n\r\nfunction setWaypoints(){\r\n\tvar waypoints = [];\r\n\tvar origin_address = document.getElementById('origin').value;\r\n\tvar destination_address = document.getElementById('destination').value;\r\n\tfor (place_id in selected_places){\r\n\t\tif (selected_places[place_id].address == origin_address){\r\n\t\t\tvar origin = selected_places[place_id].location;\r\n\t\t} else {\r\n\t\t\tif (selected_places[place_id].address == destination_address){\r\n\t\t\t\tvar destination = selected_places[place_id].location;\r\n\t\t\t} else {\r\n\t\t\t\twaypoints.push({location: selected_places[place_id].location});\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\treturn {origin: origin, destination: destination, waypoints: waypoints};\r\n}\r\n\r\nfunction findRoads(){\r\n\tvar params = setWaypoints();\r\n\tfindRoadsWithParams(params.origin, params.destination, params.waypoints);\r\n}\r\n\r\nfunction findRoadsWithParams(origin, destination, waypoints){\r\n\tclearOrderedMarkers();\r\n\tclearRoads();\r\n\tdirection_service.route({\r\n\t\torigin: origin,\r\n\t\tdestination: destination,\r\n\t\twaypoints: waypoints,\r\n\t\ttravelMode: google.maps.TravelMode.DRIVING,\r\n\t\tprovideRouteAlternatives: true,\r\n\t\toptimizeWaypoints: true\r\n\t}, buildRoads);\r\n\tdirection_service.route({\r\n\t\torigin: origin,\r\n\t\tdestination: destination,\r\n\t\twaypoints: waypoints,\r\n\t\ttravelMode: google.maps.TravelMode.DRIVING,\r\n\t\tprovideRouteAlternatives: true\r\n\t}, buildRoads);\r\n}\r\n\r\nfunction clearRoads(){\r\n\troads.length = 0;\r\n\troads_display.forEach(function(display_item){\r\n\t\tdisplay_item.setMap(null);\r\n\t});\r\n\troads_display.length = 0;\r\n}\r\n\r\nfunction swap(a, b){\r\n\tvar c = a;\r\n\ta = b;\r\n\tb = c;\r\n}\r\n  \r\nfunction buildRoads(result, status){\r\n\tvar roads_length = roads.length;\r\n\tif (status === google.maps.DirectionsStatus.OK){\r\n\t\tresult.routes.forEach(function(route_item, i){\r\n\t\t\tvar total_distance = 0;\t\t\t\r\n\t\t\tvar path\t\t = []; // Array of latLng\r\n\t\t\tvar legs\t\t = []; // Each leg contains start (address and position), end (address and position) and distance\r\n\t\t\tvar road\t\t = {}; // Contains total_distance, legs, path (encoded string)\r\n\t\t\troute_item.legs.forEach(function(leg_item){\r\n\t\t\t\tvar start = {address: leg_item.start_address, location: leg_item.start_location};\r\n\t\t\t\tvar end = {address: leg_item.end_address, location: leg_item.end_location};\r\n\t\t\t\tlegs.push({start: start, end: end, distance: leg_item.distance.value});\r\n\t\t\t\ttotal_distance += leg_item.distance.value;\r\n\t\t\t\tleg_item.steps.forEach(function(step_item){\r\n\t\t\t\t\tstep_item.path.forEach(function(path_item){\r\n\t\t\t\t\t\tpath.push(path_item);\r\n\t\t\t\t\t});\r\n\t\t\t\t});\r\n\t\t\t});\r\n\t\t\troad = {total_distance: total_distance, legs: legs, path: google.maps.geometry.encoding.encodePath(path)};\r\n\t\t\troads.push(road);\r\n\t\t\tdisplayRoad(road, roads_length + i - roads_length);\r\n\t\t});\r\n\t}\r\n}\r\n\r\nfunction displayRoad(road, index){\r\n\tvar road_display = new google.maps.Polyline({\r\n\t\tmap: map,\r\n\t\tstrokeWeight: 5,\r\n\t\tstrokeOpacity: 0.3,\r\n\t\tstrokeColor: colors[roads.length],\r\n\t\tpath: google.maps.geometry.encoding.decodePath(road.path)\r\n\t});\t\r\n\troad_display.addListener('click', function(){\r\n\t\tselected_route = index;\r\n\t\tselectRoad(road, road_display);\r\n\t});\t\t\t\r\n\troads_display.push(road_display);\r\n}\r\n\r\nfunction clearOrderedMarkers(){\r\n\tordered_markers.forEach(function(item){\r\n\t\titem.setMap(null);\r\n\t});\r\n\tordered_markers.length = 0;\r\n}\r\n\r\nfunction selectRoad(road, road_display){\r\n\tclearOrderedMarkers();\r\n\troads_display.forEach(function(road_display_item){\r\n\t\troad_display_item.setOptions({\r\n\t\t\tstrokeOpacity: 0.3\r\n\t\t});\r\n\t});\r\n\troad_display.setOptions({\r\n\t\tstrokeOpacity:1\r\n\t});\r\n\tvar textarea = document.getElementById('outputTextarea');\r\n\ttextarea.value = 'Total distance: ' + (road['total_distance'] / 1000) + 'km' + '\\n';\r\n\troad['legs'].forEach(function(leg_item, i){\r\n\t\tvar marker = new google.maps.Marker({\r\n\t\t\tmap: map,\r\n\t\t\tposition: leg_item['start']['location'],\r\n\t\t\tlabel: '' + (i + 1),\r\n\t\t\tzIndex: 2\r\n\t\t});\r\n\t\tordered_markers.push(marker);\r\n\t\tif (i == road['legs'].length - 1){\r\n\t\t\tvar marker = new google.maps.Marker({\r\n\t\t\t\tmap: map,\r\n\t\t\t\tposition: leg_item['end']['location'],\r\n\t\t\t\tlabel: '' + (i + 2),\r\n\t\t\t\tzIndex: 2\r\n\t\t\t});\r\n\t\t\tordered_markers.push(marker);\r\n\t\t}\r\n\t\tsetTextareaInfo(leg_item, textarea);\r\n\t});\t\r\n\r\n}\r\n\r\nfunction setTextareaInfo(leg, textarea){\r\n\ttextarea.value += (leg['start']['address'] + ' - ');\r\n\ttextarea.value += (leg['end']['address'] + '\\n');\r\n\ttextarea.value += ('   Distance: ' + (leg['distance'] / 1000) + 'km' + '\\n');\r\n}\r\n\r\nfunction setLiveRoad(){\r\n\tif (live_road == false){\r\n\t\tlive_road = true;\r\n\t\tdocument.getElementById('buildButton').disabled = true;\r\n\t} else {\r\n\t\tlive_road = false;\r\n\t\tdocument.getElementById('buildButton').disabled = false;\r\n\t}\r\n}\r\n\r\nfunction setLastTownDestination(){\r\n\tif (last_town_destination == false){\r\n\t\tlast_town_destination = true;\r\n\t} else {\r\n\t\tlast_town_destination = false;\r\n\t}\r\n}\r\n\r\nfunction setNearestTownAdded(){\r\n\tif (nearest_town_added == false){\r\n\t\tnearest_town_added = true;\r\n\t} else {\r\n\t\tnearest_town_added = false;\r\n\t}\r\n}\r\n\r\nfunction clearSelectTag(elem){\r\n\tvar elem_childs = elem.getElementsByTagName('*');\r\n\tvar elem_childs_length = elem_childs.length;\r\n\tfor (var i = elem_childs_length; i > 0; i--){\r\n\t\telem_childs[i - 1].remove();\r\n\t}\r\n}\r\n\r\nfunction clearAllMarkers(){\r\n\tfor (place_id in markers){\r\n\t\tmarkers[place_id].setMap(null);\r\n\t\tdelete markers[place_id];\r\n\t\tif (selected_places[place_id] !== undefined){\r\n\t\t\tdelete selected_places[place_id];\r\n\t\t}\r\n\t}\r\n}\r\n\r\nfunction clearMap(){\r\n\tclearRoads();\r\n\tclearAllMarkers();\r\n\tclearOrderedMarkers();\r\n\tdelete selected_places;\r\n\tselected_places = {};\r\n\tclearSelectTag(document.getElementById('origin'));\r\n\tclearSelectTag(document.getElementById('destination'));\r\n}\r\n\r\nfunction sendRoad(){\r\n\tif (selected_route === undefined){\r\n\t\talert(\"Wrong road selected!!!\");\r\n\t\treturn;\r\n\t}\r\n\tvar str = JSON.stringify(roads[selected_route]);\r\n\talert(str);\r\n\t//var socket = new WebSocket(\"ws://10.1.3.121:1234\");\r\n\t//socket.send(str);\r\n}\r\n\r\nfunction getRoute(){\r\n\treturn roads[selected_route];\r\n}\r\n\r\nfunction setRoute(new_route){\r\n\troads.push[new_route];\t\r\n\tselected_route = roads.length - 1;\r\n\tdisplayRoad(new_route);\r\n}\r\n\r\nfunction deleteMap(){\r\n\tclearMap();\r\n\tdelete map;\r\n}"}},[3]);