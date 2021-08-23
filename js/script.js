const d = document
const $formIp = d.querySelector('.ip-form')
const latitude = 0
const longitude = 0
const loadMap = (response, mymap, marker) => {
	const res = response.data
	d.querySelector('.ip_content').textContent = res.ip
	d.querySelector('.timezone_content').textContent = res.timezone_gmt
	d.querySelector('.location_content').textContent = `${res.city}, ${res.country}`
	d.querySelector('.isp_content').textContent = res.isp
	mymap.setView([res.latitude, res.longitude], 13)
	marker.setLatLng([res.latitude, res.longitude])
}

const mymap = L.map('mapid').setView([4.7109886, -74.072092], 14)
L.tileLayer(
	'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
	{
		maxZoom: 18,
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1,
		zoomControl: false,
		accessToken:
			'pk.eyJ1IjoiYW5kcmVzMjIiLCJhIjoiY2tzbmtnMW1oMDU0bzJ0bzB0b2lqeHRpZCJ9.-X-B1EtJTYv3ry_AupNmBQ',
	}
).addTo(mymap)
mymap.removeControl(mymap.zoomControl)
const myIncon = L.icon({
	iconUrl: '../images/icon-location.svg',
	inconSize: [36, 46],
})
const marker = L.marker([4.7109886, -74.072092], { icon: myIncon, title: 'IP' }).addTo(
	mymap
)

axios
	.get('https://api.ipify.org/?format=json')
	.then(response => {
		const ip = response.data.ip
		return axios.get(
			`https://ipwhois.app/json/${ip}
			`
		)
	})
	.then(response => {
		loadMap(response, mymap, marker)
	})
	.catch(err => console.log(err))

$formIp.addEventListener('submit', e => {
	e.preventDefault()
	const ip = d.querySelector('#ip-input').value
	axios
		.get(
			`https://ipwhois.app/json/${ip}
			`
		)
		.then(response => {
			loadMap(response, mymap, marker)
		})
})
